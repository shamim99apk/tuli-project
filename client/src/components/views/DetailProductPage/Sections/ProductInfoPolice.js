import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

function ProductInfoPolice(props) {
  const [Police, setPolice] = useState({});

  useEffect(() => {
    setPolice(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title='Police  info'>
        <Descriptions.Item label='Branch'>
          {" "}
          {Police.firstName}
        </Descriptions.Item>

        <Descriptions.Item label='District'>
          {" "}
          {Police.district}
        </Descriptions.Item>
        <Descriptions.Item label='Phone number'>
          {" "}
          {Police.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label='Address'> {Police.address}</Descriptions.Item>
      </Descriptions>

      <br />
    </div>
  );
}

export default ProductInfoPolice;
