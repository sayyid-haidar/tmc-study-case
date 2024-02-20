import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/app/dto/create-product.dto';
import { Product } from 'src/app/entity/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';

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

    if (createProductDto.categoryId != null) {
      const category = await this.categoryService.findById(
        createProductDto.categoryId,
      );

      if (category != null) {
        product.category = category;
      }
    }

    return this.productRepository.save(product);
  }

  findBySku(sku: string): Promise<Product | null> {
    return this.productRepository.findOneBy({ sku: sku });
  }
}
