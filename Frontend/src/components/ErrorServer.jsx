import React, { memo } from "react";
import PropTypes from "prop-types";

function ErrorServer({ msg }) {
  return <div className="text-center validate-show negative">{msg}</div>;
}

ErrorServer.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default memo(ErrorServer);
