// ==========================================
// 1. CONFIGURACIÓN DEL SONIDO AL DESLIZAR
// (Actualmente comentado/desactivado para uso futuro)
// ==========================================

/*
const baseAudio = new Audio('pagina.mp3'); 
let isFirstLoad = true; 
let paginaActual = null;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!isFirstLoad && paginaActual !== entry.target) {
                paginaActual = entry.target;
                const sonidoClonado = baseAudio.cloneNode();
                sonidoClonado.play().catch(error => {
                    console.log("Haz clic en la página una vez para habilitar el sonido.");
                });
            } else if (isFirstLoad) {
                paginaActual = entry.target;
            }
        }
    });
}, {
    root: document.querySelector('.album-container'),
    threshold: 0.6 
});

document.querySelectorAll('.page').forEach(page => observer.observe(page));
setTimeout(() => { isFirstLoad = false; }, 200);
*/

// ==========================================
// 2. CONFIGURACIÓN DEL BOTÓN DE COPIAR
// ==========================================
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast'); // Capturamos el mensaje flotante

// Función para manejar los temporizadores del toast y evitar que se crucen si presionas varias veces
let toastTimeout;

copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Encontrar la tarjeta exacta donde se hizo clic
        const card = e.target.closest('.page');
        const text = card.querySelector('.quote-text').innerText;
        const author = card.querySelector('.quote-author').innerText;
        
        // Unir frase y autor
        const textoCompleto = `${text}\n${author}`;

        // Copiar al portapapeles
        navigator.clipboard.writeText(textoCompleto).then(() => {
            
            // Mostrar el mensaje flotante
            toast.classList.add('show');
            
            // Limpiar cualquier temporizador anterior por si el usuario presiona "Copiar" muy rápido
            clearTimeout(toastTimeout);
            
            // Ocultar el mensaje después de 2.5 segundos
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);

        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    });
});