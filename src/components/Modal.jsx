// import React from "react";

export default function Modal({ closeModal, winner, history }) {
  // console.log(winner)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-800 text-lg leading-relaxed font-medium md:text-xl">
                {winner === "Draw" ? `${winner}` : `Winner ${winner}`}
              </p>
              <div className="">
                <ul className="history flex flex-col overflow-y-scroll h-32 w-52 md:w-72 scroll shadow-md gap-y-2 md:h-56">
                  {history.map((h, i) => (
                    <ol
                      key={i}
                      className="flex gap-3 bg-slate-600 text-white items-center text-xs md:text-base border mx-2 p-2 "
                    >
                      <p>Turn : {i + 1}</p>
                      <div className="flex gap-x-2">
                        <p>Player: {h?.player}</p>
                        <p>move: {h?.move}</p>
                      </div>
                    </ol>
                  ))}
                </ul>
              </div>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  // handleNewGame()
                  closeModal();
                }}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
