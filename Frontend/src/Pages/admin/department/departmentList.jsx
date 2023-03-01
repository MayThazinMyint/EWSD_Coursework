import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from "focus-formik-error";

import {
  fetchDepartments,
  postDepartment,
} from "../../../features/department/departmentSlice";
import Label from "../../../components/Label";

const DepartmentList = () => {
  const [showModal, setShowModal] = useState(false);
  const departmentList = useSelector((state) => state.department);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);
  console.log("departmentList", departmentList.departments);
  if (departmentList.loading) {
    return <p>Loading...</p>;
  }

  if (departmentList.error) {
    return <p>There is an error: {departmentList.error}</p>;
  }
  const initialValues = {
    department_code: "",
    department_description: "",
  };

  // validations
  const validationSchema = Yup.object({
    department_code: Yup.string().required("Department Code is required."),
    department_description: Yup.string().required(
      "Department Name is required."
    ),
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
    dispatch(postDepartment(data));
    resetForm();
    setShowModal(false);
    //dispatch(fetchDepartments());
  };
  return (
    <div className="flex flex-col md:px-[300px] md:py-[50px] px-[50px] mt-[50px]">
      <div className="flex justify-between space-x-2 py-4">
        <p className="font-bold text-lg ">Department List</p>

        <button
          className="w-[8rem] text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex justify-center">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">
                      Add a new Department
                    </h4>
                    <Formik
                      enableReinitialize
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {(formik) => (
                        <Form className="space-y-2 " onKeyDown={onKeyDown}>
                          <ConnectedFocusError />

                          <div className="flex flex-col items-center space-y-4">
                            <div className="flex flex-row items-center justify-between gap-2">
                              <Label
                                text="Department Code"
                                required="*"
                                hint=""
                              />
                              <Field
                                type="text"
                                name="department_code"
                                placeholder="Enter department code"
                                className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                  formik.errors.department_code &&
                                  formik.touched.department_code
                                    ? "border border-red-500"
                                    : ""
                                }`}
                                autoComplete="off"
                              />
                            </div>
                            <div className="validate-show">
                              <ErrorMessage
                                name="department_code"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                            <div className="flex flex-row items-center justify-between gap-2">
                              <Label
                                text="Department Name"
                                required="*"
                                hint=""
                              />
                              <Field
                                type="text"
                                name="department_description"
                                placeholder="Enter department description"
                                className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                  formik.errors.department_description &&
                                  formik.touched.department_description
                                    ? "border border-red-500"
                                    : ""
                                }`}
                                autoComplete="off"
                              />
                            </div>
                            <div className="validate-show">
                              <ErrorMessage
                                name="department_description"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                          <div className="items-center gap-2 mt-3 sm:flex">
                            <button
                              className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="w-full mt-2 p-2.5 flex-1 text-white bg-slate-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                            >
                              Add
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {!departmentList.loading ? (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departmentList.departments.data.map((department) => (
                    <tr
                      className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {department.department_id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {department.department_code}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {department.department_description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DepartmentList;
