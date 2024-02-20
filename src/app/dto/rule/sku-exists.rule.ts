/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from 'src/app/service/product.service';

@ValidatorConstraint({ name: 'SkuExists', async: true })
@Injectable()
export class SkuExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    let isSkuExists = false;

    const product = await this.productService.findBySku(value);
    if (product != null) {
      isSkuExists = true;
    }

    return isSkuExists;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'sku is unique';
  }
}
