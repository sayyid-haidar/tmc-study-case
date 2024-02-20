/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Product } from 'src/app/entity/product.entity';
import { ProductService } from 'src/app/service/product.service';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class SkuExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}

  public async validate(
    value: string,
    args?: ValidationArguments,
  ): Promise<boolean> {
    let isSkuExists = false;

    console.log(this.productService);
    const product = await this.productService.findOneBy({
      sku: value,
    });
    if (product) {
      isSkuExists = true;
    }
    return isSkuExists;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return 'sku is unique';
  }
}
