const formulario = document.getElementById("miformulario");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = document.getElementById("fname").value;
  const apellido = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("message").value;
  const phone = document.getElementById("phone").value
  const datos = {
    nombre: nombre,
    apellido : apellido,
    email: email,
    mensaje: mensaje,
    phone : phone,
  };
  fetch("https://proyecto-example-web-default-rtdb.firebaseio.com/collection.json", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      document.getElementById("phone").value = "";
     
    })
    .catch((error) => console.error(error));
});

