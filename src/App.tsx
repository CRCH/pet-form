import React, { useState } from 'react';
// components
import Button from 'components/Button';
import Table from 'components/Table';
// containers
import Form from 'containers/Form';
// types
import { ColumnRendererType, Person } from 'components/Table/Table.types';
// icons
import { ReactComponent as CrossIcon } from 'icons/cross.svg';
// styles
import './App.scss';

// TODO: split code/add rx
// memoize/callbacks things

const initialEditState: { tableId: number, userId?: string } = { tableId: 0, userId: undefined };

const App = () => {
  const [{ tableId, userId }, setEditState] = useState(initialEditState);
  const isEdit = userId !== undefined;
  const [userTables, setUserTables] = useState<Person[][]>([[]]);

  const handleRowDelete = (tableIdx: number, userIdx: string) => {
    // TODO: Add confirm
    const newTable = userTables[tableIdx].filter((user) => user.id !== userIdx);
    setUserTables([
      ...userTables.slice(0, tableIdx),
      ...(newTable.length || tableIdx === 0 ? [newTable] : []),
      ...userTables.slice(tableIdx + 1),

    ]);
  };

  const renderButtonsColumn = (tableIdx: number): ColumnRendererType<Person> => ({ id }) => (
    <div className="button-column">
      <Button title="Edit" isLink isBlue onClick={() => setEditState({ tableId: tableIdx, userId: id })} />
      <Button title="Delete" isLink isRed onClick={() => handleRowDelete(tableIdx, id)} />
    </div>
  );

  const columns = (tableIdx: number) => [
    { label: 'Name', dataPath: 'name' },
    { label: 'Surname', dataPath: 'surname' },
    { label: 'Age', dataPath: 'age' },
    { label: 'City', dataPath: 'city' },
    { label: '', renderer: renderButtonsColumn(tableIdx) },
  ];

  const handleResetForm = () => {
    setEditState(initialEditState);
  };

  const handleFormSubmit = (values: Person) => {
    if (isEdit) {
      setUserTables([
        ...userTables.slice(0, tableId),
        [...userTables[tableId].map((user) => (user.id === userId ? values : user))],
        ...userTables.slice(tableId + 1),
      ]);
    } else {
      const lastId = userTables[0][userTables[0].length - 1]?.id;
      setUserTables([
        [...userTables[0], { ...values, id: lastId ? `${+lastId + 1}` : '0' }],
        ...userTables.slice(1),
      ]);
    }
    handleResetForm();
  };

  const handleTableDelete = (idx: number) => {
    setUserTables([
      ...userTables.slice(0, idx),
      ...userTables.slice(idx + 1),
    ]);
  };

  const handleCopyTable = () => {
    setUserTables([...userTables, userTables[0]]);
  };

  const handleClearParentTable = () => {
    setUserTables([
      [],
      ...userTables.slice(1),
    ]);
  };

  return (
    <div className="app-container">
      <div className="app-container__form">
        <Form
          onSubmit={handleFormSubmit}
          isEdit={isEdit}
          initialValues={userTables[tableId]?.find(({ id }) => userId === id)}
        />
      </div>
      {userTables.map((tableData, idx) => {
        const isParentTable = idx === 0;
        const handleDelete = () => (!isParentTable
          ? handleTableDelete(idx) : handleClearParentTable());
        return (
          <div key={`table-${idx}`} className="table-wrapper">
            <div className="table-wrapper__buttons">
              {isParentTable && (
                <Button
                  className="table-wrapper__copy-button"
                  title="CopyTable"
                  onClick={handleCopyTable}
                  isDisabled={!userTables[0].length}
                />
              )}
              <CrossIcon className="table-wrapper__cross" onClick={handleDelete} />
            </div>
            <Table columns={columns(idx)} data={tableData} />
          </div>
        );
      })}
    </div>
  );
};

export default App;
