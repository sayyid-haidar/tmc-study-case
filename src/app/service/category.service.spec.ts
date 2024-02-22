import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'TestCategory' };
      const savedCategory = new Category();
      savedCategory.name = createCategoryDto.name;

      jest.spyOn(repository, 'save').mockResolvedValue(savedCategory);

      const result = await service.create(createCategoryDto);

      expect(result).toEqual(savedCategory);
    });
  });

  describe('findById', () => {
    it('should find a category by id', async () => {
      const categoryId = 1;
      const category = { id: categoryId };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(category);

      const result = await service.findOneById(categoryId);

      expect(result).toEqual(category);
    });

    it('should return null if category is not found', async () => {
      const categoryId = 0;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOneById(categoryId);

      expect(result).toBeNull();
    });
  });
});
