import React from "react";
import ReactBodymovin from "react-bodymovin/lib/ReactBodymovinFull";
import "./BodyMovin.css";

const bodyMovin = props => {
  const bodymovinOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: props.animationData,
    ...props.options
  };
  return (
    <div className="BodyMovin__container" style={{ ...props.style }}>
      <ReactBodymovin options={bodymovinOptions} />
    </div>
  );
};

export default bodyMovin;
