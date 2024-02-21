import { Body, Controller, Post } from '@nestjs/common';
import { DataResponse } from '../dto/data-response.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entity/category.entity';
import { CategoryService } from '../service/category.service';

@Controller('/api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<DataResponse<Category>> {
    const category = await this.categoryService.create(createCategoryDto);

    return new DataResponse(category);
  }
}
