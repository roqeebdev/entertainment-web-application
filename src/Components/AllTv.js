import { useState, useEffect } from "react";
import ContentDetail from "../Components/contentDetail";
// import Movie from "../images/film-fill.svg";
// import Tv from "../images/tv-2-fill.svg";
import next from "../images/arrow-drop-right-line.svg";
import previous from "../images/arrow-drop-left-line.svg";
import last from "../images/skip-forward-mini-fill.svg";
import first from "../images/skip-back-mini-fill.svg";


const Loading = () => {
  return (
    <div className="text-center">
      Loading TV Shows...
      Please wait.
    </div>
  );
};

const AllTvShows = () => {
  // const [recommend, setRecommend] = useState([])
  const [countries, setCountries] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setIsid] = useState([]);
  const [details, setTvDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // const currentPage = "p-4 rounded-full bg-white text-black h-8 w-8 place-content-center grid text-xs cursor-pointer"
  // const controls = "p-4 rounded-full border bg-white/10 text-white h-8 w-8 place-content-center grid text-xs cursor-pointer"

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=72a11b158b57f6cc258d85d0d425ea98&page=${activePage}`
      ,requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setCountries(data["results"]);
        // setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [activePage]);

  // TV details
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setTvDetails(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Search for Tv Show
  async function searchCountry() {
    if (searchText.length === 0) {
      fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=72a11b158b57f6cc258d85d0d425ea98&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.results);
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&page=1&query=${searchText}&include_adult=false`
      )
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.results);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  return (
    <div className="mt-8">

      <p className="text-[16px] font-bold">Discover Tv Shows</p>

      <div className="grid grid-cols-1 md:grid-cols-4 mt-4 mb-6 space-y-6">
        <div className="md:col-span-3">
          <form onSubmit={handleSearchCountry}>
            <input
              type="search"
              placeholder="Search Movie..."
              className="text-white bg-transparent border border-white/20 p-4 w-full md:w-1/2 text-center md:text-left text-xs rounded-md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
        <div className="flex justify-between items-center">
          <div onClick={() => setActivePage(activePage === 1 ? 1 : 1)}>
            <img src={first} alt="" />
          </div>
          <div onClick={() => setActivePage(activePage === 1 ? 1 : activePage -1)}>
            <img
              src={previous}
              alt=""
              className="p-1 rounded-full border bg-white/10 cursor-pointer"
            />
          </div>
          <div className="text-xs opacity-40">Page {activePage}</div>
          <div onClick={() => setActivePage(activePage === 200 ? 200 : activePage + 1)}>
            <img
              src={next}
              alt=""
              className="p-1 rounded-full border bg-white/10 cursor-pointer"
            />
          </div>
          <div onClick={() => setActivePage(200)}>
            <img src={last} alt="" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-20">
        {countries.map((country) => (
          <div key={country.id} className="rounded-md">
            <img
              key={country.id}
              onClick={() => {
                setIsid(country.id);
                setIsOpen(true);
              }}
              src={`https://image.tmdb.org/t/p/w300` + country.poster_path}
              alt=""
              className="w-full h-95 object-cover rounded-md mb-3 cursor-pointer"
            />
            <ContentDetail
              title={country.title == null ? country.name : country.title}
              // airDate={country.first_air_date == null
              //   ? "Coming soon!"
              //   : country.first_air_date}
              airDate={"First air date: " + country.origin_country}
            />
          </div>
        ))}
        {loading ? (
          <Loading/>
        ) :(
          <div>
            {isOpen ? (
              <>
                <div className="grid bg-black/90 place-content-center fixed inset-0 p-5 md:p-0">
                  <div className="bg-white max-w-sm md:max-w-md h-[500px] overflow-y-scroll rounded-md border">
                    {/* content media */}
                    <div className="relative overflow-hidden">
                      <div className="relative">
                      <img src={`https://image.tmdb.org/t/p/w780` + details.backdrop_path} alt="" className="w-full h-64 object-cover" />
                      <div className=" bg-gradient-to-t from-black to-black/20 h-full absolute bottom-0 right-0 left-0"></div>
                      </div>
                      <div className="absolute top-2 right-2">
                        {/* close button */}
                        <button
                          className="absolute top-0 right-0 p-2 bg-white/50 rounded-full border"
                          onClick={() => setIsOpen(false)}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        {/* end close button */}
                      </div>
                      <div className="text-white absolute bottom-4 left-0 right-0 px-4">
                      <div className="w-full flex justify-between items-end">
                      <div><p className="font-bold">{details.name}</p>
                      <p className="text-sm">
                        Seasons: <span className="font-bold text-xs">{details.number_of_seasons}</span>, Episodes: <span className="font-bold">{details.number_of_episodes}</span>
                      </p></div>
                      <div>
                          {details.vote_average >= "9.0" ? (
                            <div className="bg-red-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">🔥</div> ) :
                            details.vote_average >= "7.0" ? (
                              <div className="bg-green-300 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">💯</div> ) :
                              details.vote_average >= "5.0" ? (
                                <div className="bg-orange-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">👍🏽</div> ) : 
                            <div className="bg-red-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">👎🏽</div>
                          }
                        </div>
                      </div>
                      </div>
                    </div>
                    {/* end content media */}

                    {/* content details */}
                    <div className="px-4 mt-4 pb-10 text-black">
                      <div className="flex justify-between items-end">
                        <div>
                        <p className="font-bold text-sm">Overview:</p>
                        </div>
                        <div className={details.homepage === "" ? "hidden" : "block"}>
                          <a href={details.homepage} target="blank">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"/></svg>
                          </a>
                        </div>
                      </div>
                      {details.overview === "" ? 
                      <p className="text-2xl font-bold text-gray-300 mt-2">
                      No description availale.
                    </p> :
                    <p className="text-sm mt-2 text-justify">
                    {details.overview}
                  </p>  
                    }
                    </div>
                    {/* end content details */}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )

        }
      </div>
    </div>
  );
};

export default AllTvShows;
