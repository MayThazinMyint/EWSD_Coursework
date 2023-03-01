import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerInput() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="mb-1 font-medium text-gray-700">
        Date
      </label>
      <DatePicker
        id="date"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MM/dd/yyyy"
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default DatePickerInput;
