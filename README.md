# Tirta Medical Centre Case Study

## API SPEC

### Search API

- Endpoint : /api/search
- Query Parameter
  - sku : filter by sku, support multiple parameter
  - name : filter by name (LIKE), support multiple
- parameters
  - price.start : filter by start price
  - price.end : filter by end price
  - stock.start : filter by start stock
  - stock.end : filter by end stock
  - category.id : filter by category.id, support
- multiple parameters
  - category.name : filter by category.name, support multiple parametersExample
- example request
  - Search products with sku in (1, 2, 3) : /api/search?sku=1&sku=2&sku=3
  - Search products with name like a or b or c : /api/search?name=a&name=b&name=c
  - Search products with price >= 100 and <= 1000 : /api/search?price.start=100&price.end=1000
  - Search product in categories (1, 2, 3) : /api/search?category.id=1&category.id=2&categ ory.id=3

## Need To Implements

- [x] API category
- [x] API products
- [ ] API search
- [ ] Unit test
- [x] Validation
- [x] Database migration
- [ ] Diferent database form query API and command API is a plus
- [ ] Using message broker to sync between query API and command API is a plus
