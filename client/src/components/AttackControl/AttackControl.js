import React from "react";
import "./AttackControl.css";

const attackControl = props => {
  let content = <p>LOADING...</p>;
  if (props.moves.length) {
    content = props.moves.map((move, i) => {
      // Disable all moves when one clicked, until response
      return (
        <button
          key={i}
          onClick={() => props.canAttack ? props.handleAttack(move.name):null}
          disabled={!props.canAttack}
          className="attackControl__btn"
        >
          {move.name}
        </button>
      );
    });
  }
  return <div className="actions">{content}</div>;
};

export default attackControl;
