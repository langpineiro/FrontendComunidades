import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import {useState,useEffect} from 'react'; 
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
} from "@mui/material";
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
  const [departamentos ,setdepartamentos] = useState([]);
// const [departamentSelec, setDepartamentSelec] = useState('');
const [input, setInput] = useState({
  comunidad : '',
  coddepto : 0,
  codmuni : 0,
  codcategoria : 0,
  coddistrito : 0,
  condicion:''
});
const [municipios, setMunicipios] = useState([]); 
const [categorias, setCategorias] = useState([]); 
const [distritos, setDistritos] = useState([]);
useEffect(() => {
    getDepartamentos(); 
    getCategoria();
    getDistritos();
},[]);
const getDepartamentos = async() =>{
  fetch("/comunidades/departamentos")
  .then((res) => res.json())
  .then((data) => setdepartamentos(data.data));
}
const getDistritos = async() =>{
  fetch("/comunidades/distritos")
  .then((res) => res.json())
  .then((data) => setDistritos(data.data));
}
const handledChanged = (e) =>{
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
}
const getMunicipio = async (e) =>{
  setInput({
    ...input,
    coddepto : e.target.value
  })
  await fetch("/comunidades/municipiosSegunDepa/" + e.target.value)
  .then((res) => res.json())
  .then((data) => setMunicipios(data.data));
}
const getCategoria = async (e) =>{
  await fetch("/comunidades/categorias")
  .then((res) => res.json())
  .then((data) => setCategorias(data.data));
}
const saveSubmit = async (e) =>{
  // e.preventDefault();
  // postData('/comunidades/guardar', input)
  // .then(data => {
  //   console.log(data);
  // });
  // alert('se ha creado la comunidad'); 
}
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Button onClick={handleOpen} color="warning">
          <EditIcon fontSize="small" />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form id="comunidad">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                EDITAR COMUNIDAD
              </Typography>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
              >
                <Grid item>
                  <TextField
                    id="nombre-input"
                    name="comunidad"
                    label="Nombre de la comunidad"
                    type="text"
                    value={comunidad.COMUNIDAD} 
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="nombre-input"
                    name="departamentoAnterior"
                    label="DEPARTAMENTO ANTERIOR"
                    type="text"
                    value={comunidad.DEPARTAMENTO} 
                  />
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel>Seleccione el nuevo departamento</FormLabel>
                    <Select name="coddepto">
                    <MenuItem >
                    </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    id="nombre-input"
                    name="departamentoAnterior"
                    label="MUNICIPIO ANTERIOR"
                    type="text"
                    value={comunidad.MUNICIPIO} 
                  />
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel>Seleccione el nuevo municipio</FormLabel>
                    <Select name="codmuni"></Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    id="nombre-input"
                    name="categoriaAnterior"
                    label="CATEGORIA ANTERIOR"
                    type="text"
                    value={comunidad.CATEGORIA} 
                  />
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel>Seleccione la categoria</FormLabel>
                    <Select name="codcategoria"></Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    id="nombre-input"
                    name="distritoAnterior"
                    label="DISTRITO ANTERIOR"
                    type="text"
                    value={comunidad.DISTRITO} 
                  />
                </Grid>
                <Grid item>
                  <FormControl mb={2}>
                    <FormLabel>Seleccione el nuevo distrito</FormLabel>
                    <Select name="coddistrito"></Select>
                  </FormControl>
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                  Editar comunidad
                </Button>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ModalEdit;
