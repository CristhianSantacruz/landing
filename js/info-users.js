(async () => {
  const response = await fetch("https://proyecto-example-web-default-rtdb.firebaseio.com/collection.json");
  const data = await response.json();

  console.log("Datos:", data);

  const container = document.getElementById("tarjetas-container");
  container.innerHTML = ''; 
  const resumenContainer = document.getElementById("resumen-container")

  const emailCounts = {};
  Object.keys(data).forEach(key => {
    const email = data[key].email;
    if (email) { 
      if (emailCounts[email]) {
        emailCounts[email]++;
      } else {
        emailCounts[email] = 1;
      }
    }
  });


 // Generar el resumen
 let resumenHTML = '';
 for (const email in emailCounts) {
    resumenHTML += `<p> <span> ${email} </span>: ${emailCounts[email]} solicitudes</p>`;
   
 }
 resumenContainer.innerHTML = resumenHTML;
  
  
  for (const key in data) {
      if (data.hasOwnProperty(key)) {
          const item = data[key];
          const nombre = item.nombre;
          const email = item.email;
          const phone = item.phone;
          const message = item.mensaje || '';
          const category = item.categorySelect;
          
          container.innerHTML += `
            <div class="card m-2" style="width: 18rem;">
              <img class="card-img-top" src="./images/my-images/klashzend-1.jpg" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title" id="h5email">${email}</h5>
                <p class="card-text">${message}</p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Nombre: ${nombre}</li>
                  <li class="list-group-item">Teléfono: ${phone}</li>
                  <li class="list-group-item">Categoría: ${category}</li>
                </ul>
              </div>
            </div>
          `;
      }
  }
})()
.catch(error => {
  console.error('Error:', error);
});
