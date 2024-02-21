import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/app/dto/create-product.dto';
import { Product } from 'src/app/entity/product.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryService } from './category.service';
import { ProductQuery } from '../dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.sku = createProductDto.sku;
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.stock = createProductDto.stock;

    if (createProductDto.categoryId) {
      const category = await this.categoryService.findById(
        createProductDto.categoryId,
      );

      if (category) {
        product.category = category;
      }
    }

    return this.productRepository.save(product);
  }

  findOneBy(productQuery: ProductQuery): Promise<Product> {
    const queryBuilder = this.generateQueryBuilder(productQuery);

    return queryBuilder.getOne();
  }

  findAllBy(productQuery: ProductQuery): Promise<[Product[], number]> {
    const queryBuilder = this.generateQueryBuilder(productQuery);

    return queryBuilder
      .take(productQuery.pageSize)
      .skip(productQuery.page - 1)
      .getManyAndCount();
  }

  private generateQueryBuilder(
    productQuery: ProductQuery,
  ): SelectQueryBuilder<Product> {
    let queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (productQuery.sku) {
      queryBuilder = queryBuilder.where('product.sku = :sku', {
        sku: productQuery.sku,
      });
    }
    if (productQuery.name) {
      queryBuilder = queryBuilder.where('product.name = :name', {
        name: productQuery.name,
      });
    }
    if (productQuery.categoryId) {
      queryBuilder = queryBuilder.where('category.id = :id', {
        id: productQuery.categoryId,
      });
    }
    if (productQuery.categoryName) {
      queryBuilder = queryBuilder.where('category.name = :name', {
        name: productQuery.categoryName,
      });
    }
    if (productQuery.priceStart) {
      queryBuilder = queryBuilder.where('product.price >= :priceStart', {
        priceStart: productQuery.priceStart,
      });
    }
    if (productQuery.priceEnd) {
      queryBuilder = queryBuilder.where('product.price <= :priceEnd', {
        priceEnd: productQuery.priceEnd,
      });
    }
    if (productQuery.stockStart) {
      queryBuilder = queryBuilder.where('product.stockStart <= :stockStart', {
        stockStart: productQuery.stockStart,
      });
    }
    if (productQuery.stockEnd) {
      queryBuilder = queryBuilder.where('product.stockEnd <= :stockEnd', {
        stockEnd: productQuery.stockEnd,
      });
    }
    if (productQuery.page == null || productQuery.page < 1) {
      productQuery.page = 1;
    }
    if (productQuery.pageSize == null || productQuery.pageSize < 1) {
      productQuery.pageSize = 1;
    }

    return queryBuilder;
  }
}
