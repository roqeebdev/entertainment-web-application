const TrendingDetail = ({ year, title, rating }) => {
  return (
    <div className="rounded relative">
      <div className="absolute rounded-b bottom-0 px-4 w-full pb-4 pt-24 bg-gradient-to-t from-black">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm mb-1 font-bold">{title}</div>
            <div className="four_chars text-xs opacity-60">{year}</div>
          </div>

          {rating >= "9.0" ? (
            <div className="bg-red-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">🔥</div>
          ) : rating >= "7.0" ? (
            <div className="bg-green-300 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm"> 💯 </div>
          ) : rating >= "5.0" ? (
            <div className=" bg-orange-400 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm"> 👍🏾 </div>
          ) : (
            <div className="text-xs bg-slate-500 rounded-full flex justify-center items-center p-4 h-7 w-7">
              {rating.toFixed(1)}
            </div>
          )}

        </div>
      </div>
      {/* <div className="md:hidden">
        <div className="text-sm mb-1">{title}</div>
        <div className="four_chars text-xs opacity-60">{year}</div>
      </div> */}
    </div>
  );
};

export default TrendingDetail;
