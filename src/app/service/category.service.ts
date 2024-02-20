import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/app/dto/create-category.dto';
import { Category } from 'src/app/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;

    return this.categoryRepository.save(category);
  }

  public findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id: id });
  }
}
