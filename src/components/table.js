import React from 'react';
import {useEffect,useState} from "react";
function Table() {
    const [comunidades ,setComunidades] = useState([]); 
    useEffect(() => {
      fetch("/comunidades")
        .then((res) => res.json())
        .then((data) => setComunidades(data.data));
    }, []);

    const llenarComunidades = () =>{
        return comunidades.map((com,index)=>(
          <tr key={index}> 
            <td>{com.codigo}</td> 
            <td>{com.COMUNIDAD}</td>
            <td>{com.DEPARTAMENTO}</td>
            <td>{com.MUNICIPIO}</td>
            <td>{com.CATEGORIA}</td>
            <td>{com.DISTRITO}</td>
          </tr>
          )); 
    }
  return (
    <>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre Comunidad</th>
            <th scope="col">Departamento</th>
            <th scope="col">Municipio</th>
            <th scope="col">Categoria</th>
            <th scope="col">Distrito</th>
          </tr>
        </thead>
        <tbody>
        {llenarComunidades()}
        </tbody>
      </table>
    </>
  );
}

export default Table;
