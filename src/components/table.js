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
import Button from "@mui/material/Button";
import TablePagination from '@mui/material/TablePagination';
import Modal from './ModalEdit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteData } from "../utils/fetch";
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
const handleDelete = async (e,id) => {
  e.preventDefault(); 
  deleteData("/comunidades/eliminar/"+ id).then((data) => {
   console.log(data);
 });
 alert("se ha eliminado la comunidad");
 window.location.reload(true); 
};
export default function Tabla() {
  const [comunidades ,setComunidades] = useState([]); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
    useEffect(() => {
      fetch("/comunidades")
        .then((res) => res.json())
        .then((data) => setComunidades(data.data));
    }, []);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <Paper sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table mt={4} sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Codigo Comunidad</StyledTableCell>
            <StyledTableCell align="center">Nombre comunidad</StyledTableCell>
            <StyledTableCell align="center">Departamento</StyledTableCell>
            <StyledTableCell align="center">Municipio</StyledTableCell>
            <StyledTableCell align="center">Categoria</StyledTableCell>
            <StyledTableCell align="center">Distrito</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comunidades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
            <StyledTableRow key={index}>
            <StyledTableCell align="center" component="th" scope="row">
                {row.codigo}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.COMUNIDAD}
              </StyledTableCell>
              <StyledTableCell align="center">{row.DEPARTAMENTO}</StyledTableCell>
              <StyledTableCell align="center">{row.MUNICIPIO}</StyledTableCell>
              <StyledTableCell align="center">{row.CATEGORIA}</StyledTableCell>
              <StyledTableCell align="center">{row.DISTRITO}</StyledTableCell>
              <StyledTableCell align="center">
              <Modal comunidad={row}/>
              </StyledTableCell>
              <StyledTableCell align="center"><Button onClick={(e) => handleDelete(e, row.codigo)} ><DeleteForeverIcon fontSize='small' /></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={comunidades.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     </Paper>
  );
}