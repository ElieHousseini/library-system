import './Form.scss'
import React, { useState } from 'react';
import ControlledInput from '../ControlledInput/ControlledInput';
import ControlledSwitcher from '../ControlledSwitcher/ControlledSwitcher';
import { isValidSKU, hasTooMuchSpaces, isNumeric, isNotEmpty } from '../../helpers/syntaxCheck';
import { ProductType } from '../../types';
import postData from '../../services/post';
import { useNavigate } from "react-router-dom"

const Form_old = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState<ProductType>({
    sku: '',
    name: '',
    price: '',
    type: 'DVD',
    size: '',
    height: '',
    width: '',
    length: '',
    weight: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;

    const VALIDATION_FIELDS = {
      'alphanumeric': ['name'],
      'numeric': ['price', 'size', 'weight', 'height', 'width', 'length'],
      'sku': ['sku']
    }

    if (
      !isNotEmpty(value) ||
      (VALIDATION_FIELDS['sku'].includes(name) && !isValidSKU(value)) ||
      (VALIDATION_FIELDS['alphanumeric'].includes(name) && (hasTooMuchSpaces(value) || !isNotEmpty(value))) ||
      (VALIDATION_FIELDS['numeric'].includes(name) && !isNumeric(value))
    ) {
      event.target.classList.add('input-error')
    }
    else {
      event.target.classList.remove('input-error')
    }
    setFormData({ ...formData, [name]: value });
  };

  const getElement = (id: string): HTMLInputElement => document.getElementById(id) as HTMLInputElement;

  const validateField = (field: HTMLInputElement, validation: (value: string) => boolean, errorMessage: string): string | null => {
    if (!validation(field.value)) {
      field.classList.add('input-error');
      return errorMessage;
    }
    return null;
  };

  const validateRequired = (field: HTMLInputElement): string | null => validateField(field, isNotEmpty, 'Please, submit required data');
  const validateDataType = (field: HTMLInputElement, dataTypeValidation: (value: string) => boolean): string | null => validateField(field, dataTypeValidation, 'Please, provide the data of indicated type');

  const validateDOMLegacy = (): string | null => {
    const sku = getElement('sku');
    const name = getElement('name');
    const price = getElement('price');
    const productType = getElement('productType');

    const requiredFields: HTMLInputElement[] = [sku, name, price];
    for (const field of requiredFields) {
      const errorMessage = validateRequired(field);
      if (errorMessage) return errorMessage;
    }

    const dataTypeValidations: { field: HTMLInputElement, validation: (value: string) => boolean }[] = [
      { field: sku, validation: isValidSKU },
      { field: name, validation: (value) => !hasTooMuchSpaces(value) && isNotEmpty(value) },
      { field: price, validation: isNumeric },
    ];

    for (const { field, validation } of dataTypeValidations) {
      const errorMessage = validateDataType(field, validation);
      if (errorMessage) return errorMessage;
    }

    const productSpecificFields: Record<string, { id: string, validation: (value: string) => boolean }[]> = {
      'DVD': [{ id: 'size', validation: isNumeric }],
      'Furniture': [
        { id: 'height', validation: isNumeric },
        { id: 'width', validation: isNumeric },
        { id: 'length', validation: isNumeric },
      ],
      'Book': [{ id: 'weight', validation: isNumeric }],
    };

    const specificFields = productSpecificFields[productType.value];
    if (specificFields) {
      for (const { id, validation } of specificFields) {
        const field = getElement(id);
        const requiredErrorMessage = validateRequired(field);
        if (requiredErrorMessage) return requiredErrorMessage;

        const dataTypeErrorMessage = validateDataType(field, validation);
        if (dataTypeErrorMessage) return dataTypeErrorMessage;
      }
    }

    return null;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // let message = validateInputs();
    let message = validateDOMLegacy();
    if (!message) {
      const POST_URL = process.env.REACT_APP_POST_URL;
      postData({ url: POST_URL as string, formData })
        .then(({ success, message }) => {
          if (success) {
            navigate('/');
          } else {
            alert('error: ' + message);
          }
        })
        .catch((error) => {
          alert('error: ' + error);
        });
    } else {
      alert(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} id="product_form">
      <ControlledInput
        labelTxt='SKU'
        id='sku'
        type='text'
        name='sku'
        value={formData.sku}
        onChange={handleInputChange}
      />
      <ControlledInput
        labelTxt='Name'
        id='name'
        type='text'
        name='name'
        value={formData.name}
        onChange={handleInputChange}
      />
      <ControlledInput
        labelTxt='Price($)'
        id='price'
        type='number'
        name='price'
        value={formData.price}
        onChange={handleInputChange}
      />
      <ControlledSwitcher
        labelText='Type Switcher'
        dropdownList={['DVD', 'Book', 'Furniture']}
        defaultValue='DVD'
        name='type'
        id="productType"
        onChange={handleInputChange}
      />

      {/* DVD */}
      {
        formData.type.toLowerCase() === 'dvd' && (
          <>
            <ControlledInput
              labelTxt='Size (MB)'
              id='size'
              type='number'
              name='size'
              value={formData.size || ""}
              onChange={handleInputChange}
            />
            <div id="description-of-type"><b>Please, provide size</b></div>
          </>

        )
      }
      {/* Furniture */}
      {
        formData.type.toLowerCase() === 'furniture' && (
          <>
            <ControlledInput
              labelTxt='Height (CM)'
              id='height'
              type='number'
              name='height'
              value={formData.height || ""}
              onChange={handleInputChange}
            />
            <ControlledInput
              labelTxt='Width (CM)'
              id='width'
              type='number'
              name='width'
              value={formData.width || ""}
              onChange={handleInputChange}
            />
            <ControlledInput
              labelTxt='Length (CM)'
              id='length'
              type='number'
              name='length'
              value={formData.length || ""}
              onChange={handleInputChange}
            />
            <div id="description-of-type"><b>Please, provide dimensions</b></div>
          </>
        )
      }

      {/* book */}
      {
        formData.type.toLowerCase() === 'book' && (
          <>
            <ControlledInput
              labelTxt='Weight (KG)'
              id='weight'
              type='number'
              name='weight'
              value={formData.weight || ""}
              onChange={handleInputChange}
            />
            <div id="description-of-type"><b>Please, provide weight</b></div>
          </>
        )
      }
      <button id="form-submit" type="submit" />
    </form>
  );
}

export default Form_old