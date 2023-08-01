import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaShare } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Input } from "antd";
import { useParams } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ShareModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [iscopy, setIscopy] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIscopy(false);
    }, 3000);
  }, [iscopy]);
  const { pid } = useParams();
  const newid = encodeURIComponent(pid);
  const link = `https://campus-kart.vercel.app/productReview/${newid}`;
  const [val, setVal] = React.useState(link);

  return (
    <div>
      <Tooltip title="Share">
        <FaShare
          onClick={handleOpen}
          size={25}
          //   color="red"
          style={{
            marginTop: "35px",
            marginLeft: "70px",
            cursor: "pointer",
          }}
        />
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ display: "flex" }}
          >
            Share this product{" "}
            <FaShare
              size={20}
              //   color="red"
              style={{
                marginTop: "5px",
                marginLeft: "10px",
                //   cursor: "pointer",
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ display: "flex" }}>
              <Input defaultValue={link} />
              {iscopy ? (
                <Button variant="contained" color="success">
                  Copied!
                </Button>
              ) : (
                <CopyToClipboard text={val} onCopy={() => setIscopy(true)}>
                  <Button variant="outlined">Copy</Button>
                </CopyToClipboard>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
