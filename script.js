// ==========================================
// 1. LÓGICA DE LA PILA DE CARTAS (STACK)
// ==========================================
let pages = Array.from(document.querySelectorAll('.page'));

function actualizarPila() {
    pages.forEach((page, index) => {
        // Orden de capas: la primera (index 0) va hasta arriba
        page.style.zIndex = pages.length - index;

        if (index === 0) {
            page.style.transform = `scale(1) translateY(0)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'auto'; // Se puede tocar
        } else if (index === 1) {
            page.style.transform = `scale(0.95) translateY(20px)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'none'; // No se puede tocar
        } else if (index === 2) {
            page.style.transform = `scale(0.9) translateY(40px)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'none';
        } else {
            page.style.transform = `scale(0.85) translateY(60px)`;
            page.style.opacity = '0';
            page.style.pointerEvents = 'none';
        }
    });
}

// Lógica para avanzar a la siguiente tarjeta
pages.forEach(page => {
    page.addEventListener('click', (e) => {
        // Evitamos avanzar si hicieron clic en el botón de "Copiar"
        if (e.target.closest('.copy-btn')) return;

        // Solo la carta de hasta arriba avanza
        if (page !== pages[0]) return;

        // Animación de salida
        page.classList.add('swipe-out');

        setTimeout(() => {
            page.classList.remove('swipe-out');
            
            // Movemos la primera carta al final
            pages.push(pages.shift());
            actualizarPila();
        }, 400); 
    });
});

// Lógica para retroceder a la tarjeta anterior
const btnBack = document.getElementById('btn-back');

btnBack.addEventListener('click', () => {
    // Tomamos la carta que está al fondo del arreglo (la última que pasamos)
    const cartaAnterior = pages.pop();
    
    // La colocamos al principio del arreglo
    pages.unshift(cartaAnterior);

    // Truco visual: la ponemos en posición de "salida" sin animación 
    // para que parezca que viene regresando desde la derecha
    cartaAnterior.style.transition = 'none';
    cartaAnterior.classList.add('swipe-out');

    actualizarPila();

    // Forzamos al navegador a procesar la posición invisible antes de animarla
    void cartaAnterior.offsetWidth;

    // Le devolvemos su transición y la traemos al centro
    cartaAnterior.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    cartaAnterior.classList.remove('swipe-out');
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
// baseAudio.cloneNode().play();
*/