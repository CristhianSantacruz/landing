

const formulario = document.getElementById("miformulario");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = document.getElementById("fname")
  const apellido = document.getElementById("lname")
  const email = document.getElementById("email")
  const mensaje = document.getElementById("message")
  const phone = document.getElementById("phone")
  const categorySelect = document.getElementById("category")

 
  const datos = {
    nombre: nombre.value,
    apellido : apellido.value,
    email: email.value,
    mensaje: mensaje.value,
    phone : phone.value,
    categorySelect : categorySelect.value
  };


  if(validarCampos(datos) ===false){
    return;
  }

  if(phone.value.length !== 10)  {
    Swal.fire({
      icon : "warning",
      text : "El telefono solo debe tener 10 digitos",
      showConfirmButton : false,
      timer : 1000
   });
   phone.value = ""
   return;
  }

  if(categorySelect.value === "") {
    Swal.fire({
      icon : "error",
      text : "Elige la categoria que perteneces",
      showConfirmButton : false,
      timer : 1000
   });
    return;
  }
  
  fetch("https://proyecto-example-web-default-rtdb.firebaseio.com/collection.json", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      nombre.value = "";
      apellido.value = "";
      email.value = "";
      mensaje.value = "";
      phone.value = "";
      categorySelect.value = "API"     
      Swal.fire({
         icon : "success",
         text : "Se ha enviado correctamente",
         showConfirmButton : false,
         timer : 1000
      });
     
    })
    .catch((error) => console.error(error));
});

function validarCampos(values) {
  for (const key in values) {
    if (values[key] === "") {
      Swal.fire({
        icon: "warning",
        text: "Por favor, proporcione su " + key
      });
      return false; 
    }
  }
  return true; 
}

