import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUploadPolice from "../../utils/FileUploadPolice";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

function PoliceUploadProductPage(props) {
  const [FirstName, setFirstName] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [District, setDistrict] = useState("");

  const [Images, setImages] = useState([]);

  const onFirstName = (event) => {
    setFirstName(event.currentTarget.value);
  };

  const onAddress = (event) => {
    setAddress(event.currentTarget.value);
  };
  const onPhoneNumber = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const onDistrict = (event) => {
    setDistrict(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    // if (!FirstName || !Address || !PhoneNumber || !District || !Images) {
    //   return alert("fill all the fields first!");
    // }

    const variables = {
      writer: props.user.userData._id,
      firstName: FirstName,

      phoneNumber: PhoneNumber,
      address: Address,

      images: Images,
      district: District,
    };

    Axios.post("/api/policeRoute/uploadPolice", variables).then((response) => {
      if (response.data.success) {
        alert("Police info Successfully Uploaded");
        props.history.push("/police");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Police info form</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUploadPolice refreshFunction={updateImages} />

        <br />
        <br />
        <label>Branch</label>
        <Input onChange={onFirstName} value={FirstName} />
        <br />

        <br />
        <label>Address</label>
        <Input onChange={onAddress} value={Address} />
        <br />
        <br />
        <label>District</label>
        <Input onChange={onDistrict} value={District} />

        <br />
        <br />
        <label>Phone number </label>
        <Input onChange={onPhoneNumber} value={PhoneNumber} type='number' />

        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default PoliceUploadProductPage;
