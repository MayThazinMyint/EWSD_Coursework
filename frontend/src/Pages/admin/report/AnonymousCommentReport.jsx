import React,{useEffect,useState} from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnonymousComment, fetchIdeaReport } from '../../../features/report/reportSlice';
import { fetchCsvData, downloadCsv } from '../../../features/report/csvSlice';
import Loading from '../../../components/common/Loading';

const AnonymousCommentReport = () => {
  const report = useSelector((state) => state.report);
  const csvData = useSelector((state) => state.csv.data);
  const [anonymousComments, setAnonymousComments] = useState(null)
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
    dispatch(fetchCsvData('http://127.0.0.1:8000/api/download/comment_anonymous'));
    dispatch(fetchAnonymousComment(data)).then((res) => {
      setAnonymousComments(res.payload.data)
    })
  }, [dispatch]);
  const handleDownloadClick = () => {
    if (csvData) {
      dispatch(downloadCsv());
    }
  };

  console.log('idea report', report.ideaReport);

  if (report.loading || anonymousComments === null) {
    return <Loading />;
  }

  if (report.error) {
    return <p>There is an error: {report.error}</p>;
  }
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col pl-[300px] py-[50px] mt-[50px]">
        <div className="flex justify-between space-x-2 py-4 mr-4">
          <p className="font-bold text-lg ">Anonymous Comment Report</p>
          <button
            className="w-[150px] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center"
            onClick={handleDownloadClick}
          >
            {csvData ? 'Download CSV' : 'Fetch CSV'}
          </button>
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
                      Comment Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Comment Description
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
                      User Name
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
                      Category
                    </th>
                  </tr>
                </thead>
                {!report.loading &&
                  anonymousComments.map((data) => (
                    <tbody>
                      <tr
                        className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.comment_date}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.comment_description}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.idea_description.slice(0, 15)} ...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.user_name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.department}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.category_type}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousCommentReport;
