import React from "react";
import Sidebar from "../Components/sidebar";
import Trending from "../Components/trending";
import Recommended from "../Components/recommendedFixed";

const Dashboard = () => {

  document.title = "Dashboard"

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#10141F] text-white">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-11 p-5">
                <Trending />
                <Recommended />
            </div>
        </div>
     );
}
 
export default Dashboard;