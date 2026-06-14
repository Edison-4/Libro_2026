// ==========================================
// 1. LÓGICA DE LA PILA DE CARTAS (STACK)
// ==========================================
let pages = Array.from(document.querySelectorAll('.page'));
const btnBack = document.getElementById('btn-back');

function actualizarPila() {
    pages.forEach((page, index) => {
        // Orden de capas
        page.style.zIndex = pages.length - index;

        if (index === 0) {
            page.style.transform = `scale(1) translateY(0)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'auto'; 
        } else if (index === 1) {
            page.style.transform = `scale(0.95) translateY(20px)`;
            page.style.opacity = '1';
            page.style.pointerEvents = 'none'; 
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

    // NUEVO: Verificamos si la carta que está hasta arriba es la Portada
    if (pages[0].classList.contains('cover-page')) {
        // Si es la portada, desactivamos el botón de volver
        btnBack.classList.add('disabled');
    } else {
        // Si es cualquier otra carta, lo reactivamos
        btnBack.classList.remove('disabled');
    }
}

// Lógica para avanzar a la siguiente tarjeta
pages.forEach(page => {
    page.addEventListener('click', (e) => {
        if (e.target.closest('.copy-btn')) return;
        if (page !== pages[0]) return;

        page.classList.add('swipe-out');

        setTimeout(() => {
            page.classList.remove('swipe-out');
            pages.push(pages.shift());
            actualizarPila();
        }, 400); 
    });
});

// Lógica para retroceder a la tarjeta anterior
btnBack.addEventListener('click', () => {
    // NUEVO: Si el botón tiene la clase 'disabled', cancelamos la acción
    if (btnBack.classList.contains('disabled')) return;

    const cartaAnterior = pages.pop();
    pages.unshift(cartaAnterior);

    cartaAnterior.style.transition = 'none';
    cartaAnterior.classList.add('swipe-out');

    actualizarPila();

    void cartaAnterior.offsetWidth;

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