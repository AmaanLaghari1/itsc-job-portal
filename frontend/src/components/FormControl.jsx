import React from 'react'
import { Field, ErrorMessage } from 'formik'
import DateView from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { CFormCheck } from '@coreui/react';

function FormControl(props) {
    const {control, ...rest} = props
    switch(control){
        case 'input': return <Input {...rest} />
        case 'checkbox': return <Checkbox {...rest} />
        case 'textarea': return <Textarea {...rest} />
        case 'select': return <Select {...rest} />
        case 'radio': return <Radio {...rest} />
        case 'date': return <DateInput {...rest} />
        default: return null
    }
}

const Input = (props) => {
    const {label, name, type, required, ...rest} = props
    return (
        <div>
            <label htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field className='form-control' type={type} name={name} id={name} {...rest} />
            <div className="small text-danger">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

const Textarea = (props) => {
    const {label, name, required, ...rest} = props
    return (
        <div>
            <label htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field className='form-control' as='textarea' name={name} id={name} {...rest} />
            <div className="small text-danger">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

const Radio = (props) => {
    const { label, name, options, required, ...rest } = props;
    
    return (
        <div>
            <label className='form-check-label' htmlFor={name}>
                {label}{required ? <span className='text-danger fw-bold'>*</span> : ''}
            </label>
            <div className="d-flex justify-content-between col-6">
                <Field name={name} {...rest}>
                    {({ field }) => {
                        return options.map(opt => {
                            return (
                                <div className='mx-2 w-100 my-2' key={opt.key}>
                                    <CFormCheck 
                                        type="radio" 
                                        id={opt.key} 
                                        label={opt.value} 
                                        {...field} 
                                        value={opt.key} // ✅ Ensure correct value
                                        checked={field.value == opt.key} // ✅ Ensure correct selection
                                    />
                                </div>
                            );
                        });
                    }}
                </Field>
            </div>
            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    );
};

const Select = props => {
    const {label, name, options, required, ...rest} = props
    return (
        <div>
            <label htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field as='select' className='form-control' id={name} name={name} {...rest}>
                <option value="">Select an option</option>
                {
                    options.map(opt => {
                        return <option key={opt?.key || opt} value={opt?.key || opt}>{opt?.value}</option>
                    })    
                }
            </Field>
            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

const Checkbox = props => {
    const {label, name, options, required, ...rest} = props
    return (
        <div>
            {label != '' && <label className='form-check-label' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>}
            <div className="d-flex justify-content-between">
                <Field className='form-check-input' id={name} name={name} {...rest}>
                    {
                        ({field}) => {
                            return options.map(opt => {
                                return (<div key={opt.key}>
                                    <input type="checkbox" className='form-check-input' id={opt.key} {...field} value={opt.value} checked={field.value.includes(opt.value)} />
                                    <label className='form-check-label mx-1' htmlFor={opt.key}> {opt.value}</label>
                                </div>)
                            })
                        }
                    }
                </Field>
            </div>
            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

const DateInput = props => {
    const {label, name, required, ...rest} = props
    const maxDate = new Date(); // Current date

    return (
        <div>
            <label className='form-label mb-0' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field className='form-control' name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        return (
                            <div>
                                <DateView 
                                className='form-control w-100' 
                                id={name} 
                                value={field.value} 
                                {...rest} 
                                {...field} 
                                selected={field.value} 
                                onChange={val =>  setFieldValue(name, val)} 
                                shouldCloseOnSelect={true} 
                                showTimeInput={false} 
                                showYearDropdown
                                yearDropdownItemNumber={50}
                                scrollableYearDropdown
                                maxDate={maxDate}
                                minDate={new Date("01/01/1900")}
                                dateFormat="yyyy/MM/dd"    
                                />
                            </div>
                        )
                    }
                }
            </Field>
            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

export default FormControl
