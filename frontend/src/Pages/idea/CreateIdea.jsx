import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import { FcIdea } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import Label from '../../components/Label';
import { fetchCategories } from '../../features/category/categorySlice';
import { postIdea } from '../../features/idea/ideaSlice';
import Cookies from 'js-cookie';
import Loading from '../../components/common/Loading';
const CreateIdea = () => {
  const user = useSelector((state) => state.auth);
  const categoryList = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = Cookies.get('userId');
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // initial values
  const initialValues = {
    idea_description: '',
    attachment: '',
    category_id: '',
    user_id: userId,
    is_anonymous: false,
    academic_id: 4,
    terms: false,
  };
  // validations
  const validationSchema = Yup.object({
    idea_description: Yup.string().required('Idea description is required.'),
    category_id: Yup.string().required('Category is required.'),
    terms: Yup.boolean()
      .required('The terms and conditions must be accepted.')
      .oneOf([true], 'The terms and conditions must be accepted.'),
  });
  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  //submit data
  const onSubmit = async (data, { resetForm }) => {
    console.log('is anonymous', data);
    let myForm = document.getElementById('myForm');
    let newFormData = new FormData(myForm);

    console.log('data', data);
    newFormData.append('user_id', data.user_id);
    if (data.attachment) {
      newFormData.append('attachment', data.attachment);
    }
    newFormData.append('is_anonymous', data.is_anonymous === true ? 1 : 0);
    newFormData.append('academic_id', initialValues.academic_id);
    //console.log('newFormData', newFormData);

    dispatch(postIdea(newFormData)).then((res) => {
      resetForm();
      navigate('/idea/all');
    });
  };
  if (categoryList.loading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:pt-[25px]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex">
              <FcIdea size={30} />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Idea
              </h1>
            </div>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form id="myForm" className="space-y-2 " onKeyDown={onKeyDown}>
                  <ConnectedFocusError />
                  <Label text="Upload Documents" required="" hint="" />
                  <input
                    type="file"
                    className="py-2 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    onChange={(event) => {
                      formik.setFieldValue('attachment', event.target.files[0]);
                    }}
                  />
                  <Label text="Idea Description" required="*" hint="" />
                  <Field
                    as="textarea"
                    name="idea_description"
                    placeholder="Enter Idea Description"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  ${
                      formik.errors.idea_description && formik.touched.idea_description
                        ? 'border border-red-500'
                        : ''
                    }`}
                    autoComplete="off"
                  />
                  <div className="validate-show">
                    <ErrorMessage
                      name="idea_description"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <Label text="Category" required="*" hint="" />
                  <Field
                    as="select"
                    name="category_id"
                    placeholder="Choose Category"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  ${
                      formik.errors.category_id && formik.touched.category_id
                        ? 'border border-red-500'
                        : ''
                    }`}
                    autoComplete="off"
                  >
                    <option value="" label="Please select Category" />
                    {!categoryList.loading &&
                      categoryList.categories.data.map((data) => (
                        <option
                          className="text-gray-900"
                          value={data.category_id}
                          label={data.category_type}
                          key={data.category_id}
                        />
                      ))}
                  </Field>
                  <div className="validate-show">
                    <ErrorMessage name="category_id" component="div" className="text-red-600" />
                  </div>
                  <label className="flex gap-2 pt-2">
                    <Field
                      type="checkbox"
                      name="is_anonymous"
                      checked={formik.values.is_anonymous}
                      onChange={formik.handleChange}
                      className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg   p-2.5"
                    />
                    Do you want to post anonymously?
                  </label>
                  <label className="flex gap-2 pt-2">
                    <Field
                      type="checkbox"
                      name="terms"
                      className={`bg-gray-50 border border-gray-300  sm:text-sm rounded-lg   p-2.5  ${
                        formik.errors.terms && formik.touched.terms ? 'border border-red-500' : ''
                      }`}
                    />
                    I accept the terms and conditions
                  </label>
                  <div className="validate-show">
                    <ErrorMessage name="terms" component="div" className="text-red-600" />
                  </div>
                  <div className="text-center pt-4">
                    <button
                      className="md:w-[25%] w-[100px] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                    >
                      Submit
                    </button>
                    {/* <ErrorServer msg={errorServer} /> */}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateIdea;
