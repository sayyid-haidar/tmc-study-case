/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from 'src/app/service/product.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class SkuExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}

  async validate(value: string, args?: ValidationArguments): Promise<boolean> {
    let isSkuExists = false;

    const product = await this.productService.findOneBy({
      sku: value,
    });
    if (!product) {
      isSkuExists = true;
    }
    return isSkuExists;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return 'sku is unique';
  }
}
