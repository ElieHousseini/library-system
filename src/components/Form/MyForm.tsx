import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { isValidSKU } from '../../helpers/syntaxCheck';
import postData from '../../services/post';
import { useNavigate } from "react-router-dom"
import './Form.scss'

type FormValues = {
  sku: string;
  name: string;
  price: string;
  type: string;
  size?: string;
  weight?: string;
  height?: string;
  width?: string;
  length?: string;
};

const initialValues: FormValues = {
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
    'Size is required for DVD',
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
    'Weight is required for Book',
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
    'Height is required for Furniture',
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
    'Width is required for Furniture',
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
    'Length is required for Furniture',
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

  const onSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    // Handle form submission here
    console.log(values);
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
    console.log('Form data', values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({values, errors, isSubmitting}) => (
        <Form>
          <div style={{marginBottom: '1rem'}}>
            <div>
              <label htmlFor="sku">SKU:</label>
              <Field type="text" id="sku" name="sku" />
            </div>
            <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
              <ErrorMessage name="sku" component="span" />
            </div>
          </div>

          <div style={{marginBottom: '1rem'}}>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
            </div>
            <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
              <ErrorMessage name="name" component="span" />
            </div>
          </div>

          <div style={{marginBottom: '1rem'}}>
            <div>
              <label htmlFor="price">Price ($)</label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key.toLowerCase() === 'e') {
                      event.preventDefault();
                    }
                  }}
              />
            </div>
            <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
              <ErrorMessage name="price" component="span" />
            </div>
          </div>

          <div style={{marginBottom: '1rem'}}>
            <div>
              <label htmlFor="type">Type</label>
              <Field as="select" id="type" name="type">
                <option value="DVD">DVD</option>
                <option value="Book">Book</option>
                <option value="Furniture">Furniture</option>
              </Field>
            </div>
            <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
              <ErrorMessage name="type" component="span" />
            </div>
          </div>

          {values.type === 'DVD' && (
            <>
              <div style={{marginBottom: '1rem'}}>
                <div>
                  <label htmlFor="size">Size (MB)</label>
                  <Field type="number" id="size" name="size" />
                </div>
                <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
                  <ErrorMessage name="size" component="span" />
                </div>
              </div>
              <h4>Please, provide size</h4>
            </>
          )}
          
          {values.type === 'Book' && (
            <>
            <div style={{marginBottom: '1rem'}}>
              <div>
                <label htmlFor="weight">Weight:</label>
                <Field type="number" id="weight" name="weight" />
              </div>
              <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
                <ErrorMessage name="weight" component="span" />
              </div>
            </div>
            <h4>Please, provide weight</h4>
            </>
          )}

          {values.type === 'Furniture' && (
          <>
            <div style={{marginBottom: '1rem'}}>
              <div>
                <label htmlFor="height">Height:</label>
                <Field type="number" id="height" name="height" />
              </div>
              <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
                <ErrorMessage name="height" component="span" />
              </div>
            </div>

            <div style={{marginBottom: '1rem'}}>
              <div>
                <label htmlFor="width">Width:</label>
                <Field type="number" id="width" name="width" />
              </div>
              <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
                <ErrorMessage name="width" component="span" />
              </div>
            </div>

            <div style={{marginBottom: '1rem'}}>
              <div>
                <label htmlFor="length">Length:</label>
                <Field type="number" id="length" name="length" />
              </div>
              <div style={{marginLeft: '15%', marginTop: '.5rem'}}>
                <ErrorMessage name="length" component="span" />
              </div>
            </div>
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