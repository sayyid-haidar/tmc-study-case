import { Controller, Post, Query } from '@nestjs/common';
import { ProductService } from 'src/app/service/product.service';
import { DataResponse } from '../dto/data-response.dto';
import { Product } from '../entity/product.entity';
import { Paging } from '../dto/paging.dto';
import { DataAndPagingResponse } from '../dto/data-and-paging-response.dto';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async search(
    @Query('page') page: number,
    @Query('page_size') pageSize: number,
    @Query('sku') sku: string,
    @Query('name') name: string,
    @Query('category.id') categoryId: number,
    @Query('category.name') categoryName: string,
    @Query('price.start') priceStart: number,
    @Query('price.end') priceEnd: number,
    @Query('stock.start') stockStart: number,
    @Query('stock.end') stockEnd: number,
  ): Promise<DataResponse<Product[]>> {
    const productData: [Product[], number] =
      await this.productService.findAllBy({
        page: page,
        pageSize: pageSize,
        sku: sku,
        name: name,
        categoryId: categoryId,
        categoryName: categoryName,
        priceStart: priceStart,
        priceEnd: priceEnd,
        stockStart: stockStart,
        stockEnd: stockEnd,
      });

    return new DataAndPagingResponse(
      productData[0],
      new Paging(pageSize, productData[1], page),
    );
  }
}
