// ==========================================
// 1. CONFIGURACIÓN DEL SONIDO AL DESLIZAR
// ==========================================
const baseAudio = new Audio('pagina.mp3'); 
let isFirstLoad = true; 
let paginaActual = null; // Guardará la tarjeta que estamos viendo actualmente

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Si la tarjeta ocupa al menos el 60% de la pantalla
        if (entry.isIntersecting) {
            
            // Verificamos que no sea la carga inicial y que sea una página diferente
            if (!isFirstLoad && paginaActual !== entry.target) {
                paginaActual = entry.target; // Actualizamos la página actual
                
                // Clonamos el audio para que los sonidos puedan superponerse si deslizas rápido
                const sonidoClonado = baseAudio.cloneNode();
                sonidoClonado.play().catch(error => {
                    console.log("Haz clic en la página una vez para habilitar el sonido.");
                });
            } else if (isFirstLoad) {
                // En la carga inicial, solo registramos cuál es la primera página sin hacer ruido
                paginaActual = entry.target;
            }
        }
    });
}, {
    root: document.querySelector('.album-container'),
    threshold: 0.6 
});

// Observar todas las tarjetas que existen en el HTML
document.querySelectorAll('.page').forEach(page => observer.observe(page));

// Desactivar el estado de carga inicial rápidamente
setTimeout(() => { isFirstLoad = false; }, 200);


// ==========================================
// 2. CONFIGURACIÓN DEL BOTÓN DE COPIAR
// ==========================================
const copyButtons = document.querySelectorAll('.copy-btn');

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
            const originalIcon = e.target.innerText;
            e.target.innerText = '✔️';
            
            // Devolver al icono original después de 2 segundos
            setTimeout(() => {
                e.target.innerText = originalIcon;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    });
});