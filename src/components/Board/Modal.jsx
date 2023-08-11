/* eslint-disable no-unused-vars */
// import React from "react";

export default function Modal({
  closeModal,
  winner,
  history,
  lineWin,
  linesIndex,
}) {
  // console.log(winCondition)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed right-8 lg:right-14 z-50 outline-none focus:outline-none">
        <div className="relative w-full  my-6 mx-auto max-w-screen flex justify-around">
          {/*content*/}

          <div>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-2 md:p-6 flex-auto">
                <p className="my-4 text-slate-800 text-lg leading-relaxed font-bold md:text-xl select-none">
                  {winner === "Draw" ? `${winner}` : `Winner ${winner}`}
                </p>
                <div className=" text-center">
                  <ul className=" flex flex-col overflow-y-scroll h-32 w-52 md:w-72 scroll  gap-y-2 md:h-48">
                    {history.map((h, i) => (
                      <ol
                        key={i}
                        className={`flex gap-3  text-white items-center text-xs md:text-base border mx-2 p-2 ${
                          linesIndex[0] == h?.move - 1 ||
                          linesIndex[1] == h?.move - 1 ||
                          linesIndex[2] == h?.move - 1
                            ? "bg-slate-800"
                            : "bg-slate-600"
                        }`}
                      >
                        <p>Turn: {i + 1}</p>
                        <div className="flex gap-x-2">
                          <p>Player: {h?.player}</p>
                          <p>move: {h?.move}</p>
                        </div>
                      </ol>
                    ))}
                  </ul>
                  <p className=" mt-2 text-xs md:text-base">
                    {lineWin ? `Lines win = ${lineWin}` : ""}
                  </p>
                </div>
              </div>

              {/*footer*/}
              <div className="flex items-center justify-center p-2  border-t border-solid border-slate-200 rounded-b md:p-6">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-700 font-bold uppercase text-xs p-2 md:px-6 md:py-3  rounded shadow hover:shadow-lg hover:bg-emerald-600 outline-none focus:outline-none  ease-linear transition-all duration-150 md:text-sm"
                  type="button"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  New Game
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