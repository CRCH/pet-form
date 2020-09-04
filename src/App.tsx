import React from 'react';
// components
import Button from 'components/Button';
import Table from 'components/Table';
// types
import { ColumnRendererType, Person } from 'components/Table/Table.types'
// styles
import './App.scss';

const renderButtonsColumn: ColumnRendererType<Person> = ({ id }: any) => (
  <div className="button-column">
    <Button title="Edit" isLink isBlue onClick={() => console.log(id)} />
    <Button title="Delete" isLink isRed onClick={() => console.log(id)} />
  </div>
)

const columns = [
  { label: 'Name', dataPath: 'name' },
  { label: 'Surname', dataPath: 'surname' },
  { label: 'Age', dataPath: 'age' },
  { label: 'City', dataPath: 'city' },
  { label: '', renderer: renderButtonsColumn },
];

const sampleUser = {
  id: 'user-0', name: 'Andrew', surname: 'Meshehceryakov', age: 23, city: 'Sumy',
};

const data = [sampleUser, sampleUser,sampleUser,sampleUser,]


const App = () => (
  <div className="app-container">
    <div style={{ width: 800, flexDirection: 'column', display: 'flex' }}>
      <Table columns={columns} data={data} />
    </div>
  </div>
);

export default App;
