import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/app/dto/create-product.dto';
import { Product } from 'src/app/entity/product.entity';
import { ProductService } from 'src/app/service/product.service';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
