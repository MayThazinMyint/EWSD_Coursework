import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../../../components/sidebar/Sidebar';
import { fetchIdeaReport } from '../../../features/report/reportSlice';
import { fetchCsvData, downloadCsv } from '../../../features/report/csvSlice';

const IdeaReport = () => {
  const report = useSelector((state) => state.report);
  const csvData = useSelector((state) => state.csv.data);

  const dispatch = useDispatch();
  const data = {
    has_comment: 0,
    is_anonymous: 0,
    category_id: 1,
    department_id: 1,
    academic_year: null,
    show_all: 1,
  };
  useEffect(() => {
    dispatch(fetchCsvData());
    dispatch(fetchIdeaReport(data));
  }, [dispatch]);
  const handleDownloadClick = () => {
    if (csvData) {
      dispatch(downloadCsv());
    }
  };

   console.log('idea report', report.ideaReport);
  // initial values

  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  if (report.loading || report.ideaReport === undefined) {
    return <p>Loading...</p>;
  }

  if (report.error) {
    return <p>There is an error: {report.error}</p>;
  }
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col pl-[300px] py-[50px]">
        <div className="flex justify-between pr-4 space-x-2 py-4">
          <p className="font-bold text-lg ">Idea Summary Report 111</p>
          <button
            className="w-[150px] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center"
            onClick={handleDownloadClick}
          >
            {csvData ? 'Download CSV' : 'Fetch CSV'}
          </button>
        </div>

        {!report.loading && report.ideaReport.data.length > 0 ? (
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
                  {report.ideaReport.data.map((report) => (
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
                          {report.idea_description}
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

export default IdeaReport;
