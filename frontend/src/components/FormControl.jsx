import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import DateView from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { CFormCheck } from '@coreui/react';
import { normalizeDate } from '../helper';

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
    const { label, name, type, required, setFieldValue, ...rest } = props;

    return (
        <div>
            <label className='fw-bold' htmlFor={name}>
                {label}
                {required ? <span className='text-danger mb-0 fw-bold'>*</span> : ''}
            </label>

            {type === "file" ? (
                <input
                    className='form-control mt-0'
                    type="file"
                    name={name}
                    id={name}
                    onChange={(event) => {
                        setFieldValue(name, event.currentTarget.files[0]);
                    }}
                />
            ) : (
                <Field
                    className='form-control mt-0'
                    type={type}
                    name={name}
                    id={name}
                    {...rest}
                />
            )}

            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    );
};

const Textarea = (props) => {
    const {label, name, required, ...rest} = props
    return (
        <div>
            <label className='fw-bold' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field className='form-control' as='textarea' name={name} id={name} {...rest} />
            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

const Radio = (props) => {
    const { label, name, options, required, ...rest } = props;
    
    return (
        <div>
            <label className='form-check-label fw-bold' htmlFor={name}>
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
                                        value={opt.key} 
                                        checked={field.value == opt.key} 
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
            <label className='fw-bold' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
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
    const {values} = useFormikContext();
    return (
        <div className='w-100'>
            {label != '' && <label className='form-check-label fw-bold' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold w-100'>*</span>: ''}</label>}
            <div className="d-flex justify-content-between flex-column w-100">
                <Field className='form-check-input w-100' id={name} name={name} {...rest}>
                    {
                        ({field}) => {
                            // console.log(field.value);
                            return options.map(opt => {
                                return (
                                <div className='row my-2' key={opt.key}>
                                    <div className="col-9 d-flex">
                                        <input type="checkbox" className='form-check-input' id={opt.key} {...field} value={opt.key} checked={field.value == undefined ? false : field.value.includes(opt.key.toString())}  />
                                        <label className='form-check-label mx-1' htmlFor={opt.key}> {opt.value}</label>
                                    </div>
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


const ReadOnlyInput = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} readOnly className='form-control w-100' />
));

const DateInput = props => {
    const {label, name, required, maxDateDisabled, ...rest} = props
    const maxDate = new Date(); // Current date

    return (
        <div>
            <label className='form-label fw-bold mb-0' htmlFor={name}>{label}{required ? <span className='text-danger fw-bold'>*</span>: ''}</label>
            <Field className='form-control' name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        return (
                            <div>
                                <DateView
                                className="form-control w-100"
                                id={name}
                                selected={field.value ? new Date(field.value) : null}
                                onChange={(val) => setFieldValue(name, val)}
                                showYearDropdown
                                showMonthDropdown
                                yearDropdownItemNumber={70}
                                scrollableYearDropdown
                                minDate={new Date("1900-01-01")}
                                maxDate={maxDateDisabled ? null : maxDate}
                                dateFormat="dd-MM-yyyy"
                                customInput={<ReadOnlyInput />}
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
