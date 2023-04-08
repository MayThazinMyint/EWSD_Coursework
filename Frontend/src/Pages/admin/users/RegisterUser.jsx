import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../components/sidebar/Sidebar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import { addUser } from '../../../features/user/userSlice';
import ErrorServer from '../../../components/ErrorServer';
import Label from '../../../components/Label';
import role from '../../../constant/role';
import { fetchDepartments } from '../../../features/department/departmentSlice';

const RegisterUser = () => {
  const [errorServer, setErrorServer] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.department);
  console.log('role', role);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  
  // initial values
  const initialValues = {
    user_name: '',
    user_phone: '',
    email: '',
    password: '',
    user_dob: '',
    user_code: '',
    address: '',
    department_id: '',
    user_role_id: '',
  };
  // validations
  const validationSchema = Yup.object({
    user_name: Yup.string().required('User name is required.'),
    user_phone: Yup.number().required('Phone number is required.'),
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required.'),
    department_id: Yup.string().required('Department is required.'),
    user_role_id: Yup.string().required('Role is required.'),
    user_code: Yup.string().required('User code is required.'),
    address: Yup.string().required('Address is required.'),
  });
  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  //submit data
  const onSubmit = async (data, { resetForm }) => {
    console.log('register data', data);
    resetForm();
    dispatch(addUser(data)).then((res) => {
      
      if (res.payload) {
        navigate('/admin/user-list');
      } else {
        console.log('show error');
        setErrorServer('This email is already used.');
      }
    });

  };
  return (
    <div className="flex">
      <Sidebar />

      <div className="dark:bg-gray-900 flex flex-col items-center justify-center md:pl-[500px] md:py-[50px] px-[50px] mt-[50px] h-[80vh]">
        <div
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://cdn-icons-png.flaticon.com/512/3631/3631618.png"
            alt="logo"
          />
          Register User
        </div>
        {!departmentList.loading && (
          <div className="w-full bg-white rounded-lg shadow-lg md:max-w-[500px] max-w-[300px] ">
            <div className=" space-y-4 sm:p-8 ">
              <h1 className="text-xl text-center md:py-2 py-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Fill the user basic info.
              </h1>

              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form className="space-y-2 " onKeyDown={onKeyDown}>
                    <ConnectedFocusError />

                    <div className="flex md:flex-row flex-col items-center md:space-x-6">
                      <div>
                        <Label text="User Name" required="*" hint="" />
                        <Field
                          type="text"
                          name="user_name"
                          placeholder="Enter user name"
                          className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                            formik.errors.user_name && formik.touched.user_name
                              ? 'border border-red-500'
                              : ''
                          }`}
                          autoComplete="off"
                        />
                        <div className="validate-show">
                          <ErrorMessage
                            name="user_name"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      </div>
                      <div>
                        <Label text="Email" required="*" hint="" />
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          className={`  w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block  p-2.5   ${
                            formik.errors.email && formik.touched.email
                              ? 'border border-red-500 '
                              : ''
                          }`}
                          autoComplete="off"
                        />
                        <div className="validate-show">
                          <ErrorMessage name="email" component="div" className="text-red-600" />
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col items-center md:space-x-6">
                      <div>
                        <Label text="Password" required="*" hint="" />
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[200px]  block p-2.5   ${
                            formik.errors.password && formik.touched.password
                              ? 'border border-red-500 '
                              : ''
                          }`}
                          autoComplete="off"
                        />
                        <div className="validate-show">
                          <ErrorMessage name="password" component="div" className="text-red-600" />
                        </div>
                      </div>
                      <div>
                        <Label text="Phone Number" required="*" hint="" />
                        <Field
                          type="number"
                          name="user_phone"
                          placeholder="Enter phone number"
                          className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[200px]  block p-2.5   ${
                            formik.errors.user_phone && formik.touched.user_phone
                              ? 'border border-red-500 '
                              : ''
                          }`}
                          autoComplete="off"
                        />
                        <div className="validate-show">
                          <ErrorMessage
                            name="user_phone"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col items-center md:space-x-6">
                      <div>
                        <Label text="User Code" required="*" hint="" />
                        <Field
                          type="text"
                          name="user_code"
                          placeholder="Enter user code"
                          className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[200px]  block p-2.5   ${
                            formik.errors.user_code && formik.touched.user_code
                              ? 'border border-red-500 '
                              : ''
                          }`}
                          autoComplete="off"
                        />
                        <div className="validate-show">
                          <ErrorMessage
                            name="user_code"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      </div>
                      <div>
                        <Label text="Address" required="*" hint="" />
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter address"
                          className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[200px]  block p-2.5   ${
                            formik.errors.address && formik.touched.address
                              ? 'border border-red-500 '
                              : ''
                          }`}
                          autoComplete="off"
                        />
                        <div className="validate-show">
                          <ErrorMessage name="address" component="div" className="text-red-600" />
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col items-center md:space-x-6">
                      <div>
                        <Label text="Role" required="*" hint="" />
                        <Field
                          as="select"
                          name="user_role_id"
                          placeholder="Choose Role"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[200px] p-2.5  ${
                            formik.errors.user_role_id && formik.touched.user_role_id
                              ? 'border border-red-500'
                              : ''
                          }`}
                          autoComplete="off"
                        >
                          <option value="" label="Please select role" />
                          {role.map((data) => (
                            //console.log(data.id)
                            <option
                              className="text-gray-900"
                              value={data.id}
                              label={data.roleName}
                              key={data.id}
                            />
                          ))}
                        </Field>
                        <div className="validate-show">
                          <ErrorMessage
                            name="user_role_id"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      </div>
                      <div>
                        <Label text="Department" required="*" hint="" />
                        <Field
                          as="select"
                          name="department_id"
                          placeholder="Choose Department"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-[200px]  block  p-2.5  ${
                            formik.errors.department_id && formik.touched.department_id
                              ? 'border border-red-500'
                              : ''
                          }`}
                          autoComplete="off"
                        >
                          <option value="" label="Select department" />
                          {departmentList.departments.data &&
                            departmentList.departments.data.map((data) => (
                              <option
                                className="text-gray-900"
                                value={data.department_id}
                                label={data.department_description}
                                key={data.department_id}
                              />
                            ))}
                        </Field>
                        <div className="validate-show">
                          <ErrorMessage
                            name="department_id"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <button
                        className="w-[25%] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                      >
                        Submit
                      </button>
                      <ErrorServer msg={errorServer} />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterUser;
