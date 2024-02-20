import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/app/dto/create-category.dto';
import { Category } from 'src/app/entity/category.entity';
import { CategoryService } from 'src/app/service/category.service';

@Controller('/api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }
}
