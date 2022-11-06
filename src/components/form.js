import React from "react";

function form() {
  return (
    <>
      <div class="container  w-75  bg-primary mt-5 rounded shadow">
        <div class="row align-items-stretch">
          <div class="col bg-white p-5 rounded-end">
            <div class="text-end"></div>
            <h2 class="fw-bold text-center py-5">Registra una comunidad</h2>

            <form>
              <div class="mb-4">
                <label for="text" class="form-label">
                  ID
                </label>
                <input type="text" class="form-control" name="name" />
              </div>
              <div class="mb-4">
                <label for="text2" class="form-label">
                  nombre comunidad
                </label>
                <input type="text2" class="form-control" name="lastname" />
              </div>
              <div class="mb-4">
                <label for="text2" class="form-label">
                  Departamento
                </label>
                <select class="form-select" aria-label="Default select example">
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
              <div class="mb-4">
                <label for="text2" class="form-label">
                  Municipios
                </label>
                <select class="form-select" aria-label="Default select example">
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
              <div class="mb-4">
                <label for="text2" class="form-label">
                  categoria
                </label>
                <select class="form-select" aria-label="Default select example">
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
              <div class="mb-4">
                <label for="text2" class="form-label">
                  Distrito
                </label>
                <select class="form-select" aria-label="Default select example">
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-danger">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default form;
