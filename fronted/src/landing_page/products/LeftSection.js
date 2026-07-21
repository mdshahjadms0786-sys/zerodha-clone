import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  const handleClick = (e) => {
    if (e.currentTarget.getAttribute("href") === "#") {
      e.preventDefault();
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={tryDemo} onClick={handleClick}>Try Demo</a>
            <a href={learnMore} style={{ marginLeft: "50px" }} onClick={handleClick}>
              Learn More
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay} onClick={handleClick}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore} onClick={handleClick}>
              <img
                src="media/images/appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;