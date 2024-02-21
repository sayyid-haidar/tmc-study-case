import { Expose } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class ProductQuery {
  @Min(1)
  @IsNotEmpty()
  page?: number = 1;

  @Min(1)
  @IsNotEmpty()
  @Expose({ name: 'page.size' })
  pageSize?: number = 1;

  sku?: string;

  name?: string;

  @Expose({ name: 'category.id' })
  categoryId?: number;

  @Expose({ name: 'category.name' })
  categoryName?: string;

  @Expose({ name: 'price.start' })
  priceStart?: number;

  @Expose({ name: 'price.end' })
  priceEnd?: number;

  @Expose({ name: 'stock.start' })
  stockStart?: number;

  @Expose({ name: 'stock.end' })
  stockEnd?: number;
}
