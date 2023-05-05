const ContentDetail = ({year, genre, title}) => {
    return ( 
        <div>
          <div className="truncate text-sm font-bold">{title}</div>
          <div className="text-xs opacity-50 four_chars">{year}</div>
          {/* <div className="text-xs font-bold opacity-75"> {airDate}</div> */}
          {/* <div className="text-xs opacity-50">{genre}</div> */}
        </div>
     );
}
 
export default ContentDetail;