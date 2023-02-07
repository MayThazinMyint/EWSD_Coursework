import React, { memo } from "react";
import PropTypes from "prop-types";

function Submit({ styleBtn, text, disabled }) {
  return (
    <button
      type="submit"
      data-dismiss="modal"
      disabled={disabled}
      className={`p2-bold-16 ${disabled ? "primary-btn-disabled" : styleBtn}`}
    >
      <p>{text}</p>
    </button>
  );
}

Submit.propTypes = {
  text: PropTypes.string.isRequired,
  styleBtn: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Submit.defaultProps = {
  disabled: false,
};

export default memo(Submit);
