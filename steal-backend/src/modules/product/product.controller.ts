import {
  Body,
  Controller,
  Inject,
  Logger,
  Query,
  Request,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomGet, CustomPost } from 'src/common/decorators';
import { PRODUCT_SERVICES } from './product.provider';
import { ProductService } from './services/product.service';
import { Request as Req, Response as Res } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { SearchProductQuery, UploadProductDto } from './types';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    @Inject(PRODUCT_SERVICES) private readonly productService: ProductService,
  ) {}

  @CustomPost({
    isPublic: true,
    description: 'Upload a product',
    path: '',
  })
  @FormDataRequest()
  async handleUploadProduct(
    @Response() res: Res,
    @Body() body: UploadProductDto,
  ) {
    try {
      const productId = await this.productService.uploadNewProduct(body);

      res.status(200).send({
        data: {
          productId,
        },
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  @CustomGet({
    isPublic: true,
    description: 'Get all products',
    path: '',
  })
  async handleGetAllProducts(
    @Response() res: Res,
    @Query() query: SearchProductQuery,
  ) {
    try {
      const products = await this.productService.getAllProducts(query);

      res.status(200).send({
        data: products,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
