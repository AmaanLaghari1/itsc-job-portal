import Select from 'react-select';
import { Field, ErrorMessage } from 'formik';

const CustomSelect = ({ label, name, options, required=false, ...rest }) => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            // border: '1px solid #ced4da',
            // borderRadius: '4px',
            // padding: '2px',
        }),
    };

    return (
        <div>
            <label htmlFor={name}>
                {label} {required && <span className="text-danger fw-bold">*</span>}
            </label>

            <Field name={name}>
                {({ field, form }) => (
                    <Select
                        id={name}
                        name={name}
                        options={options}
                        getOptionLabel={(option) => option.value} // Customize displayed text
                        getOptionValue={(option) => option.key} // Set the value correctly
                        value={options.find(opt => opt.key === field.value) || null} // Sync Formik state
                        onChange={(selectedOption) => form.setFieldValue(name, selectedOption?.key || '')}
                        styles={customStyles}
                        isSearchable
                        {...rest}
                    />
                )}
            </Field>

            <div className="text-danger small">
                <ErrorMessage name={name} />
            </div>
        </div>
    );
};

export default CustomSelect;
