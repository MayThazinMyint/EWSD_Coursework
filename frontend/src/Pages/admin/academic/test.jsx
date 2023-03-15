import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const validationSchema = Yup.object().shape({
  textInput: Yup.string().required('This field is required'),
  datePicker: Yup.date().required('This field is required'),
});

const test = () => {
  const initialValues = {
    textInput: '',
    datePicker: null,
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="textInput">Text Input:</label>
            <Field
              id="textInput"
              name="textInput"
              type="text"
              value={values.textInput}
              onChange={handleChange}
            />
            {errors.textInput && touched.textInput ? <div>{errors.textInput}</div> : null}
          </div>
          <div>
            <label htmlFor="datePicker">Date Picker:</label>
            <DatePicker
              id="datePicker"
              name="datePicker"
              selected={values.datePicker}
              onChange={(date) => setFieldValue('datePicker', date)}
              dateFormat="dd/MM/yyyy"
            />
            {errors.datePicker && touched.datePicker ? <div>{errors.datePicker}</div> : null}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default test;
