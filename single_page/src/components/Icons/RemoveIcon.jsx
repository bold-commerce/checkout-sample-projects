import React from "react";

const RemoveIcon = () => {
  return (
    <svg aria-labelledby="button" width="16" height="16" viewBox="0 0 24 24" fill="#595959" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 7.70706L7.70712 17.7071L6.29291 16.2928L16.2929 6.29285L17.7071 7.70706Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.2929 17.7071L6.29291 7.70706L7.70712 6.29285L17.7071 16.2928L16.2929 17.7071Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"/>
    </svg>
  );
}

export default React.memo(RemoveIcon);
