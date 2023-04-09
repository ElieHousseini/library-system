import './FormItemSelect.scss'

import { Field, ErrorMessage } from 'formik';

type FormItemType = {
    name: 'type',
    fieldType: 'select',
    labelTxt: string,
    id: string,
    options: ["DVD", "Book", "Furniture"]
}

const FormItemInput = ({name, fieldType, labelTxt, id, options} : FormItemType) => {
    return(
        <div className='parent-form-item'>
            <div>
                <label htmlFor={name}>{labelTxt}</label>
                <Field as={fieldType} id={id} name={name}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                </Field>
            </div>
            <div style={{marginLeft: '18%', marginTop: '.5rem'}}>
                <ErrorMessage name={name} component="span" />
            </div>
        </div>
    )
}

export default FormItemInput