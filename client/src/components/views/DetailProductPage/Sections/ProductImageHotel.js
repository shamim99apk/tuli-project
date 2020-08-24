import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImageHotel(props) {
  const [Images, setImages] = useState([]);
  const [Hotel, setHotel] = useState({});

  useEffect(() => {
    setHotel(props.detail);
  }, [props.detail]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images &&
        props.detail.images.map((item) => {
          return images.push({
            original: `http://localhost:5000/${item}`,
          });
        });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <a href={Hotel.link}>
        <ImageGallery items={Images} />
      </a>
    </div>
  );
}

export default ProductImageHotel;
