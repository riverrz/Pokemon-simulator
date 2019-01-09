import React from "react";

const attackControl = props => {
  let content = <p>LOADING...</p>;
  if (props.moves.length) {
    content = props.moves.map((move, i) => {
      return <button key={i}>{move.name}</button>;
    });
  }
  return <div className="actions">{content}</div>;
};

export default attackControl;
