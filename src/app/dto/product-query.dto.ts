import { Expose } from 'class-transformer';

export class ProductQuery {
  page?: number = 1;

  @Expose({ name: 'page.size' })
  pageSize?: number = 10;

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
