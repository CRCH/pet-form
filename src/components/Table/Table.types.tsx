import React, { ReactNode } from 'react';

export type ColumnRendererType<T> = (arg: T) => React.ReactNode | string

export type Person = {
  id: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  [index: string]: string | number;
}

export type Column<T> = {
  label: string;
  dataPath?: string;
  renderer?: ColumnRendererType<T>
};

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}
