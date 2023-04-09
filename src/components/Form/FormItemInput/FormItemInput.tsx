import './FormItemInput.scss'

import { Field, ErrorMessage } from 'formik';

type FormItemType = {
    name: 'sku' | 'name' | 'price' | 'size' | 'weight' | 'width' | 'height' | 'length',
    fieldType: 'text' | 'number',
    labelTxt: string
}

const FormItemInput = ({name, fieldType, labelTxt} : FormItemType) => {
    return(
        <div className='parent-form-item'>
            <div>
                <label htmlFor={name}>{labelTxt}</label>
                <Field type={fieldType} id={name} name={name} />
            </div>
            <div className='right'>
                <ErrorMessage name={name} component="span" />
            </div>
      </div>
    )
}

export default FormItemInput