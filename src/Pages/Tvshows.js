import React from "react";
import Sidebar from "../Components/sidebar";
import AllTvShows from "../Components/AllTv";

const TvShows = () => {

    document.title = "Tv Shows"

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#10141F] text-white">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-11 p-5">
              <div className="grid gap-10">
                <AllTvShows />
              </div>
            </div>
        </div>
     );
}
 
export default TvShows;