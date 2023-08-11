const PlayerScore = ({scores}) => {
  return (
    <>
      <div className="flex justify-center select-none mb-2 gap-x-3 ">
        <p className=" p-3  border-b-2 border-red-800  text-red-800">
          X : <strong>{scores.X}</strong>
        </p>
        <p className=" p-3 border-b-2 border-green-800  text-green-800">
          O : <strong>{scores.O}</strong>
        </p>
      </div>
    </>
  );
};

export default PlayerScore;
