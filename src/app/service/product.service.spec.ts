import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entity/product.entity';
import { ProductQuery } from '../dto/product-query.dto';
import { Category } from '../entity/category.entity';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        CategoryService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        sku: 'SKU123',
        name: 'Test Product',
        price: 10,
        stock: 100,
        categoryId: 1,
      };
      const product = new Product();
      product.sku = createProductDto.sku;
      product.name = createProductDto.name;
      product.price = createProductDto.price;
      product.stock = createProductDto.stock;

      const category = { id: 1, name: 'TestCategory' };
      jest.spyOn(categoryService, 'findOneById').mockResolvedValue(category);
      jest.spyOn(productRepository, 'save').mockResolvedValue(product);

      const result = await productService.create(createProductDto);

      expect(result).toEqual(product);
    });
  });

  describe('findOneBy', () => {
    it('should find a product', async () => {
      const productQuery: ProductQuery = { sku: 'SKU123' };
      const product = new Product();
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(product);

      const result = await productService.findOneBySku(productQuery.sku);

      expect(result).toEqual(product);
    });
  });

  describe('findAllBy', () => {
    it('should find all products', async () => {
      const productQuery: ProductQuery = { page: 1, 'page.size': 10 };
      const products: Product[] = [new Product()];
      jest
        .spyOn(productRepository, 'findAndCount')
        .mockResolvedValue([products, products.length]);

      const result = await productService.findAllBy(productQuery);

      expect(result).toEqual([products, products.length]);
    });
  });
});
