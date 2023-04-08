import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiCall = createAsyncThunk('api/call', async (formData) => {
  const response = await axios.post('/api/endpoint', formData);
  return response.data;
});

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required('A file is required'),
  text: Yup.string().required('Text is required'),
  number: Yup.number().required('Number is required'),
});

const initialValues = {
  file: null,
  text: '',
  number: '',
};

const IdeaTest = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    console.log('values', values);
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('text', values.text);
    formData.append('number', values.number);
    console.log('form', formData);
    //dispatch(apiCall(formData));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <div>
            <label htmlFor="file">File</label>
            <input
              type="file"
              name="file"
              onChange={(event) => formikProps.setFieldValue('file', event.target.files[0])}
            />
            {formikProps.errors.file && formikProps.touched.file && (
              <div>{formikProps.errors.file}</div>
            )}
          </div>
          <div>
            <label htmlFor="text">Text</label>
            <Field type="text" name="text" />
            {formikProps.errors.text && formikProps.touched.text && (
              <div>{formikProps.errors.text}</div>
            )}
          </div>
          <div>
            <label htmlFor="number">Number</label>
            <Field type="number" name="number" />
            {formikProps.errors.number && formikProps.touched.number && (
              <div>{formikProps.errors.number}</div>
            )}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default IdeaTest;
