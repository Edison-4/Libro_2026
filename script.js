// ==========================================
// 1. LÓGICA DEL ÁLBUM Y PASO DE PÁGINAS
// ==========================================
const pages = document.querySelectorAll('.page');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageTurnSound = new Audio('pagina.mp3');

let currentIndex = 0; // Controla qué página estamos viendo

function updateBook() {
    // Detectamos si estamos en móvil (pantalla pequeña) o en PC
    const isMobile = window.innerWidth <= 768;
    const pagesToShow = isMobile ? 1 : 2; // Móvil muestra 1, PC muestra 2

    // Primero ocultamos todas las páginas
    pages.forEach(page => page.classList.remove('active'));

    // Mostramos las páginas que corresponden al índice actual
    if (pages[currentIndex]) {
        pages[currentIndex].classList.add('active');
    }
    
    // Si estamos en PC, mostramos también la página de la derecha
    if (!isMobile && pages[currentIndex + 1]) {
        pages[currentIndex + 1].classList.add('active');
    }

    // Apagamos los botones si llegamos al principio o al final
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex + pagesToShow >= pages.length;
}

function turnPage(forward) {
    const isMobile = window.innerWidth <= 768;
    const step = isMobile ? 1 : 2; // Avanzamos de 1 en 1, o de 2 en 2

    if (forward && currentIndex + step < pages.length) {
        currentIndex += step;
        playSound();
    } else if (!forward && currentIndex - step >= 0) {
        currentIndex -= step;
        playSound();
    }
    updateBook();
}

// Reproduce el sonido de la página
function playSound() {
    const clone = pageTurnSound.cloneNode();
    clone.play().catch(e => console.log('Haz clic en la página primero para habilitar el audio.'));
}

// Escuchar clics en las flechas
btnNext.addEventListener('click', () => turnPage(true));
btnPrev.addEventListener('click', () => turnPage(false));

// Recalcular si el usuario voltea el teléfono o redimensiona la ventana
window.addEventListener('resize', () => {
    updateBook();
});


// ==========================================
// 2. CONFIGURACIÓN DEL BOTÓN DE COPIAR
// ==========================================
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Buscamos el texto dentro del contenido de la tarjeta actual
        const content = e.target.closest('.page-content');
        const text = content.querySelector('.quote-text').innerText;
        const author = content.querySelector('.quote-author').innerText;
        
        const textoCompleto = `${text}\n${author}`;

        navigator.clipboard.writeText(textoCompleto).then(() => {
            const originalIcon = e.target.innerText;
            e.target.innerText = '✔️';
            
            setTimeout(() => {
                e.target.innerText = originalIcon;
            }, 2000);
        }).catch(err => console.error('Error al copiar: ', err));
    });
});

// Arrancar el álbum mostrando la primera página
updateBook();