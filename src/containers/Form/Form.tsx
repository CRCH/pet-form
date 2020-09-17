import React, {
  FC, useState, useEffect, ChangeEvent,
} from 'react';
// utils
import cn from 'classnames';
// components
import Card from 'components/Card';
import Input from 'components/Input';
import Button from 'components/Button';
// types
import { Person } from 'components/Table/Table.types';
// validation
import { validatePerson } from './validation';
// styles
import './Form.scss';

export interface FormProps {
  className?: string;
  isEdit?: boolean;
  onSubmit?: any
  initialValues?: Person
}

export type ErrorsType = {
  [index: string]: string
}

export const defaultValues = {
  id: '',
  name: '',
  surname: '',
  age: '',
  city: '',
};

const Form: FC<FormProps> = ({
  className,
  isEdit,
  onSubmit: handleSave,
  initialValues = defaultValues,
}) => {
  const [person, setPerson] = useState(defaultValues);
  const [errors, setErrors] = useState<ErrorsType>({});
  const {
    name, surname, age, city,
  } = person;
  const handleOnChange = (field: string) => ({ target: { value } }
    : ChangeEvent<HTMLInputElement>) => setPerson(
    (prev) => ({ ...prev, [field]: value.trim() }),
  );

  const handleSubmit = () => {
    const validationErrors = validatePerson(person);
    const isValid = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (isValid) {
      handleSave(person);
      setPerson(defaultValues);
    }
  };

  useEffect(() => {
    setErrors({});
    setPerson(initialValues);
  }, [initialValues]);

  const clearErrors = () => setErrors({});

  return (
    <Card className={cn('form-card', className)}>
      <Input
        className="form-card__input"
        value={name}
        errorMessage={errors?.name}
        onFocus={clearErrors}
        onChange={handleOnChange('name')}
        placeholder="Name"
        pattern="^[\w\s-]{0,128}$"
      />
      <Input
        className="form-card__input"
        value={surname}
        onChange={handleOnChange('surname')}
        placeholder="Surname"
        onFocus={clearErrors}
        errorMessage={errors?.surname}
        pattern="^[\w\s-]{0,128}$"
      />
      <Input
        className="form-card__input"
        value={age}
        onChange={handleOnChange('age')}
        placeholder="Age"
        pattern="^[0-9]{0,3}$"
        onFocus={clearErrors}
        errorMessage={errors?.age}
      />
      <Input
        className="form-card__input"
        value={city}
        onChange={handleOnChange('city')}
        placeholder="City"
        pattern="^[\w\s-]{0,128}$"
        onFocus={clearErrors}
        errorMessage={errors?.city}
      />
      <div className="form-card__button-wrapper">
        <Button className="form-card__button" isPrimary onClick={handleSubmit} title={isEdit ? 'Edit' : 'Add'} />
      </div>
    </Card>
  );
};

export default Form;
