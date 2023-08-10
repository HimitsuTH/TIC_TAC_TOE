/* eslint-disable no-unused-vars */
const HistoryBoard = ({ history }) => {

 
  return (
    <div className=" md:fixed md:right-2 md:z-20 md:top-48 mt-4 md:mt-0">
      <p className=" font-bold select-none">History Board</p>
      <ul className="history flex flex-col overflow-y-scroll h-32 w-52 md:w-72 scroll shadow-md gap-y-2 md:h-56">
        {history.map((h, i) => (
          <ol
            key={i}
            className={`flex gap-3  text-white items-center text-xs md:text-base border mx-2 p-2 bg-slate-600`}
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
  );
};

export default HistoryBoard;
