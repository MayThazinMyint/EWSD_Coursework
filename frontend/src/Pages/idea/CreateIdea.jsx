import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from "focus-formik-error";

import Label from "../../components/Label";
import department from "../../constant/department";
import role from "../../constant/role";
const CreateIdea = () => {
  const [errorServer, setErrorServer] = useState("");
  const navigate = useNavigate();
  // initial values
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    department: "",
    role: "",
  };
  // validations
  const validationSchema = Yup.object({
    userName: Yup.string().required("User name is required."),
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required."),
    department: Yup.string().required("Department is required."),
    role: Yup.string().required("Role is required."),
  });
  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  //submit data
  const onSubmit = async (data, { resetForm }) => {
    console.log("data", data);
    resetForm();
    navigate("/admin/user-list");
  };
  return (
    <section className="mt-[50px] bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://cdn-icons-png.flaticon.com/512/3631/3631618.png"
            alt="logo"
          />
          Register User
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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

                  <Label text="User Name" required="*" hint="" />
                  <Field
                    type="text"
                    name="userName"
                    placeholder="Enter user name"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  ${
                      formik.errors.userName && formik.touched.userName
                        ? "border border-red-500"
                        : ""
                    }`}
                    autoComplete="off"
                  />
                  <div className="validate-show">
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <Label text="Email" required="*" hint="" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5   ${
                      formik.errors.email && formik.touched.email
                        ? "border border-red-500 "
                        : ""
                    }`}
                    autoComplete="off"
                  />
                  <div className="validate-show">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <Label text="Password" required="*" hint="" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5   ${
                      formik.errors.password && formik.touched.password
                        ? "border border-red-500 "
                        : ""
                    }`}
                    autoComplete="off"
                  />
                  <div className="validate-show">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <Label text="Department" required="*" hint="" />
                  <Field
                    as="select"
                    name="department"
                    placeholder="Choose Department"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  ${
                      formik.errors.department && formik.touched.department
                        ? "border border-red-500"
                        : ""
                    }`}
                    autoComplete="off"
                  >
                    <option value="" label="Please select department" />
                    {department.map((data) => (
                      <option
                        className="text-gray-900"
                        value={data}
                        label={data}
                        key={data}
                      />
                    ))}
                  </Field>
                  <div className="validate-show">
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <Label text="Role" required="*" hint="" />
                  <Field
                    as="select"
                    name="role"
                    placeholder="Choose Role"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  ${
                      formik.errors.role && formik.touched.role
                        ? "border border-red-500"
                        : ""
                    }`}
                    autoComplete="off"
                  >
                    <option value="" label="Please select role" />
                    {role.map((data) => (
                      <option
                        className="text-gray-900"
                        value={data}
                        label={data}
                        key={data}
                      />
                    ))}
                  </Field>
                  <div className="validate-show">
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="text-center pt-4">
                    <button
                      className="w-[25%] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

    // <section class="bg-gray-50 dark:bg-gray-900">
    //   <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <a
    //       href="#"
    //       class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    //     >
    //       <img
    //         class="w-8 h-8 mr-2"
    //         src="https://cdn-icons-png.flaticon.com/512/3631/3631618.png"
    //         alt="logo"
    //       />
    //       Register User
    //     </a>
    //     <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //           Fill the below information to create user account
    //         </h1>
    //         <form class="space-y-4 md:space-y-6" action="#">
    //           <div>
    //             <label
    //               for="email"
    //               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Enter email
    //             </label>
    //             <input
    //               type="email"
    //               name="email"
    //               id="email"
    //               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="name@company.com"
    //               required=""
    //             />
    //           </div>
    //           <div>
    //             <label
    //               for="password"
    //               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Enter Password
    //             </label>
    //             <input
    //               type="password"
    //               name="password"
    //               id="password"
    //               placeholder="••••••••"
    //               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required=""
    //             />
    //           </div>
    //           <div>
    //             <label
    //               for="password"
    //               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Choose Department
    //             </label>
    //             <input
    //               type="text"
    //               name="department"
    //               id="password"
    //               placeholder="••••••••"
    //               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required=""
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             class="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //           >
    //             Sign in
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default CreateIdea;
