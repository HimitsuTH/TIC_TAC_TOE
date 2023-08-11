/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Status = ({ p }) => {
  // status game
  const status = <p>{`Next player : "${p ? "X" : "O"}"`}</p>;

  //   console.log(status)
  return (
    <div className="status text-md font-bold select-none text-white bg-slate-800 p-3 md:p-5 rounded-lg md:text-lg">
      {status}
    </div>
  );
};

export default Status;
