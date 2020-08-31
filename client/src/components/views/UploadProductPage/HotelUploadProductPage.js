import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUploadHotel from "../../utils/FileUploadHotel";

import Axios from "axios";

const { Title } = Typography;
// const { TextArea } = Input;

function HotelUploadProductPage(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Link, setLink] = useState("");

  const [Images, setImages] = useState([]);

  const onName = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onLink = (event) => {
    setLink(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    // if (!Email || !Name || !Images ) {
    //   return alert("fill all the fields first!");
    // }

    const variables = {
      writer: props.user.userData._id,

      email: Email,

      images: Images,
      name: Name,
      link: Link,
    };

    Axios.post("/api/hotelRoute/uploadHotel", variables).then((response) => {
      if (response.data.success) {
        alert("Hotel Successfully Uploaded");
        props.history.push("/hotel");
      } else {
        alert("Failed to upload hotel");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Hotel info</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUploadHotel refreshFunction={updateImages} />

        <br />
        <br />
        <label>Name</label>
        <Input onChange={onName} value={Name} />
        <br />
        <br />

        <label>Email</label>
        <input onChange={onEmail} value={Email} />
        <br />

        <label>Link</label>
        <input onChange={onLink} value={Link} />

        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default HotelUploadProductPage;
