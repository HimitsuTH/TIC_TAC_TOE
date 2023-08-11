/* eslint-disable no-unused-vars */
// import React from "react";

export default function SelectedPlayer({ handlePlayerFirst }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-800 text-lg leading-relaxed font-medium md:text-xl select-none">
                Select Player
              </p>
              <div className=" text-white flex justify-center items-center gap-2">
                <button
                  value={"X"}
                  onClick={(e) => handlePlayerFirst(e)}
                  className=" w-12 bg-red-700 rounded-2xl hover:bg-red-800"
                >
                  X
                </button>
                <button
                  value={"O"}
                  onClick={(e) => handlePlayerFirst(e)}
                  className=" w-12 bg-green-700 rounded-2xl hover:bg-green-800"
                >
                  O
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
