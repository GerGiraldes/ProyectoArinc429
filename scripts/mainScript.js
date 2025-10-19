const grupoSelect = document.getElementById('grupo');
    const instrumentoSelect = document.getElementById('instrumento');
    const display = document.getElementById('contenedor');
    const valuesContainer = document.getElementById('values');

    const instrumentos = {
      vuelo: [
        "Anemometro",
        "Horizonte artificial",
        "Altímetro",
        "Coordinador de virajes",
        "Indicador de rumbo",
        "Variometro"
      ],
      motor: [
        "Cantidad de combustible",
        "Flujo de combustible",
        "Presión de combustible",
        "Presión de aceite",
        "Presión de entrada",
        "Tacómetro",
        "Temperatura de aceite",
        "Temperatura de gases de escape",
        "Temperatura del carburador"
      ],
      navegacion: [
        "VOR",
        "ADF",
        "HSI",
      ]
    };
    function normalizeString(str) {
  return String(str || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .toLowerCase()
    .replace(/\s+/g, ''); // quitar espacios
}

    
    // Manejar selección de grupo
    grupoSelect.addEventListener('change', () => {
  const grupo = grupoSelect.value;
  instrumentoSelect.innerHTML = '<option value="">Seleccione Instrumento</option>';
  if (grupo && instrumentos[grupo]) {
    instrumentos[grupo].forEach(inst => {
      const opt = document.createElement('option');
      opt.value = inst;
      opt.textContent = inst;
      instrumentoSelect.appendChild(opt);
    });
    instrumentoSelect.disabled = false;
  } else {
    instrumentoSelect.disabled = true;
  }
  display.textContent = 'Seleccione un instrumento';
});

// Mostrar imagen al seleccionar instrumento
instrumentoSelect.addEventListener('change', () => {
  const instrumento = instrumentoSelect.value;
  if (instrumento) {
    // Normalizar el nombre para el archivo (sin tildes, minúsculas, sin espacios)
    const nombreArchivo = instrumento
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar tildes
      .toLowerCase()
      .replace(/\s+/g, ''); // quitar espacios

    // Normalizar el grupo para usarlo como carpeta
    const grupoCarpeta = normalizeString(grupoSelect.value);

    display.innerHTML = `
  <a href="instrumentos/paginas/${grupoCarpeta}/${nombreArchivo}.html" target="_blank" style="text-decoration:none;">
    <img src="instrumentos/fotos/${nombreArchivo}.jpg" alt="${instrumento}" style="max-width:100%;max-height:250px;display:block;margin:0 auto 12px auto;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
  </a>
`;
  } else {
    display.textContent = 'Seleccione un instrumento';
  }
});
const botonVolver = document.querySelector('.boton');
if (botonVolver) {
  botonVolver.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
  // accesibilidad: Enter / Space
  botonVolver.setAttribute('tabindex', '0');
  botonVolver.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = '../index.html';
    }
  });
}