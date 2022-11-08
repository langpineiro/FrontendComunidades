import { FormControl, FormLabel } from "@mui/material";
import {Grid, TextField, MenuItem, Select,Button} from "@mui/material";
import * as React from "react";
import {useState, useEffect} from 'react';
import Typography from "@mui/material/Typography";
function Form() {
  const [departamentos ,setdepartamentos] = useState([]); 
  useEffect(() => {
    fetch("/comunidades/departamentos")
      .then((res) => res.json())
      .then((data) => setdepartamentos(data.data));
  }, []);
  const llenardepartamentos = () =>{
    return departamentos.map((com,index)=>(
      <MenuItem key={index.coddepartamento} value={com.coddepartamento}>
      {com.departamento}
     </MenuItem>
      )); 
}
console.log(departamentos); 
  return (
    <>
      <form>
      <Grid container alignItems="center" justify="center" direction="column">
      <Typography mt={2} variant="h3" gutterBottom>
        Registrar nueva Comunidad
      </Typography>
        <Grid item>
          <TextField
            id="codigo-input"
            name="codigo"
            label="codigo comunidad"
            type="text"
          />
        </Grid>
        <Grid item>
          <TextField
            id="nombre-input"
            name="nombre"
            label="Nombre de la comunidad"
            type="text"
          />
        </Grid>
        <Grid item>
          <FormControl>
          <FormLabel>Seleccione el departamento</FormLabel>
            <Select
              name="departamento"
            >
              {llenardepartamentos()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
          <FormLabel>Seleccione el municipio</FormLabel>
            <Select
              name="municipio"
            >
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
          <FormLabel>Seleccione la categoria</FormLabel>
            <Select
              name="categoria"
            >
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl mb={2}>
          <FormLabel>Seleccione el distrito</FormLabel>
            <Select
              name="distrito"
            >
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
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
