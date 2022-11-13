import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FormControl, FormLabel } from "@mui/material";
import {Grid, MenuItem, Select} from "@mui/material";
import {putData} from '../utils/fetch';
import {useState, useEffect} from 'react';
export default function ModalEdit({ comunidad }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [departamentos ,setdepartamentos] = useState([]);
  const [input, setInput] = useState({
    comunidad : '',
    coddepto : 0,
    codmuni : 0,
    codcategoria : 0,
    coddistrito : 0,
    condicion : '',
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
    e.preventDefault();
    putData('/comunidades/editar', input)
    .then(data => {
      console.log(data);
    });
    alert('se ha editado la comunidad'); 
    window.location.reload(true); 
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{comunidad.COMUNIDAD}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              DATOS:
              <Box sx={{ fontWeight: "bold", m: 1 }}>
                Departamento: {comunidad.DEPARTAMENTO}{" "}
              </Box>
              <Box sx={{ fontWeight: "bold", m: 1 }}>
                Municipio: {comunidad.MUNICIPIO}{" "}
              </Box>
              <Box sx={{ fontWeight: "bold", m: 1 }}>
                Categoria: {comunidad.CATEGORIA}{" "}
              </Box>
              <Box sx={{ fontWeight: "bold", m: 1 }}>
                Distrito: {comunidad.DISTRITO}{" "}
              </Box>
            </Typography>
          </DialogContentText>
          <form id="comunidad" onSubmit={(e) => saveSubmit(e)}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Typography mt={2} variant="h3" gutterBottom>
                Datos nuevos para editar:
              </Typography>
              <Grid item>
                <TextField
                  id="codigo-input"
                  name="condicion"
                  label="codigo comunidad"
                  type="text"
                  onChange={(e) => handledChanged(e)}
                  value={comunidad.codigo}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="nombre-input"
                  name="comunidad"
                  label="Nombre de la comunidad"
                  type="text"
                  onChange={(e) => handledChanged(e)}
                  value={input.comunidad}
                />
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel>Seleccione el departamento</FormLabel>
                  <Select
                    name="coddepto"
                    value={input.coddepto}
                    onChange={(e) => getMunicipio(e)}
                    // onClick = {()=> getMunicipio(3)}
                  >
                    {departamentos?.map((item, index) => (
                      <MenuItem key={index} value={item.coddepartamento}>
                        {item.departamento}
                      </MenuItem>
                    ))}
                    {console.log(departamentos)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel>Seleccione el municipio</FormLabel>
                  <Select
                    name="codmuni"
                    value={input.codmuni}
                    onChange={(e) => handledChanged(e)}
                  >
                    {municipios?.map((item, index) => (
                      <MenuItem key={index} value={item?.codmunicipio}>
                        {item?.municipio}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel>Seleccione la categoria</FormLabel>
                  <Select
                    name="codcategoria"
                    value={input.codcategoria}
                    onChange={(e) => handledChanged(e)}
                  >
                    {categorias?.map((item, index) => (
                      <MenuItem key={index} value={item?.codcategoria}>
                        {item?.categoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl mb={2}>
                  <FormLabel>Seleccione el distrito</FormLabel>
                  <Select
                    name="coddistrito"
                    value={input.coddistrito}
                    onChange={(e) => handledChanged(e)}
                  >
                    {distritos?.map((item, index) => (
                      <MenuItem key={index} value={item?.coddistrito}>
                        {item?.distrito}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Button onClick={handleClose}>Editar</Button>
              <Button onClick={handleClose}>cancelar</Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
