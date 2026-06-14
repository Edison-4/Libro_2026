// ==========================================
// 1. LÓGICA DE LA PILA DE CARTAS (STACK)
// ==========================================
let pages = Array.from(document.querySelectorAll('.page'));

function actualizarPila() {
    pages.forEach((page, index) => {
        // Orden de capas: la primera (index 0) va hasta arriba
        page.style.zIndex = pages.length - index;

        if (index === 0) {
            // Carta principal (la que ves de frente)
            page.style.transform = `scale(1) translateY(0)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'auto'; // Se puede tocar
        } else if (index === 1) {
            // Segunda carta (asoma por detrás)
            page.style.transform = `scale(0.95) translateY(20px)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'none'; // No se puede tocar para no hacer interferencia
        } else if (index === 2) {
            // Tercera carta (asoma más abajo)
            page.style.transform = `scale(0.9) translateY(40px)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'none';
        } else {
            // El resto de cartas están ocultas detrás
            page.style.transform = `scale(0.85) translateY(60px)`;
            page.style.opacity = '0';
            page.style.pointerEvents = 'none';
        }
    });
}

// Darle el efecto a cada tarjeta al hacer clic
pages.forEach(page => {
    page.addEventListener('click', (e) => {
        
        // ¡IMPORTANTE! Si el usuario hizo clic en el botón de "Copiar", no cambiamos de página
        if (e.target.closest('.copy-btn')) return;

        // Solo la carta que está hasta arriba (índice 0) puede interactuar
        if (page !== pages[0]) return;

        // 1. Le agregamos la clase que hace volar la carta hacia la derecha
        page.classList.add('swipe-out');

        // 2. Esperamos a que termine la animación (400ms) y luego reordenamos
        setTimeout(() => {
            page.classList.remove('swipe-out');
            
            // Movemos el primer elemento de la lista al final (bucle infinito)
            pages.push(pages.shift());
            
            // Re-calculamos las posiciones visuales
            actualizarPila();
        }, 400); 
    });
});

// Arrancamos la vista inicial
actualizarPila();


// ==========================================
// 2. CONFIGURACIÓN DEL BOTÓN DE COPIAR Y TOAST
// ==========================================
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');
let toastTimeout;

copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.page');
        const text = card.querySelector('.quote-text').innerText;
        const author = card.querySelector('.quote-author').innerText;
        
        const textoCompleto = `${text}\n${author}`;

        navigator.clipboard.writeText(textoCompleto).then(() => {
            toast.classList.add('show');
            clearTimeout(toastTimeout);
            
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);

        }).catch(err => console.error('Error al copiar: ', err));
    });
});

/*
// ==========================================
// 3. AUDIO (Comentado para futuro uso)
// ==========================================
const baseAudio = new Audio('pagina.mp3'); 
// Puedes llamar a `baseAudio.cloneNode().play()` dentro del setTimeout de arriba si luego quieres sonido.
*/