import React from "react";

const DepartmentList = () => {
  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div className="flex flex-col md:px-[300px] md:py-[50px] px-[50px]">
      <p className="font-bold text-lg ">Department List</p>
      <div className="flex space-x-2 py-4">
        <input
          value="department"
          type="text"
          placeholder="Enter Department"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-[20rem] p-2.5"
        />
        <button
          type="submit"
          onSubmit={onSubmit}
          className="w-[4rem] text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-3 py-2.5 text-center"
        >
          Add
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
                    ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Department
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    1
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    IT
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    2
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Business
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
