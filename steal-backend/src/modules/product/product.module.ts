import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductServiceProvider } from './product.provider';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  providers: [ProductService],
})
export class ProductModule {
  static register(): DynamicModule {
    const providers: Provider[] = [];

    providers.push(ProductServiceProvider);

    return {
      module: ProductModule,
      global: true,
      providers,
      exports: providers,
      controllers: [ProductController],
      imports: [
        MulterModule.register({
          storage: diskStorage({
            destination: './tmp',
            filename: (req, file, cb) => {
              const ext = file.mimetype.split('/')[1];
              cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
            },
          }),
        }),
        NestjsFormDataModule,
      ],
    };
  }
}
``;
