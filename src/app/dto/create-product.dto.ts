import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MaxLength,
  Validate,
} from 'class-validator';
import { SkuExistsRule } from './rule/sku-exists.rule';

export class CreateProductDto {
  @IsNotEmpty({ message: 'sku is empty' })
  @MaxLength(255, { message: 'sku length must not more than 255 characters' })
  @Validate(SkuExistsRule)
  sku: string;

  @IsNotEmpty({ message: 'name is empty' })
  @MaxLength(255, { message: 'name length must not more than 255 characters' })
  name: string;

  @IsNotEmpty({ message: 'price is empty' })
  @IsPositive({ message: 'price must not negative' })
  price: number;

  @IsNotEmpty({ message: 'stock is null' })
  stock?: number = 0;

  @IsOptional()
  categoryId?: number;
}
