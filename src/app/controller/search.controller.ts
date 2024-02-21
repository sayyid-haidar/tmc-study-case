import { Controller, Post, Query } from '@nestjs/common';
import { ProductService } from 'src/app/service/product.service';
import { DataResponse } from '../dto/data-response.dto';
import { Product } from '../entity/product.entity';
import { Paging } from '../dto/paging.dto';
import { DataAndPagingResponse } from '../dto/data-and-paging-response.dto';
import { ProductQuery } from '../dto/product-query.dto';

@Controller('/api/search')
export class SearchController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async search(
    @Query() productQuery: ProductQuery,
  ): Promise<DataResponse<Product[]>> {
    const productData: [Product[], number] =
      await this.productService.findAllBy(productQuery);

    const totalPage = productData[1] / productQuery.pageSize;

    return new DataAndPagingResponse(
      productData[0],
      new Paging(productQuery.pageSize, totalPage, productQuery.page),
    );
  }
}
