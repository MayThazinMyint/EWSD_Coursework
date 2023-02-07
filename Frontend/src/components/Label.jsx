import React, { memo } from "react";
import PropTypes from "prop-types";

function Label(props) {
  const { text, hint, required } = props;
  return (
    <label htmlFor={text}>
      <p className={"mb-2 p2-bold-16 "}>
        {text} <span className="negative">{required}</span>
      </p>
      {hint && (
        <p className="mb-2 mt-[-0.5rem] p4-regular-12 description">{hint}</p>
      )}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
  hint: PropTypes.string,
  required: PropTypes.string,
};

Label.defaultProps = {
  hint: null,
  required: "",
};

export default memo(Label);
