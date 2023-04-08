import React, { memo } from "react";
import PropTypes from "prop-types";

function ErrorServer({ msg }) {
  return <div className="text-center text-red-600 font-900 validate-show negative">{msg}</div>;
}

ErrorServer.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default memo(ErrorServer);
