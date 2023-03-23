import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import { RiDeleteBinLine } from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchAcademicYear, postAcademicYear, deleteAcademicYear } from '../../../features/academic/academicSlice';
import Label from '../../../components/Label';
import Sidebar from '../../../components/sidebar/Sidebar';
import Loading from '../../../components/common/Loading';

const CategoryList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [academicId, setacademicId] = useState();
  const academicYearList = useSelector((state) => state.academic);
  const handleCancel = () => {
    setShowWarning(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAcademicYear());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setacademicId(id);
    setShowWarning(true);
    console.log('academic id', id);
  };

  if (academicYearList.loading) {
    return <Loading />;
  }

  if (academicYearList.error) {
    return <p>There is an error: {academicYearList.error}</p>;
  }

  const initialValues = {
    academic_year_code: '',
    academic_year: '',
    academic_sdate: null,
    academic_edate: null,
    final_closure_date: null,
  };

  const chageDateFormat = (dateInput) => {
    // Create a new date object from the string
    const date = new Date(dateInput);

    // Get the year, month, day, hours, minutes, and seconds from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDate); // Output: "2023-03-22 00:00:00"
    return formattedDate;
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    const data = {
      academic_year_code: values.academic_year_code,
      academic_year: values.academic_year,
      academic_sdate: chageDateFormat(values.academic_sdate),
      academic_edate: chageDateFormat(values.academic_edate),
      final_closure_date: chageDateFormat(values.final_closure_date),
    };
    console.log('format: ', data);
   //dispatch(postAcademicYear(data));
    dispatch(postAcademicYear(data)).then((res) => {
      console.log('post academic year', res);
      dispatch(fetchAcademicYear())
    });
    resetForm();
    setShowModal(false);
  };

  // validations
  const validationSchema = Yup.object({
    academic_year_code: Yup.string().required('Academic Year Code is required.'),
    academic_year: Yup.string().required('Academic Year is required.'),
    academic_sdate: Yup.string().required('Academic Year start date is required.'),
    academic_edate: Yup.string().required('Academic Year end date is required.'),
    final_closure_date: Yup.string().required('Final closure date is required.'),
  });
  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  
  const handleDeleteConfirmClick = () => {
    dispatch(deleteAcademicYear(academicId));
    setacademicId(null);
    setShowWarning(false);
    console.log('academic id', academicId);
    dispatch(fetchAcademicYear());
  };
  return (
    <div>
      <Sidebar />
      <div className="fflex flex-col pl-[400px] pr-[250px] py-[50px] mt-[50px]">
        <div className="flex justify-between space-x-2 py-4">
          <p className="font-bold text-lg ">Academic Year</p>

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
                <div className="relative w-full max-w-[500px] p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="mt-3 flex justify-center">
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h4 className="text-lg font-medium text-gray-800 mb-4">
                        Add a new Academic Year
                      </h4>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                      >
                        {({ values, handleChange, setFieldValue, errors, touched }) => (
                          <Form className="space-y-2 " onKeyDown={onKeyDown}>
                            <ConnectedFocusError />

                            <div className="flex flex-col gap-4">
                              <div className="flex flex-row items-center justify-between">
                                <Label text="Academic Year Code" required="*" hint="" />
                                <Field
                                  type="text"
                                  name="academic_year_code"
                                  placeholder="AY2022-23"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    errors.academic_year_code && touched.academic_year_code
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                  autoComplete="off"
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="academic_year_code"
                                  component="div"
                                  className="text-red-600"
                                />
                              </div>
                              <div className="flex flex-row items-center justify-between">
                                <Label text="Academic Year" required="*" hint="" />
                                <Field
                                  type="text"
                                  name="academic_year"
                                  placeholder="Jun22-Apr23"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    errors.academic_year && touched.academic_year
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                  autoComplete="off"
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="academic_year"
                                  component="div"
                                  className="text-red-600"
                                />
                              </div>
                              <div className="columns-2">
                                <Label text="Academic Year Start Date" required="*" hint="" />
                                <DatePicker
                                  id="academic_sdate"
                                  name="academic_sdate"
                                  selected={values.academic_sdate}
                                  onChange={(date) => setFieldValue('academic_sdate', date)}
                                  dateFormat="dd-MM-yyyy"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    errors.academic_sdate && touched.academic_sdate
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="academic_sdate"
                                  component="div"
                                  className="text-red-600"
                                />
                              </div>
                              <div className="columns-2">
                                <Label text="Academic Year End Date" required="*" hint="" />
                                {/* <Field name="date">
                                  {() => (
                                    <DatePicker
                                      selected={values.datePicker}
                                      onChange={(date) => setFieldValue('academic_edate', date)}
                                      dateFormat="dd/MM/yyyy"
                                      className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                        errors.academic_edate && touched.academic_edate
                                          ? 'border border-red-500'
                                          : ''
                                      }`}
                                    />
                                  )}
                                </Field> */}
                                <DatePicker
                                  id="academic_edate"
                                  name="academic_edate"
                                  selected={values.academic_edate}
                                  onChange={(date) => setFieldValue('academic_edate', date)}
                                  dateFormat="dd-MM-yyyy"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    errors.academic_sdate && touched.academic_sdate
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="academic_edate"
                                  component="div"
                                  className="text-red-600"
                                />
                              </div>
                              <div className="columns-2">
                                <Label text="Final Closure Date" required="*" hint="" />

                                <DatePicker
                                  id="final_closure_date"
                                  name="final_closure_date"
                                  selected={values.final_closure_date}
                                  onChange={(date) => setFieldValue('final_closure_date', date)}
                                  dateFormat="dd/MM/yyyy"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    errors.academic_sdate && touched.academic_sdate
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="final_closure_date"
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

        {!academicYearList.loading && academicYearList.academicYear.data.length > 0 && (
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
                        Academic Year Code
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Academic Year
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Academic Year Start Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Academic Year End Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Academic Year Final Closure Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {academicYearList.academicYear.data.map((academic) => (
                      <tr
                        className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {academic.academic_year_code}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {academic.academic_year}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {academic.academic_sdate.substring(0, 10)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {academic.academic_edate.substring(0, 10)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {academic.final_closure_date.substring(0, 10)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleDeleteClick(academic.academic_id)}>
                            <RiDeleteBinLine
                              size={20}
                              id="2"

                              // className="text-red-500 fill-current w-6 h-6"
                            />
                          </button>
                          {/* <button
                          onClick={() => setShowWarning(true)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Open Modal
                        </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {showWarning ? (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Delete Warning
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        Are you sure you want to delete?.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-[10px]">
                  <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                    <button
                      type="button"
                      onClick={handleDeleteConfirmClick}
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Delete
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryList;
