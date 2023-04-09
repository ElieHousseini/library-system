import './Form.scss'

import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { Formik, Form, FormikHelpers } from 'formik';

import { isValidSKU } from '../../helpers/syntaxCheck';
import postData from '../../services/post';
import {ProductType} from '../../types';
import FormItemInput from './FormItemInput/FormItemInput';
import FormItemSelect from './FormItemSelect/FormItemSelect';

const initialValues: ProductType = {
  sku: '',
  name: '',
  price: '',
  type: 'DVD',
  size: '',
  weight: '',
  height: '',
  width: '',
  length: '',
};

const validationSchema = Yup.object({
  sku: Yup.string()
    .required('SKU is required')
    .test('isValidSKU', 'Invalid SKU format', (value) => isValidSKU(value)),
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  type: Yup.string().required('Type is required'),
  size: Yup.number().test(
    'requiredIfDVD',
    'Size is required',
    function (value, context) {
      const { type } = context.parent as { type: string };
      if (type === 'DVD' && (value === undefined || value === null || value <= 0)) {
        return false;
      }
      return true;
    }
  ),
  weight: Yup.number().test(
    'requiredIfBook',
    'Weight is required',
    function (value, context) {
      const { type } = context.parent as { type: string };
      if (type === 'Book' && (value === undefined || value === null || value <= 0)) {
        return false;
      }
      return true;
    }
  ),
  height: Yup.number().test(
    'requiredIfFurniture',
    'Height is required',
    function (value, context) {
      const { type } = context.parent as { type: string };
      if (type === 'Furniture' && (value === undefined || value === null || value <= 0)) {
        return false;
      }
      return true;
    }
  ),
  width: Yup.number().test(
    'requiredIfFurniture',
    'Width is required',
    function (value, context) {
      const { type } = context.parent as { type: string };
      if (type === 'Furniture' && (value === undefined || value === null || value <= 0)) {
        return false;
      }
      return true;
    }
  ),
  length: Yup.number().test(
    'requiredIfFurniture',
    'Length is required',
    function (value, context) {
      const { type } = context.parent as { type: string };
      if (type === 'Furniture' && (value === undefined || value === null || value <= 0)) {
        return false;
      }
      return true;
    }
  ),
});

const MyForm: React.FC = () => {
  
  let navigate = useNavigate();
  
    // Handle form submission here
  const onSubmit = (values: ProductType, formikHelpers: FormikHelpers<ProductType>) => {
    const POST_URL = process.env.REACT_APP_POST_URL;
    postData({ url: POST_URL as string, formData: values })
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
    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({values, errors, isSubmitting}) => (
        <Form>
          <FormItemInput name='sku' fieldType='text' labelTxt='SKU'/>
          <FormItemInput name='name' fieldType='text' labelTxt='Name'/>
          <FormItemInput name='price' fieldType='number' labelTxt='Price ($)'/>
          <FormItemSelect id="productType" name='type' fieldType='select' labelTxt='Type' options= {["DVD", "Book", "Furniture"]}/>

          {values.type === 'DVD' && (
            <>
              <FormItemInput name='size' fieldType='number' labelTxt='Size (MB)' />
              <h4>Please, provide size</h4>
            </>
          )}
          
          {values.type === 'Book' && (
            <>
            <FormItemInput name='weight' fieldType='number' labelTxt='Weight (KG)' />
            <h4>Please, provide weight</h4>
            </>
          )}

          {values.type === 'Furniture' && (
          <>
            <FormItemInput name='height' fieldType='number' labelTxt='Height (CM)' />
            <FormItemInput name='width' fieldType='number' labelTxt='Width (CM)' />
            <FormItemInput name='length' fieldType='number' labelTxt='Length (CM)' />
            <h4>Please, provide dimensions</h4>
          </>
          )}
          <button type="submit" id="form-submit" disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
