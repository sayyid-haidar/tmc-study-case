import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/app/dto/create-category.dto';
import { Category } from 'src/app/entity/category.entity';
import { CategoryService } from 'src/app/service/category.service';
import { DataResponse } from '../dto/data-response.dto';

@Controller('/api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<DataResponse<Category>> {
    const category = await this.categoryService.create(createCategoryDto);

    return new DataResponse(category);
  }
}
