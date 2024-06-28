import React from "react";
import "../../styles/networkError.css";

function NetworkError() {
  return (
    <div className="networkErrorContainer">
      <div className="container">
        <div className="glitch" data-text="Network Error">
          Network Error
        </div>
      </div>
    </div>
  );
}

export default NetworkError;
