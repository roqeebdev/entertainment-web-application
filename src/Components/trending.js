import { useState, useEffect } from "react";
import TrendingDetail from "../Components/trendingDetails";

const Trending = () => {
  // const [recommend, setRecommend] = useState([])
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=72a11b158b57f6cc258d85d0d425ea98",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setCountries(data["results"]);
        // setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="">
      <div className="text-[16px] font-bold mb-3">Trending Movies</div>
      <div className="flex gap-3 md:gap-5 overflow-x-scroll justify-between">
        {countries.map((country) => (
          <div key={country.id} className="mb-4">
            <div className="w-80">
            <img
              key={country.id}
              src={`https://image.tmdb.org/t/p/w780` + country.backdrop_path}
              alt=""
              className="object-cover rounded-md"
            />
            </div>
            <TrendingDetail
              year={
                country.release_date == null
                  ? "2022"
                  : country.release_date
              }
              title={country.title == null ? country.name : country.title}
              rating={country.vote_average}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
