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
      .take(productQuery['page.size'])
      .skip(productQuery.page - 1)
      .getManyAndCount();
  }

  private generateQueryBuilder(
    productQuery: ProductQuery,
  ): SelectQueryBuilder<Product> {
    console.log(productQuery);
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
    if (productQuery['category.id']) {
      queryBuilder = queryBuilder.where('category.id = :id', {
        id: productQuery['category.id'],
      });
    }
    if (productQuery['category.name']) {
      queryBuilder = queryBuilder.where('category.name = :name', {
        name: productQuery['category.name'],
      });
    }
    if (productQuery['price.start']) {
      queryBuilder = queryBuilder.where('product.price >= :priceStart', {
        priceStart: productQuery['price.start'],
      });
    }
    if (productQuery['price.end']) {
      queryBuilder = queryBuilder.where('product.price <= :priceEnd', {
        priceEnd: productQuery['price.end'],
      });
    }
    if (productQuery['stock.start']) {
      queryBuilder = queryBuilder.where('product.stockStart <= :stockStart', {
        stockStart: productQuery['stock.start'],
      });
    }
    if (productQuery['stock.end']) {
      queryBuilder = queryBuilder.where('product.stockEnd <= :stockEnd', {
        stockEnd: productQuery['stock.end'],
      });
    }
    if (productQuery.page == null || productQuery.page < 1) {
      productQuery.page = 1;
    }
    if (productQuery['page.size'] == null) {
      productQuery['page.size'] = 10;
    } else if (productQuery['page.size'] < 1) {
      productQuery['page.size'] = 1;
    }

    return queryBuilder;
  }
}
