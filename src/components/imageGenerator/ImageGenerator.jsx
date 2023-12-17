import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImage from "../assets/default_image.svg";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);

  const ImageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });
    let data = await res.json();
    let dataArry = data.data[0].url;
    setImageUrl(dataArry);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span>generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={imageUrl === "/" ? defaultImage : imageUrl}
            alt="ai img generator"
          />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-inp"
          placeholder="Describe What You Want To See"
          ref={inputRef}
        />
        <div className="generate-btn" onClick={ImageGenerator}>
          Generate Image
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
