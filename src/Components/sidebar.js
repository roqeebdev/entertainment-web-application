import Dashboard from '../images/dashboard-fill.svg'
import Movie from '../images/film-fill.svg'
import Series from '../images/tv-2-fill.svg'
import Logo from '../images/vip-crown-2-fill.svg'
import Profile from '../images/taye.jpeg'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const currentPage = "opacity-100"
  const otherPage = "opacity-30"

    return ( 
      
      <div className="h-20 md:h-screen md:p-2 sticky top-0">
        <div className="bg-[#161D2F] h-full rounded text-sm flex md:grid md:content-between md:justify-center justify-between items-center text-center">
          <div className="p-3 md:justify-center grid">
            <img src={Logo} alt="" />
          </div>
          <div className="p-3 gap-10 flex md:grid md:justify-center">
            <Link to="/"><img src={Dashboard} alt="" className={document.title === "Dashboard" ? currentPage: otherPage } /></Link>
            <Link to="/movies"><img src={Movie} alt="" className={document.title === "Movies" ? currentPage: otherPage } /></Link>
            <Link to="/tv"><img src={Series} alt="" className={document.title === "Tv Shows" ? currentPage: otherPage }/></Link>
          </div>
          <div className="p-3">
            <img src={Profile} alt="" className='rounded-full border-2 border-gray-50 w-8'/>
          </div>
        </div>
      </div>

     );
}
 
export default Sidebar;