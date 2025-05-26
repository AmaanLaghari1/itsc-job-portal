// MyEditorFormik.jsx
import React from 'react';
import { useField, useFormikContext } from 'formik';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const MyEditorFormik = ({ name, label, required}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div>
        <label htmlFor={name} className="form-label">{label || ''}<span className="text-danger">{required? '*' : ''}</span></label>
      <ReactQuill
        theme="snow"
        id={name}
        name={name}
        label={label}
        required={required || false}
        value={field.value}
        onChange={(val) => setFieldValue(name, val)}
        formats={formats}
        modules={modules}
      />
      {meta.touched && meta.error ? (
        <div className='text-danger'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyEditorFormik;
