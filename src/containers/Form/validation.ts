import { Person } from 'components/Table/Table.types';

import { ErrorsType } from './Form';

export const validatePerson = (person: Person) => {
  // eslint-disable-next-line prefer-const
  let errors: ErrorsType = {};

  if (!person.name) {
    errors.name = 'Cant be blank';
  }
  if (!person.surname) {
    errors.surname = 'Cant be blank';
  }
  if (!person.age) {
    errors.age = 'Cant be blank';
  }
  if (!person.city) {
    errors.city = 'Cant be blank';
  }
  return errors;
};

export default { validatePerson };
