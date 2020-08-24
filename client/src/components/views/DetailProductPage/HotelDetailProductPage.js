import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImageHotel from "./Sections/ProductImageHotel";
import ProductInfoHotel from "./Sections/ProductInfoHotel";
// import Map from "../../map/Map";
import GoogleMap from "../../google-map/google-map.hotel";

function HotelDetailProductPage(props) {
  const hotelId = props.match.params.hotelId;
  const [Hotel, setHotel] = useState([]);

  useEffect(() => {
    Axios.get(`/api/hotelRoute/hotels_by_id?id=${hotelId}&type=single`).then(
      (response) => {
        setHotel(response.data[0]);
      }
    );
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Hotel.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImageHotel detail={Hotel} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfoHotel detail={Hotel} />
        </Col>
      </Row>
      <div>
        {/* <Map /> */}
        <GoogleMap />
      </div>
    </div>
  );
}

export default HotelDetailProductPage;
