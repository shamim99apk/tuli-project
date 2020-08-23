import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function ProductInfoHotel(props) {
  const [Hotel, setHotel] = useState({});

  useEffect(() => {
    setHotel(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Police  info'>
        <Descriptions.Item label='Title'> {Hotel.title}</Descriptions.Item>
        <Descriptions.Item label='Email'>{Hotel.email}</Descriptions.Item>
        <Descriptions.Item label='Name'>{Hotel.name}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
    </div>
  );
}

export default ProductInfoHotel;
