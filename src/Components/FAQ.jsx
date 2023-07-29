import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const clients = [
    {
      Question: "What do you like the most?",
      answer: "Books ",
      Key:1
    },
    {
      Question: "What do you like the most?",
      answer: "Books",
      Key:2
    },
    {
      Question: "What do you like the most?",
      answer: "Books",
      key:3
    },
  ];

  return (
    <List
    className="faq_design"
      sx={{ width: "100%", maxWidth:1200, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" style={{fontSize:"1.5rem"}}>
          FAQs
        </ListSubheader>
      }
    >
      {clients.map((client) => {
        return (
          <div>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                < PsychologyAltOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={client.Question} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {/* <StarBorder /> */}
                  </ListItemIcon>
                  <ListItemText primary={client.answer} />
                </ListItemButton>
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
}
