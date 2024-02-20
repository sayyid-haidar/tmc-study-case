import { Module } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { Category } from './entity/category.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';
import { CategoryController } from './controller/category.controller';
import { ProductController } from './controller/product.controller';
import { DatabaseModule } from './module/database.module';
import { InterceptModule } from './module/interceptor.module';
import { SkuExistsRule } from './dto/rule/sku-exists.rule';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    InterceptModule,
    TypeOrmModule.forFeature([Product, Category]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [SkuExistsRule, CategoryService, ProductService],
})
export class AppModule {}
