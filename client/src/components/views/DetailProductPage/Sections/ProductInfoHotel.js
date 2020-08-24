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
        <div>
          <Descriptions.Item label='Link'>
            {Hotel.link ? <a href={Hotel.link}>{Hotel.link}</a> : ""}
          </Descriptions.Item>
        </div>

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
