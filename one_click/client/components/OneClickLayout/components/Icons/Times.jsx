import React from "react";

const Times = () => {
    return (
        <svg aria-labelledby="button" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.7071 7.70706L7.70712 17.7071L6.29291 16.2928L16.2929 6.29285L17.7071 7.70706Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2929 17.7071L6.29291 7.70706L7.70712 6.29285L17.7071 16.2928L16.2929 17.7071Z" fill="black"/>
            </g>
        </svg>
    );
}

export default React.memo(Times);
