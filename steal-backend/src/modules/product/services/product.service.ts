import { Inject, Injectable, Logger } from '@nestjs/common';
import { SearchProductQuery, UploadProductDto } from '../types';
import { DATABASE_SERVICES } from 'src/modules/database/database.provider';
import { PrismaClient } from '@prisma/client';
import { getCategoriesFromString, splitString } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseHelper } from 'src/common/helpers';
import { isNumber } from '@nestjs/common/utils/shared.utils';
@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @Inject(DATABASE_SERVICES) private readonly dbService: PrismaClient,
  ) {}

  async uploadNewProduct(payload: UploadProductDto) {
    const {
      providerId,
      name,
      price,
      amount,
      description,
      additionalInformation,
      categories,
      file,
    } = payload;

    const categoriesArray = getCategoriesFromString(categories);

    const productId = await this.dbService.$transaction(async (tx) => {
      const product = await tx.products.create({
        data: {
          name,
          price: Number(price),
          amount: Number(amount),
          description,
          additional_info: additionalInformation,
          created_at: new Date(),
          owner_id: Number(providerId),
        },
      });

      const productId = product.id;

      await tx.product_categories.createMany({
        data: categoriesArray.map((category) => ({
          category,
          product_id: productId,
        })),
      });

      // Save the image to the file system
      const imgId = uuidv4();
      const imgPath = `/${imgId}.${file.extension}`;

      const { path } = await SupabaseHelper.uploadImage(imgPath, file.buffer);
      if (!path) throw new Error('Failed to upload image');

      const publicUrl = await SupabaseHelper.getImagePublicURl(path);
      if (!publicUrl) throw new Error('Failed to get public URL');

      await tx.product_images.create({
        data: {
          image_url: publicUrl,
          product_id: productId,
        },
      });
      return productId;
    });

    return productId;
  }

  async getAllProducts(query: SearchProductQuery) {
    const products = await this.dbService.products.findMany({
      where: {
        ...this.getProductFilterCondition(query),
      },
      include: {
        product_categories: {
          select: {
            category: true,
          },
          where: {
            ...this.getProductCategoriesCondition(query.categories),
          },
        },
        product_images: {
          select: {
            image_url: true,
          },
        },
      },
      orderBy: {
        ...(this.getProductOrderCondition(query) as {
          price: 'asc' | 'desc' | 'desc' | 'asc' | undefined;
          created_at: 'asc' | 'desc' | 'desc' | 'asc' | undefined;
        }),
      },
    });

    return products;
  }

  async getProductById(productId: string, query: SearchProductQuery) {
    if (!productId || !isNumber(Number(productId)))
      throw new Error('Product ID is required');

    const product = await this.dbService.products.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        product_categories: {
          select: {
            category: true,
          },
          where: {
            ...this.getProductCategoriesCondition(query.categories),
          },
        },
        product_images: {
          select: {
            image_url: true,
          },
        },
      },
    });

    return product || {};
  }

  private getProductFilterCondition(query: SearchProductQuery) {
    const { q, range } = query;
    const filter: any = {};

    if (q) {
      filter.name = {
        contains: q,
      };
    }

    if (range) {
      const [min, max] = splitString(range);
      filter.price = {
        gte: Number(min),
        lte: Number(max),
      };
    }

    return filter;
  }

  private getProductOrderCondition(query: SearchProductQuery) {
    const { order } = query;

    switch (order) {
      case 'asc':
        return {
          price: 'asc',
        };
      case 'desc':
        return {
          price: 'desc',
        };
      case 'newest':
        return {
          created_at: 'desc',
        };
      case 'oldest':
        return {
          created_at: 'asc',
        };
      default:
        return {};
    }
  }

  private getProductCategoriesCondition(categories: string) {
    if (!categories) return {};

    return {
      category: {
        in: splitString(categories),
      },
    };
  }
}
