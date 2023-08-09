import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import configData from "../config.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProduct({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();
  const [category, setCategory] = React.useState();
  const [description, setDescription] = React.useState();
  const [contact, setContact] = React.useState();

  const handleUpdate = async () => {
    try {
      const body = {
        productId: data._id,
        productName: name,
        price: price,
        category: category,
        description: description,
        contactNumber: contact,
      };

      console.log("body=>", body);

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const resp = await fetch(
        `${configData.apiurl}/product/updateProduct`,
        requestOptions
      );

      if (resp.ok) {
        // alert("product updated successfully");
        window.location.reload();
      } else {
        // alert("error");
        // console.log("error");
      }
    } catch (error) {
      // alert("error");
      console.log("error=>", error);
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleContact = (event) => {
    setContact(event.target.value);
  };

  return (
    <div
      style={{
        position: "absolute",
        marginTop: "-60px",
        marginLeft: "25px",
        zIndex: "100",
      }}
    >
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <form onSubmit={handleUpdate}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Name"
                value={name}
                defaultValue={data.productName}
                variant="outlined"
                onChange={handleName}
              />
              <TextField
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Price"
                value={price}
                variant="outlined"
                defaultValue={data.price}
                onChange={handlePrice}
              />
              <TextField
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Category"
                value={category}
                variant="outlined"
                defaultValue={data.category}
                onChange={handleCategory}
              />
              <TextField
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Description"
                value={description}
                variant="outlined"
                defaultValue={data.description}
                onChange={handleDescription}
              />
              <TextField
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Contact Number"
                value={contact}
                variant="outlined"
                defaultValue={data.contactNumber}
                onChange={handleContact}
              />
            </Typography>
            <Button
              type="submit"
              style={{ marginLeft: "70px" }}
              variant="contained"
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
