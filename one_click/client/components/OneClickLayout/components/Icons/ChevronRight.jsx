import React from "react";

const ChevronRight = () => {
  return(
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5858 12L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L14.5858 12Z" fill="black"/>
    </svg>
  )
}

export default React.memo(ChevronRight);
