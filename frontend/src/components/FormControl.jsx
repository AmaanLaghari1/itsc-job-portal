import React from 'react'
import { Field, ErrorMessage } from 'formik'
// import DateView from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";

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
    const {label, name, options, required, ...rest} = props
    return (
        <div>
            <label className='form-check-label' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <div className="d-flex justify-content-between col-6">
            <Field className='form-control' id={name} name={name} {...rest}>
                {
                    ({field}) => {
                        {/* console.log(field) */}
                        return options.map(opt => {
                            return (
                                <div className='mx-2 w-100' key={opt.key}>
                                    <input className='form-check-input' type="radio" id={opt.key} {...field} value={opt.key} checked={field.value === opt.key} />
                                    <label className='form-check-label' htmlFor={opt.key}>{opt.value}</label>
                                </div>
                            )
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
            <label className='form-check-label' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <div className="d-flex justify-content-between">
                <Field className='form-check-input' id={name} name={name} {...rest}>
                    {
                        ({field}) => {
                            return options.map(opt => {
                                return (<div key={opt.key}>
                                    <input type="checkbox" className='form-check-input' id={opt.key} {...field} value={opt.value} checked={field.value.includes(opt.value)} />
                                    <label className='form-check-label' htmlFor={opt.key}>{opt.value}</label>
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
    return (
        <div>
            <label className='form-label' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field className='form-control' name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        return (
                            <div>
                                <DateView id={name} value={field.value} {...rest} {...field} selected={field.value} onChange={val =>  setFieldValue(name, val)} shouldCloseOnSelect={false} showTimeInput={false} showYearDropdown />
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
