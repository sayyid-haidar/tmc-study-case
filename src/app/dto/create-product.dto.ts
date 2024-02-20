import { IsNotEmpty, IsPositive, MaxLength, Validate } from 'class-validator';
import { SkuExistsRule } from './rule/sku-exists.rule';

export class CreateProductDto {
  @IsNotEmpty({ message: 'sku is empty' })
  @MaxLength(255, { message: 'sku length must not more than 255 characters' })
  @Validate(SkuExistsRule)
  sku: string;

  @IsNotEmpty({ message: 'name is empty' })
  @MaxLength(255, { message: 'name length must not more than 255 characters' })
  name: string;

  @IsPositive({ message: 'price must not negative' })
  price: number;

  stock: number;

  categoryId: number;
}
