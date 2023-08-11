/* eslint-disable no-unused-vars */
const HistoryBoard = ({ history }) => {

 
  return (
    <div className=" md:fixed lg:right-14 md:z-20 md:top-48 mt-4 md:mt-0">
      <p className=" font-bold select-none">History Board</p>
      <ul className="history flex flex-col overflow-y-scroll h-32  w-72 md:w-80 scroll shadow-md gap-y-2 md:h-56">
        <ol key="start" className="flex gap-3  text-white justify-center items-center text-xs md:text-sm border mx-2 p-2 bg-blue-700">Game start</ol>
        {history.map((h, i) => (
          <ol
            key={i}
            className={`flex gap-3  text-white items-center text-xs md:text-sm border mx-2 p-2 bg-slate-600`}
          >
            <p>Turn : {i + 1}</p>
            <div className="flex gap-x-2">
              <p>{`"${h?.player}" `}</p>
              <p>{h?.position}</p>
            </div>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default HistoryBoard;
