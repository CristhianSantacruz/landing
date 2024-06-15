
(async () => {
  const response = await fetch("https://proyecto-example-web-default-rtdb.firebaseio.com/collection.json");
  const data = await response.json();

  console.log("Datos:", data);

  const container = document.getElementById("tarjetas-container");
  container.innerHTML = ''; 
  const resumenContainer = document.getElementById("resumen-container");

  const emailCounts = {};
  const nombres = {}; // Objeto para almacenar nombres asociados a los correos

  Object.keys(data).forEach(key => {
    const email = data[key].email;
    const name = data[key].nombre;

    if (email) { 
      if (emailCounts[email]) {
        emailCounts[email]++;
      } else {
        emailCounts[email] = 1;
        nombres[email] = name; // Guardar el nombre asociado al correo
      }
    }
  });

  // Generar el resumen
  let resumenHTML = '';
  for (const email in emailCounts) {
    resumenHTML += `<p><span>${nombres[email]}</span>: ${emailCounts[email]} solicitudes</p>`;
  }
  resumenContainer.innerHTML = resumenHTML;
  
  // Generar los cards
  Object.keys(data).forEach(key => {
    const item = data[key];
    const nombre = item.nombre;
    const category = item.categorySelect;
    const message = item.mensaje || '';

    container.innerHTML += `
      <div class="card m-2" style="width: 18rem;">
          <img class="card-img-top" src="./images/my-images/klashzend-1.jpg" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">${message}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Nombre: ${nombre}</li>
              <li class="list-group-item">Categoría: ${category}</li>
            </ul>
          </div>
        </div>
    `;
  });

})()
.catch(error => {
  console.error('Error:', error);
});
