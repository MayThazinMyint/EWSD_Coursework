import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import Sidebar from '../../../components/sidebar/Sidebar';

const IdeaSummary = () => {
  // initial values
  const initialValues = {
    hasComment: '',
    isAnonymous: '',
    category: '',
    department: '',
    academicYear: '',
  };

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
    };
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col pl-[300px] py-[50px] mt-[50px]">
        <div className="flex justify-between space-x-2 py-4">
          <p className="font-bold text-lg ">Idea Summary Report</p>
        </div>
        {/* filter component */}
        <div className="flex justify-between space-x-2 py-4">
          <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => (
              <Form className="space-y-2 " onKeyDown={onKeyDown}>
                <ConnectedFocusError />
                <div className="flex">
                  <label className="flex gap-2 pt-2">
                    <Field
                      type="checkbox"
                      name="hasComment"
                      className={`bg-gray-50 border border-gray-300  sm:text-sm rounded-lg   p-2.5  ${
                        formik.errors.hasComment && formik.touched.hasComment
                          ? 'border border-red-500'
                          : ''
                      }`}
                    />
                    Has Comment
                  </label>
                  <label className="flex gap-2 pt-2">
                    <Field
                      type="checkbox"
                      name="isAnonymous"
                      className={`bg-gray-50 border border-gray-300  sm:text-sm rounded-lg   p-2.5 `}
                    />
                    Anonymous
                  </label>
                </div>
                <div className="text-center pt-4">
                  <button
                    className="w-[25%] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
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
                      Posted Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Idea Description
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Posted By
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Category Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Has Comment(Y/N)
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Is Anonymous (Y/N)
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Academic Year
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      a
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      b
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      c
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      d
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      e
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      f
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      g
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      h
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaSummary;
