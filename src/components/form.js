import { FormControl, FormLabel } from "@mui/material";
import {Grid, TextField, MenuItem, Select,Button} from "@mui/material";
import * as React from "react";
import {useState, useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {postData} from '../utils/fetch';
function Form() {
  const [departamentos ,setdepartamentos] = useState([]);
  // const [departamentSelec, setDepartamentSelec] = useState('');
  const [input, setInput] = useState({
    id : '',
    comunidad : '',
    coddepto : 0,
    codmuni : 0,
    codcategoria : 0,
    coddistrito : 0
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
    postData('/comunidades/guardar', input)
    .then(data => {
      console.log(data);
    });
    alert('se ha creado la comunidad');  
  }
  return (
    <>
      <form onSubmit={(e)=>saveSubmit(e)}>
      <Grid container alignItems="center" justify="center" direction="column">
      <Typography mt={2} variant="h3" gutterBottom>
        Registrar nueva Comunidad
      </Typography>
        <Grid item>
          <TextField
            id="codigo-input"
            name="id"
            label="codigo comunidad"
            type="text"
            onChange={(e) => handledChanged(e)}
            value = {input.codigo}
          />
        </Grid>
        <Grid item>
          <TextField
            id="nombre-input"
            name="comunidad"
            label="Nombre de la comunidad"
            type="text"
            onChange={(e) => handledChanged(e)}
            value = {input.comunidad}
          />
        </Grid>
        <Grid item>
          <FormControl>
          <FormLabel>Seleccione el departamento</FormLabel>
            <Select
              name="coddepto"
              value = {input.coddepto}
              onChange={(e) => getMunicipio(e)}
              // onClick = {()=> getMunicipio(3)}
            >
             {
               departamentos?.map((item, index) =>(
                <MenuItem key={index} value={item.coddepartamento}>
                {item.departamento}
               </MenuItem>
               ))
             }
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
              {
               municipios?.map((item, index) =>(
                <MenuItem key={index} value={item?.codmunicipio}>
                {item?.municipio}
               </MenuItem>
               ))
             }
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
             {
              categorias?.map((item, index) =>(
                <MenuItem key={index} value={item?.codcategoria}>
                {item?.categoria}
               </MenuItem>
               ))
             }
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
               {
              distritos?.map((item, index) =>(
                <MenuItem key={index} value={item?.coddistrito}>
                {item?.distrito}
               </MenuItem>
               ))
             }
            </Select>
          </FormControl>
        </Grid>
        <Button  variant="contained" color="primary" type="submit">
          Guardar comunidad
        </Button>
       </Grid>
      </form>
    </>
  );
}

export default Form;
