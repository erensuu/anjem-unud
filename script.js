
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
(function () {
    const road = document.getElementById('road');
    const svg = document.getElementById('roadSvg');
    const base = document.getElementById('roadBase');
    const dash = document.getElementById('roadDash');
    const scooter = document.getElementById('scooter');
    if (!road ||!svg ||!base ||!dash ||!scooter)return;

    let total = 0, ticking = false;

    function build(){
        const nav = document.getElementById('nav');
        const footer = document.querySelector('footer');
        const W = document.documentElement.clientWidth;
        const H = footer
            ? footer.offsetTop + footer.offsetHeight
            : document.body.scrollHeight;

        road.style.height = H + 'px';
        svg.setAttribute('width', W);
        svg.setAttribute('height', H);
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

        const mobile = W < 720;
        const m = mobile ? 16 : 90;
        const startY = nav ? nav.offsetHeight : 80;
        const endY = footer ? footer.offsetTop : H;
        const n = Math.max(3, Math.round((endY - startY) / (window.innerHeight * 0.9)));
        const step = (endY - startY) / n;

        let d = `M ${m} ${startY}`;
        for (let i = 1; i <= n; i++) {
            const x0 = ((i-1) % 2) ? W - m : m;
            const x1 = (i % 2) ? W - m : m;
            const y0 = startY + step * (i - 1);
            const y1 = startY + step * i;
            const ym = (y0 + y1) / 2;
            d += ` C ${x0} ${ym} ${x1} ${ym} ${x1} ${y1}`;
        }
        base.setAttribute('d', d);
        dash.setAttribute('d', d);
        base.style.strokeWidth = mobile ? 26 : 54;
        dash.style.strokeWidth = mobile ? 2 : 3;
        total = base.getTotalLength();
        update();
    }
    function update(){
        ticking = false;
        const target = window.scrollY + window.innerHeight * 0.6;
        let lo = 0, hi = total;
        for (let i = 0; i < 14; i++) {
            const mid = (lo + hi) / 2;
            if (base.getPointAtLength(mid).y < target) lo = mid; else hi = mid;
        }
        const p = base.getPointAtLength(hi);
        const p2 = base.getPointAtLength(Math.min(total, hi + 4));
        const flip = p2.x > p.x ? 1 : -1;
        scooter.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scaleX(${flip})`;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {ticking = true; requestAnimationFrame(update);}
    }, {pasive: true});
    window.addEventListener('resize', build);
    window.addEventListener('load', () => {build(); setTimeout(build, 600); });
    build();
})();