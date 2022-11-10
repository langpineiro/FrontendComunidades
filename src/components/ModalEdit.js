import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import FeedIcon from '@mui/icons-material/Feed';
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
} from "@mui/material";
import { putData } from "../utils/fetch";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalEdit({ comunidad }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Button onClick={handleOpen} color="warning">
          <FeedIcon fontSize="small" />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" >
              Nombre de la comunidad: {comunidad.COMUNIDAD}
            </Typography>
            <Typography variant="h6" >
              Departamento al que pertenece : {comunidad.DEPARTAMENTO}
            </Typography>
            <Typography variant="h6" >
              Municipio al que pertenece : {comunidad.MUNICIPIO}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ModalEdit;
