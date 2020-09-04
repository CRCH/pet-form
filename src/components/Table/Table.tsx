import React, { FC } from 'react';
// types
import { Column, TableProps } from './Table.types'
// styles
import './Table.scss';


// const data = true;
const Table = <T extends object>({
  data,
  columns,
}: TableProps<T>) => {

  const labels = columns.map(({ label }) => label);

  return (
    <div className="table">
      <div className="table__header">
        {columns.map(({ label }, idx) => (
          <div className="table__cell" key={`table-header-${idx}`}>
            {label}
          </div>
        ))}
      </div>
      <div className="table__body">
        {data.map((item, rowIdx) => (
          <div key={`table-row-${rowIdx}`} className="table__row">
            {columns.map(({ dataPath, renderer }, cellIdx) => (
              <div key={`cell-${cellIdx}`} className="table__cell">
                {dataPath && item[dataPath as keyof object]}
                {renderer && renderer(item)}
              </div>
            ))}
          </div>
        ))}
        {!data && (
          <div className="table__placeholder">No data to display :(</div>
        )}
      </div>
    </div>
  );
};

export default Table;
