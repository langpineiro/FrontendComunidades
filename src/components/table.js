import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react'; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const rows = [
];

export default function Tabla() {
  const [comunidades ,setComunidades] = useState([]); 
    useEffect(() => {
      fetch("/comunidades")
        .then((res) => res.json())
        .then((data) => setComunidades(data.data));
    }, []);
    console.log(comunidades); 
  return (
    <TableContainer component={Paper}>
      <Table mt={4} sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Codigo Comunidad</StyledTableCell>
            <StyledTableCell align="right">Nombre comunidad</StyledTableCell>
            <StyledTableCell align="right">Departamento&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Municipio&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Categoria&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Distrito&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comunidades.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.COMUNIDAD}
              </StyledTableCell>
              <StyledTableCell align="right">{row.DEPARTAMENTO}</StyledTableCell>
              <StyledTableCell align="right">{row.MUNICIPIO}</StyledTableCell>
              <StyledTableCell align="right">{row.CATEGORIA}</StyledTableCell>
              <StyledTableCell align="right">{row.DISTRITO}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}