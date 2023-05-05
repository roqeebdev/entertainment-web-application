import { useState, useEffect } from "react";
import ContentDetail from "../Components/contentDetail";
import next from "../images/arrow-drop-right-line.svg";
import previous from "../images/arrow-drop-left-line.svg";
import last from "../images/skip-forward-mini-fill.svg";
import first from "../images/skip-back-mini-fill.svg";
import avatar from "../images/Profile.svg"

const Loading = () => {
  return (
    <div>
      <p>Loading....</p>
      print('taye');
    </div>
  );
};

const Recommended = () => {
  // const [recommend, setRecommend] = useState([])
  const [countries, setCountries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setIsid] = useState([]);
  const [details, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `
      https://api.themoviedb.org/3/discover/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${activePage}&release_date.gte=1985-01-01&release_date.lte=2002-12-30&with_genres=28&without_genres=16&watch_region=US&with_watch_monetization_types=flatrate`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setCountries(data["results"]);
        // setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [activePage]);

  // Movie details
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Cast
  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US`,
  //     requestOptions
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCast(data["cast"]);
  //       console.log(data.cast, id);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  // Cast
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US`,requestOptions)
      .then((res) => res.json())
      .then((data) => {
     
        setCast(data.cast || []);
        setLoading(false);
        console.log(data.cast);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Videos
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    console.log(id);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setVideo(data["results"]["0"]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Search for movie
  async function searchCountry() {
    if (searchText.length === 0) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${activePage}&release_date.gte=1985-01-01&release_date.lte=2002-12-30&with_genres=28&without_genres=16&watch_region=US&with_watch_monetization_types=flatrate`
      )
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.results);
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=72a11b158b57f6cc258d85d0d425ea98&language=en-US&query=${searchText}&page=1&include_adult=false
      `)
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
    <div className="mt-10">
      <p className="text-[16px] font-bold">Classic action movies</p>
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
          <div onClick={() => setActivePage(activePage - 1)}>
            <img
              src={previous}
              alt=""
              className="p-1 rounded-full border bg-white/10 cursor-pointer"
            />
          </div>
          <div className="text-xs opacity-40">Page {activePage}</div>
          <div onClick={() => setActivePage(activePage === 61 ? 61 : activePage + 1)}>
            <img
              src={next}
              alt=""
              className="p-1 rounded-full border bg-white/10 cursor-pointer"
            />
          </div>
          <div onClick={() => setActivePage(61)}>
            <img src={last} alt="" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
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
              year={
                country.release_date == null
                  ? "Coming soon!"
                  : country.release_date
              }
              title={country.title == null ? country.name : country.title}
            />
          </div>
        ))}
        {loading ? (
          <Loading />
        ) : (
          <div>
            {isOpen ? (
              <>
                <div className="grid bg-black/90 place-content-center fixed inset-0 p-5 md:p-0">
                  <div className="bg-white max-w-sm md:max-w-md h-[500px] overflow-y-scroll rounded-md border">
                    {/* content media */}
                    <div className="relative overflow-hidden">
                      <div className="">
                        <iframe
                          className="w-full h-[240px]"
                          src={`https://www.youtube.com/embed/` + video.key}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
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
                    </div>
                    {/* end content media */}

                    {/* content details */}
                    <div className="px-4 mt-4 pb-10 text-black">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className=" font-bold">{details.original_title}</p>
                          <p className="text-sm">
                            Release date: {details.release_date}
                          </p>
                        </div>
                        <div>
                          {details.vote_average >= "9.0" ? (
                            <div className="bg-red-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">
                              🔥
                            </div>
                          ) : details.vote_average >= "7.0" ? (
                            <div className="bg-green-300 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">
                              💯
                            </div>
                          ) : details.vote_average >= "5.0" ? (
                            <div className="bg-orange-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">
                              👍🏽
                            </div>
                          ) : (
                            <div className="bg-red-200 rounded-full flex justify-center items-center p-4 h-7 w-7 text-xs md:text-sm">
                              {details.vote_average}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mt-2 text-justify">
                        {details.overview}
                      </p>
                      <p className="text-sm my-4 font-bold">Cast:</p>
                      <div className="flex overflow-x-scroll gap-8">
                      {cast.map((actor) => (
                        <div key={actor.id} className="">
                          {actor.profile_path === null ? 
                          <div className="border h-16 w-16 rounded-full flex justify-center items-center bg-slate-100">
                            <img src={avatar} alt=""/>
                          </div>
                          :
                          <div className="border h-16 w-16 rounded-full overflow-clip">
                            <img src={`https://image.tmdb.org/t/p/w300` + actor.profile_path} alt="" className="object-cover w-full" /> :
                          </div>  
                        }
                          <p className="text-center text-sm">{actor.original_name}</p>
                          <p className="text-xs opacity-50 font-bold text-center mt-1">({actor.character})</p>
                        </div>
                      ))}
                      </div>
                      
                    </div>
                    {/* end content details */}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommended;
