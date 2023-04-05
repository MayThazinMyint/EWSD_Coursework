import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser, updateUser } from '../../../features/user/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import { AiOutlineEdit } from 'react-icons/ai';
import ProfilePicture from '../../../components/idea/ProfilePicture';
import Sidebar from '../../../components/sidebar/Sidebar';
import Label from '../../../components/Label';
import role from '../../../constant/role';
import { fetchDepartments } from '../../../features/department/departmentSlice';
const User = () => {
  const user = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  console.log('single user fetch', user.user.data);
  const userId = useParams().id;
  console.log('userid', userId);
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.department);
  const formRef = useRef(null);
  const navigate = useNavigate()
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log('id', { id });
  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    user_name: '' || user.user.data?.user_name,
    user_phone: '' || user.user.data?.user_phone,
    email: '' || user.user.data?.email,
    user_code: '' || user.user.data?.user_code,
    address: '' || user.user.data?.address,
    department_id: '' || user.user.data?.department_id,
    user_role_id: '' || user.user.data?.user_role_id,
    user_dob: '15-02-1998 00:00:00',
    isActive: 1,
    password: 'password',
  };

  // validations
  const validationSchema = Yup.object({
    user_name: Yup.string().required('User name is required.'),
    user_phone: Yup.number().required('Phone number is required.'),
    email: Yup.string().required('Email is required.'),
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

  const handleEditClick = () => {
    setIsEditing(true);
    console.log('open');
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('close');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    console.log('close');
  };

  const handleSubmit = (values) => {
    // do something with form values, such as make an API call to update the user
    console.log('update', values);
    const dataObj = {
      data: values,
      id: userId,
    };
    dispatch(updateUser(dataObj));
    dispatch(fetchSingleUser(userId)).then((res) => {
      setShowAlert(true);
    })
    
  };

  if(showAlert){
    setTimeout(function () {
      setShowAlert(false);
      console.log('false');
      navigate('/admin/user-list');
    }, 3000); 
    
  }

  //submit updated data
  const onSubmit = async (data) => {
    console.log('update data', data);
    //dispatch(updateUser(data));
  };

  if (user.loading) {
    return <p>Loading...</p>;
  }

  if (user.error) {
    return <p>There is an error: {user.error}</p>;
  }
  return (
    <>
      <Sidebar />
      {!user.loading && (
        <>
          <div className="flex flex-col md:pl-[320px] md:pt-[50px] px-[50px] mt-[50px] h-[80vh]">
            {showAlert && (
              <div
                class="flex items-center justify-center ml-[300px] mb-4 max-w-md bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <div class="flex ">
                  <div class="py-1">
                    <svg
                      class="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold">User has updated successfully</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center justify-center shadow-md px-8  md:mx-auto md:h-screen ">
              {/* <button onClick={handleEditClick}>Edit</button> */}

              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                formRef={formRef}
              >
                {(formik) => (
                  <Form className="space-y-2 " onKeyDown={onKeyDown}>
                    <ConnectedFocusError />

                    <div className="flex md:flex-row flex-col items-center md:space-x-6">
                      <div>
                        <Label text="User Name" required="*" hint="" />
                        <Field
                          formik={formik}
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
                          formik={formik}
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
                        <Label text="User Code" required="*" hint="" />
                        <Field
                          formik={formik}
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
                          formik={formik}
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
                          formik={formik}
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
                              //key={data.id}
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
                          formik={formik}
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
                          {departmentList.departments?.data &&
                            departmentList.departments?.data.map((data) => (
                              <option
                                className="text-gray-900"
                                value={data.department_id}
                                label={data.department_description}
                                //key={data}
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
                    <div className="flex md:flex-row flex-col items-center md:space-x-6">
                      <div>
                        <Label text="Phone Number" required="*" hint="" />
                        <Field
                          formik={formik}
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
                    <div className="flex justify-end gap-8 pt-4">
                      {/* <button
                      type="button"
                      className="w-[25%] text-slate-600 bg-gray-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleCancelClick()}
                    >
                      Cancel
                    </button> */}
                      <button
                        className="w-[25%] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                      >
                        Update
                      </button>
                      {/* <ErrorServer msg={errorServer} /> */}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default User;
