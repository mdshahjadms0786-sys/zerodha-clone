import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  const handleClick = (e) => {
    if (e.currentTarget.getAttribute("href") === "#") {
      e.preventDefault();
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore} onClick={handleClick}>Learn More</a>
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;