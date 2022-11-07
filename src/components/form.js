import { FormControl } from "@mui/material";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function form() {
  return (
    <>
      <Card justifyContent="center" alignItems="center" sx={{ minWidth: 300 }}>
        <FormControl>
          <CardContent>
            <InputLabel htmlFor="my-input">Codigo Comunidad</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <InputLabel htmlFor="my-input">NombreComunidad</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </CardContent>
        </FormControl>
      </Card>
    </>
  );
}

export default form;
