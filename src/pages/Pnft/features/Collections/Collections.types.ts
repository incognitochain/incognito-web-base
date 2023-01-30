import { ColumnType, SortOrder } from 'antd/es/table/interface';
import { ICollection } from 'pages/Pnft';

export interface ILabel {
  text: string;
  numb: number;
  className?: string;
}

export interface ITbHeader {
  sortColumns?: {
    column: ColumnType<ICollection>;
    order: SortOrder;
  }[];
  title: string;
  key?: string;
}
