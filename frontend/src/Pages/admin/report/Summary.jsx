import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSummaryList } from '../../../features/report/reportSlice';
import Sidebar from '../../../components/sidebar/Sidebar';
import { fetchCsvData, downloadCsv, downloadZipFile } from '../../../features/report/csvSlice';
import Loading from '../../../components/common/Loading';

const Summary = () => {
  const report = useSelector((state) => state.report);
  const csvData = useSelector((state) => state.csv.data);
  const [summaryList, setSummaryList] = useState(null);
    const dispatch = useDispatch();
    // check final closure data

useEffect(() => {
  dispatch(fetchSummaryList()).then((res) => {
    console.log('res',res.payload)
    setSummaryList(res.payload.data[0]);
    console.log('summaryList', summaryList);
  });
  dispatch(fetchCsvData());
}, [dispatch]);
  const handleDownloadClick = () => {
    if (csvData) {
      dispatch(downloadCsv('http://127.0.0.1:8000/api/exportCSV/3'));
    } 
  };
  const handleZipDownloadClick = () => {
    dispatch(downloadZipFile('http://127.0.0.1:8000/api/summary/3'));
  }

  if (report.loading || report.summaryList === null) {
    return <Loading />
  }
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col pl-[300px] py-[50px]">
        <div className="flex justify-between pr-4 space-x-2 py-4">
          <p className="font-bold text-lg ">Summary</p>
        </div>

        {!report.loading && report.summaryList.data.length > 0 ? (
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
                        Academic Year
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Uploaded Attachments
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Idea Posts
                      </th>
                    </tr>
                  </thead>
                  {report.summaryList.data.map((report) => (
                    <tbody>
                      <tr
                        className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.academic_year_code}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={handleZipDownloadClick}>download zip file</button>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={handleDownloadClick}>download csv data</button>
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
}

export default Summary