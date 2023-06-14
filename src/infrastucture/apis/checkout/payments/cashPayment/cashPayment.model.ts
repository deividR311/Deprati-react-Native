import { MapperDTO_To_Model as MapperDTO } from '../../../common/mapper-dto-to-model';
import {
  GetBankingResponse,
  Component as ComponentResponse,
  Pagination as PaginationResponse,
  Sort as SortResponse
} from './cashPayment.type';

import {
  GetBankingModel,
  IComponent,
  IPagination,
  ISort
} from './interfaces/cashPayment.model.interfaces';

export function mapOrdersModelfromDTO(
  rawData: GetBankingResponse
): GetBankingModel {
  const newComponents = rawData.component.map(component =>
    new MapperDTO<ComponentResponse, IComponent>(component, {
      uid: 'uid',
      typeCode: 'typeCode',
      modifiedTime: 'modifiedTime',
      name: 'name',
      container: 'container',
      content: 'content'
    }).get()
  );

  const newPagination = new MapperDTO<PaginationResponse, IPagination>(
    rawData.pagination,
    {
      count: 'count',
      page: 'page',
      totalCount: 'totalCount',
      totalPages: 'totalPages'
    }
  ).get();

  const newSorts = rawData.sorts.map(sort =>
    new MapperDTO<SortResponse, ISort>(sort, {
      code: 'code',
      name: 'name',
      selected: 'selected'
    }).get()
  );
  rawData.component = newComponents;
  rawData.pagination = newPagination;
  rawData.sorts = newSorts;

  return rawData;
}
