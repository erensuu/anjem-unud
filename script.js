
const WA_GROUP = 'NYURUH YUK';

const waUrl = (text) => `https://chat.whatsapp.com/Kjsj1eLt6Gi3Tu5qyz4yFH?text=${encodeURIComponent(text)}`;

document.getElementById('tahun').textContent = new Date().getFullYear();

// Menu mobile
const links = document.getElementById('links');
document.getElementById('burger').addEventListener('click', () => links.classList.toggle('open'));
links.addEventListener('click', (e) => { if (e.target.tagName === 'A') links.classList.remove('open'); });

// Animasi muncul saat di-scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

const loader = document.getElementById('loader');
const mulai = Date.now();
function tutupLoader() {
    const sisa = Math.max(0,700 - (Date.now() - mulai));
    setTimeout(() => loader.classList.add('hide'), sisa);
}
window.addEventListener('load', tutupLoader);
setTimeout(tutupLoader, 4000);

//ini zoom in zoom out poster
const posterImg = document.getElementById('posterImg');
const lightbox = document.getElementById('lightbox');
if (posterImg && lightbox) {
    const big = lightbox.querySelector('img');
    posterImg.addEventListener('click', () => {
        big.src = posterImg.src;
        lightbox.classList.add('open');
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('open');
    });
}

//Pesan COMING SOON untuk link ig
const toast = document.getElementById('toast');
let toastTimer;
document.querySelectorAll('[data-soon').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        if(!toast) return;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'),2000);
    });
});

const logo = document.querySelector('nav .logo' );
if(logo){
    logo.addEventListener('click', () => {
        const menu = document.getElementById('links');
        if (menu) menu.classList.remove('open');
    });
}
