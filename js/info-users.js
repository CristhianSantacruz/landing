(async () => {
  const response = await fetch("https://proyecto-example-web-default-rtdb.firebaseio.com/collection.json");
  const data = await response.json();

  console.log("Datos:", data);

  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = ''; // Limpiar cualquier contenido existente en la tabla

  for (const key in data) {
      if (data.hasOwnProperty(key)) {
          const item = data[key];
          const nombre = item.nombre;
          const email = item.email;
          const phone = item.phone;
          const message = item.mensaje || '';
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
              <td>${nombre}</td>
              <td>${email}</td>
              <td>${phone}</td>
              <td>${message}</td>
          `;

          // Agregar la nueva fila al tbody
          tableBody.appendChild(newRow);
      }
  }
})()
.catch(error => {
  console.error('Error:', error);
});
