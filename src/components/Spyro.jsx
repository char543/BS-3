import React from "react";

const Spyro = () => {
  return (
      <div className="iframeDiv">
        <iframe
          title="BS3"
          src="http://localhost:3000/bs3/index.html"
          className="w-screen h-screen"
        ></iframe>
      </div>
  );
};

export default Spyro;