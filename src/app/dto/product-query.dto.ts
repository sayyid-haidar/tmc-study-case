export class ProductQuery {
  ['page']?: number = 1;

  ['page.size']?: number = 10;

  ['sku']?: string[];

  ['name']?: string[];

  ['category.id']?: number[];

  ['category.name']?: string[];

  ['price.start']?: number;

  ['price.end']?: number;

  ['stock.start']?: number;

  ['stock.end']?: number;
}
