import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import { login } from '../features/auth/authSlice';
import Label from '../components/Label';
import ErrorServer from '../components/ErrorServer';
const Login = () => {
  const [errorServer, setErrorServer] = useState('');
  const auth = useSelector((state) => state.auth);
  //console.log('auth', auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // initial values
  const initialValues = {
    email: '',
    password: '',
  };
  // validations
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required.'),
  });
  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  //submit data
  const onSubmit = async (data, { resetForm }) => {
    //console.log('login data', data);
    resetForm();
    //dispatch(login(data));
    //navigate("/admin/user-list");
    dispatch(login(data)).then((res) => {
       setErrorServer('');
      if (res.payload) {
        console.log('res login', res);
        Cookies.set('isAuthenticated', 'true');
        Cookies.set('userRole', res.payload.data.user.user_role_id);
        Cookies.set('userId', res.payload.data.user.id);
        Cookies.set('token', res.payload.data.token);
        Cookies.set('departmentId', res.payload.data.user.department_id);
        
        const role = res.payload.data.user.user_role_id;
        console.log('role', res.payload.data.user.user_role_id); 
        
        if (role === 4 || role === '4'){
          console.log('navigate to home');
          navigate('/home');
        } else {
          
          console.log('navigate to dashboard');
          navigate('/admin/dashboard');
        }
      } else {
        //console.log('show error');
        setErrorServer('Email or Passowrd is incorrect');
      }
    });
  };
  return (
    <section className="h-[85vh] pt-[50px] ">
      <div className="flex flex-col items-center justify-center h-auto md:mx-auto  pt-16  ">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://cdn-icons-png.flaticon.com/512/3631/3631618.png"
            alt="logo"
          />
          Login User
        </div>
        <div className="flex items-center justify-center w-full bg-white rounded-lg shadow-lg md:max-w-[500px] max-w-[300px] ">
          <div className=" space-y-4 p-2 ">
            <h1 className="text-xl text-center md:py-2 py-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Fill email and password
            </h1>
            <Formik
              
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="space-y-2 " onKeyDown={onKeyDown}>
                  <ConnectedFocusError />

                  <div className="flex flex-col items-center space-y-4">
                    <div>
                      <Label text="Email" required="*" hint="" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                       
                        className={`  w-[250px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block  p-2.5   ${
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
                    <div>
                      <Label text="Password" required="*" hint="" />
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                       
                        className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[250px] block p-2.5   ${
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
                    <div className="text-center pt-4">
                      <button
                        className="w-[100px] mb-4 text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                      >
                        Login
                      </button>
                      
                      <ErrorServer msg={errorServer} />
                    </div>
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

export default Login;
