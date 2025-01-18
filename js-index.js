const infoDiv = document.getElementById('info');
const respuesta_hilo_principal = document.getElementById("response");
const form = document.querySelector(".form");
const email_render = document.querySelector(".email_obtenido");
const darkmode = document.querySelector('.darkmode')
const  lightmode= document.querySelector(".ligthmode")
const container_general = document.querySelector(".container")


// Manejador del evento `submit` del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    const data = new FormData(form); // Obtén los datos del formulario
    const [email] = [...data.values()]; // Extrae el valor del campo email
    email_render.textContent = ""; // Resetea el contenido antes de validar

    if (!email || email.trim().length === 0) {
        email_render.textContent = "El email está vacío";
        return; // Detén la ejecución si el email está vacío
    }

    // Si el email no está vacío, muestra el valor
   enviar_email(email)
});

// Función para manejar la lógica de envío del email
const enviar_email = async (email) => {
    try {
        // Llama a la función `user` expuesta en el preload.js
        const result = await window.api.user(email);
        
        if (result.error) {
            email_render.textContent = result.error;// Muestra el mensaje de respuesta si no se encuentra usuario
        }

        return email_render.textContent = `Usuario: ${result.email}, Puesto: ${result.puesto}`; // Devuelve el usuario encontrado o `null` si no existe
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw error; // Lanza el error para que el manejador de errores lo capture
    }
};



container_general.addEventListener('click', async (e) => {
    if (e.target.matches('.darkmode')) {
      const isDarkMode = await window.api.toggle();
      alert(`El modo oscuro está ${isDarkMode ? 'activado' : 'desactivado'}`);
      document.body.classList.toggle('dark-mode', isDarkMode);
    }
  
    if (e.target.matches('.lightmode')) {
      await window.api.system();
      alert('Sincronizado con el tema del sistema');
      document.body.classList.remove('dark-mode'); // Remueve cualquier tema forzado
    }
  });








