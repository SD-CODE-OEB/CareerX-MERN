import React from "react";
import Container from "../Container";
import axios from "axios";

const Upload = () => {
  const BPATH = process.env.REACT_APP_BACKEND_APP_PATH;
  const [data, setData] = React.useState({
    name: "",
    file: "",
    price: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("file", data.file);
    formData.append("price", data.price);
    await axios
      .post(`${BPATH}/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="card border-0 rounded-0 py-5 d-flex justify-content-center align-items-center">
      <h1 className="card-title text-center fw-bolder m-3 fill">
        Upload Products
      </h1>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="card-body p-5"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="formPhotoName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formPhotoName"
            placeholder="Enter photo name"
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formPhotoFile" className="form-label">
            Upload Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="formPhotoFile"
            accept=".png,.jpg,.jpeg"
            onChange={(e) =>
              setData((prev) => ({ ...prev, file: e.target.files[0] }))
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="formPrice"
            placeholder="Enter price"
            value={data.price}
            onChange={(e) =>
              setData((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default Upload;
