const host = "http://localhost:8080/";

const service = {
  async getAllPerson() {
    try {
      const response = await fetch(host.concat("person/v1/list"));
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.log("Este fue un error llamando el servicio listar", error);
      throw error;
    }
  },

  async getByIdPerson(id) {
    try {
      const response = await fetch(host.concat("person/v1/search".concat(id)));
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.error(
        "Este fue el error llamando el servicio consultar por id",
        error
      );
    }
  },

  async deleteByIdPerson(id) {
    try {
      const response = await fetch(host.concat("person/v1/delete?id=".concat(id)));
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.error(
        "Este fue el error llamando el servicio consultar por id",
        error
      );
    }
  },

  async savePerson(data) {
    try {
      const apiSave = host.concat("person/v1/save");
      const response = await fetch(apiSave, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.error(
        "Este fue el error llamando el servicio consultar por id",
        error
      );
    }
  },

  async callUpdatePerson(data) {
    try {
      const apiSave = host.concat("person/v1/update");
      const response = await fetch(apiSave, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.error(
        "Este fue el error llamando el servicio consultar por id",
        error
      );
    }
  },
  openModalUpdate(id,nombres,apellido,tipo_documentos,documento,direccion,fk_tipo_personas,fecha_nacimiento,lugar_nacimiento,estado_sistema){
    document.getElementById('modalId').textContent = id;
    document.getElementById('modalNombre').value = nombres;
    document.getElementById('modalApellido').value = apellido;
    document.getElementById('modalTipoDocumento').value = tipo_documentos;
    document.getElementById('modalDocumento').value = documento;
    document.getElementById('modalDireccion').value = direccion;
    document.getElementById('modalTipoPersona').value = fk_tipo_personas;
    document.getElementById('modalFechaNac').value = fecha_nacimiento;
    document.getElementById('modalLugarNac').value = lugar_nacimiento;
    document.getElementById('modalEstado').value = estado_sistema;
  
    const modal = new bootstrap.Modal(document.getElementById('dataModal'));
    modal.show();
  },
  updatePerson(){
    personId = document.getElementById('modalId').value;
    personNombre = document.getElementById('modalNombre').value;
    personApellido = document.getElementById('modalApellido').value ;
    personTipoDocumento = document.getElementById('modalTipoDocumento').value;
    personDocumento = document.getElementById('modalDocumento').value;
    personDireccion = document.getElementById('modalDireccion').value;
    personTipoPersona = document.getElementById('modalTipoPersona').value;
    personFechaNac = document.getElementById('modalFechaNac').value;
    personLugarNac = document.getElementById('modalLugarNac').value;
    personEstado = document.getElementById('modalEstado').value;

    const data = {
      "id" : personId,
      "nombres": personNombre,
      "apellido": personApellido,
      "fk_tipo_documentos": personTipoDocumento,
      "documento": personDocumento,
      "direccion": personDireccion,
      "fk_tipo_personas": personTipoPersona,
      "fecha_nacimiento": personFechaNac,
      "lugar_nacimiento": personLugarNac,
      "estado_sistema": personEstado

    }
    this.callUpdatePerson(data);
  }
};



document.addEventListener("DOMContentLoaded", function () {
  var dateble = document.querySelector("#dataTablePacientes tbody");

  async function cargarDatosTabla() {
    try {
      const data = await service.getAllPerson();
      renderTabla(data);
    } catch (error) {
      console.error("Ha fallado en la carga de los datos en la lista", error);
    }
  }


  function renderTabla(data) {
    try {
      dateble.innerHTML = "";
      data.forEach((person) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `   <th>${person.id}</th>
                <td>${person.nombres}</td>
                <td>${person.apellido}</td>
                <td>${person.fk_tipo_documentos.id}</td>
                <td>${person.documento}</td>
                <td>${person.direccion}</td>
                <td>${person.fk_tipo_personas.id}</td>
                <td>${person.fecha_nacimiento}</td>
                <td>${person.lugar_nacimiento}</td>
                <td>${person.estado_sistema}</td>

                <td>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">historia clinica</button>
                <button type="button" class="btn btn-outline-danger" onClick=service.deleteByIdPerson(${person.id})   >Eliminar Paciente</button>
                <button type="button" class="btn btn-outline-info" class="btn btn-warning" onclick=service.openModalUpdate(${person.id},'${person.nombres}','${person.apellido}','${person.fk_tipo_documentos.id}','${person.documento}','${person.direccion}','${person.fk_tipo_personas.id}','${person.fecha_nacimiento}','${person.lugar_nacimiento}','${person.estado_sistema}') >Actualizar Paciente</button>
                </div>
                </td>`;
        dateble.appendChild(fila);
      });
    } catch (error) {
      console.error("renderizando", error);
    }
  }

      


  cargarDatosTabla();
});