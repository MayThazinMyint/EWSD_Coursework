import React, { memo } from "react";
import PropTypes from "prop-types";

function Submit({ text, disabled }) {
  return (
    <button
      type="submit"
      data-dismiss="modal"
      disabled={disabled}
      className="w-[25%] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
    >
      <p>{text}</p>
    </button>
  );
}

Submit.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Submit.defaultProps = {
  disabled: false,
};

export default memo(Submit);
