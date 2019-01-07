import React from "react";

const landing = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={props.handleUsername}
        required
      />
      <input
        type="text"
        placeholder="Room Name"
        onChange={props.handleRoom}
        required
      />
      <button>Submit</button>
    </form>
  );
};

export default landing;
