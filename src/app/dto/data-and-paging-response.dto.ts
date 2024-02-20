import { Paging } from './paging.dto';

export class DataAndPagingResponse<T> {
  data?: T;
  paging?: Paging;

  constructor(data?: T, paging?: Paging) {
    this.data = data;
    this.paging = paging;
  }
}
