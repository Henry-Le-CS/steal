import { Inject, Injectable, Logger } from '@nestjs/common';
import { UploadProductDto } from '../types';
import { DATABASE_SERVICES } from 'src/modules/database/database.provider';
import { PrismaClient } from '@prisma/client';
import { getCategoriesFromString } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseHelper } from 'src/common/helpers';
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

  async getAllProducts() {
    const products = await this.dbService.products.findMany({
      include: {
        product_categories: {
          select: {
            category: true,
          },
        },
        product_images: {
          select: {
            image_url: true,
          },
        },
      },
    });

    return products;
  }
}
