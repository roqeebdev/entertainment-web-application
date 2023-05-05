import React from "react";
import Sidebar from "../Components/sidebar";
import AllMovies from "../Components/AllMovies";

const Movies = () => {

    document.title = "Movies"

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#10141F] text-white">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-11 p-5">
              <div className="grid gap-10">
                <AllMovies />
              </div>
            </div>
        </div>
     );
}
 
export default Movies;