import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/app/dto/create-product.dto';
import { Product } from 'src/app/entity/product.entity';
import { ProductService } from 'src/app/service/product.service';
import { DataResponse } from '../dto/data-response.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<DataResponse<Product>> {
    const product = await this.productService.create(createProductDto);

    return new DataResponse(product);
  }
}
