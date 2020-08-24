import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImageblood from "./Sections/ProductImageBlood";
import ProductInfoblood from "./Sections/ProductInfoBlood";
// import Map from "../../map/Map";
import GoogleMap from "../../google-map/google-map.blood";
function DetailProductPage(props) {
  const bloodId = props.match.params.bloodId;
  const [Blood, setBlood] = useState([]);

  useEffect(() => {
    Axios.get(`/api/bloodRoute/bloods_by_id?id=${bloodId}&type=single`).then(
      (response) => {
        setBlood(response.data[0]);
      }
    );
  }, []);

  return (
    <div className='postPage' style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Blood.FirstName}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImageblood detail={Blood} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfoblood detail={Blood} />
        </Col>
      </Row>
      <div>
        <GoogleMap />
        {/* <Map /> */}
      </div>
    </div>
  );
}

export default DetailProductPage;
