export class Paging {
  size: number;
  total: number;
  current: number;

  constructor(size: number, total: number, current: number) {
    this.size = size;
    this.total = total;
    this.current = current;
  }
}
