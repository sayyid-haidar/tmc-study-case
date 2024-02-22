import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CategoryService } from './category.service';
import { ProductQuery } from '../dto/product-query.dto';
import { Product } from '../entity/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

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
      const category = await this.categoryService.findOneById(
        createProductDto.categoryId,
      );

      if (category) {
        product.category = category;
      }
    }

    return this.productRepository.save(product);
  }

  findOneBySku(sku: string): Promise<Product> {
    return this.productRepository.findOneBy({ sku: sku });
  }

  findAllBy(productQuery: ProductQuery): Promise<[Product[], number]> {
    const findManyOptions: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      where: {
        sku: productQuery.sku,
        name: productQuery.name,
        category: {
          id: productQuery['category.id'],
          name: productQuery['category.name'],
        },
        stock: (() => {
          if (productQuery['stock.start'] && productQuery['stock.end']) {
            return Between(
              productQuery['stock.start'],
              productQuery['stock.end'],
            );
          }
          if (productQuery['stock.start']) {
            return MoreThanOrEqual(productQuery['stock.start']);
          }
          if (productQuery['stock.end']) {
            return LessThanOrEqual(productQuery['stock.end']);
          }
        })(),
        price: (() => {
          if (productQuery['price.start'] && productQuery['price.end']) {
            return Between(
              productQuery['price.start'],
              productQuery['price.end'],
            );
          }
          if (productQuery['price.start']) {
            return MoreThanOrEqual(productQuery['price.start']);
          }
          if (productQuery['price.end']) {
            return LessThanOrEqual(productQuery['price.end']);
          }
        })(),
      },
      take: productQuery['page.size'],
      skip: productQuery.page - 1,
    };

    return this.productRepository.findAndCount(findManyOptions);
  }
}
