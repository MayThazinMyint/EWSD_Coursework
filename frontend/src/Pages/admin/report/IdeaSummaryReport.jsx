import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import Sidebar from '../../../components/sidebar/Sidebar';
import { fetchReport } from '../../../features/report/reportSlice';
import { fetchCategories } from '../../../features/category/categorySlice';
import { fetchDepartments } from '../../../features/department/departmentSlice';
import { fetchAcademicYear } from '../../../features/academic/academicSlice';
import { fetchCsvData, downloadCsv } from '../../../features/report/csvSlice';
import Loading from '../../../components/common/Loading';

const IdeaSummaryReport = () => {
  const report = useSelector((state) => state.report);
  const categoryList = useSelector((state) => state.category);
  const departmentList = useSelector((state) => state.department);
  const academicYearList = useSelector((state) => state.academic);
  const csvData = useSelector((state) => state.csv.data);
  const [reportList,setReportList] = useState(null)
  const handleDownloadClick = () => {
    if (csvData) {
      dispatch(
        downloadCsv(
          'http://127.0.0.1:8000/api/download/idea?has_comment=1&is_anonymous=1&category_id=1&department_id=1&academic_year=1&show_all=1',
        ),
      );
    } else {
      dispatch(fetchCsvData());
    }
  };

  const handleFilterClick = async (data) => {
    //const { resetForm } = _ref;
    console.log('register data', data);
    //resetForm();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAcademicYear());
    dispatch(fetchCsvData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchReport()).then((res) => {
      setReportList(res.payload.data)
    })
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  // console.log('academicYearList', academicYearList);
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

  if (report.loading || reportList === null) {
    return <Loading />
  }

  if (report.error) {
    return <p>There is an error: {report.error}</p>;
  }
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col pl-[300px] py-[50px] pr-[50px]">
        <div className="flex justify-between space-x-2 py-4">
          <p className="font-bold text-lg ">All Reports with filter</p>
        </div>
        {/* <button onClick={handleDownloadClick}>{csvData ? 'Download CSV' : 'Fetch CSV'}</button> */}
        {/* filter component */}
        {!categoryList.loading && !departmentList.loading && !academicYearList.loading && (
          <div className="flex justify-between space-x-2 py-4">
            <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => (
                <Form className="flex space-x-2 " onKeyDown={onKeyDown}>
                  <ConnectedFocusError />
                  <div className="flex space-x-2">
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
                    <Field
                      as="select"
                      name="category"
                      placeholder="Choose Category"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[8rem] p-2.5}`}
                      autoComplete="off"
                    >
                      <option value="" label="Category" />
                      {categoryList.categories.data.map((data) => (
                        //console.log(data.id)
                        <option
                          className="text-gray-900"
                          value={data.category_id}
                          label={data.category_type}
                          key={data.category_code}
                        />
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="user_role_id"
                      placeholder="Choose Department"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[9rem] p-2.5}`}
                      autoComplete="off"
                    >
                      <option value="" label="Department" />
                      {departmentList.departments.data.map((data) => (
                        //console.log(data.id)
                        <option
                          className="text-gray-900"
                          value={data.department_id}
                          label={data.department_description}
                          key={data.department_code}
                        />
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="academic_id"
                      placeholder="Choose Academic Year"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-[10rem] p-2.5}`}
                      autoComplete="off"
                    >
                      <option value="" label="Academic Year" />
                      {academicYearList.academicYear.data.map((data) => (
                        //console.log(data.id)
                        <option
                          className="text-gray-900"
                          value={data.academic_id}
                          label={data.academic_year}
                          key={data.academic_year_code}
                        />
                      ))}
                    </Field>
                  </div>
                  <div className="text-center">
                    <button
                      
                      className="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      
                    >
                      Filter
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleDownloadClick}
                      className="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                    >
                      {csvData ? 'Download CSV' : 'Fetch CSV'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
        {!report.loading && reportList.length > 0 ? (
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
                      {/* <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Academic Year
                      </th> */}
                    </tr>
                  </thead>
                  {reportList.map((report) => (
                    <tbody>
                      <tr
                        className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.idea_posted_date}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {report.idea_description.slice(0, 20)}...
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {report.posted_by}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.category_type}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {report.has_comments}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {report.is_anonymous ? 'YES' : 'NO'}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {report.department_description}
                        </td>
                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {report.academic_year}
                        </td> */}
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default IdeaSummaryReport;
