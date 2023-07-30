import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginRegister from "./LoginRegister";
import { BiRightArrow } from "react-icons/bi";
import LoginModanewl from "./LoginModal/LoginModanewl";

const style = {
  position: "absolute",
  top: "25%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: 770,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        style={{ background: "#7ED957", marginRight: "20px", color: "black" }}
        onClick={handleOpen}
      >
        Login <BiRightArrow style={{ marginLeft: "10px" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LoginModanewl/>
        </Box>
      </Modal>
    </div>
  );
}
