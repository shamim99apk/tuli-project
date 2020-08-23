// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import Icon from "@ant-design/icons";
import "./HotelLandingPage.scss";
const { Meta } = Card;

function HotelLandingPage() {
  const [Hotels, setHotels] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getHotels(variables);
  }, []);

  const getHotels = (variables) => {
    Axios.post("/api/hotelRoute/getHotel", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setHotels([...Hotels, ...response.data.hotels]);
        } else {
          setHotels(response.data.hotels);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch Hotels datas");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getHotels(variables);
    setSkip(skip);
  };

  const renderCards = Hotels.map((hotel, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/hotelRoute/${hotel._id}`}>
              {" "}
              <ImageSlider images={hotel.images} />
            </a>
          }>
          <Meta title={hotel.firstName}></Meta>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div className='hero-wrapper3'>
        <div className='wrapper3'>
          <div className='hero-content3'>
            <div>
              <button className='button3'>
                <a href='/hotel/hotelUpload'>Hotel info</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Hotel list <Icon type='rocket' />{" "}
          </h2>
          <div>
            <button>
              <a href='/hotel/hotelUpload'>upload</a>
            </button>
          </div>
        </div>
        {Hotels.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <h2>No post yet...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}

        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelLandingPage;
