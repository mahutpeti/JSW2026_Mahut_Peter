"use strict";

const kategoriak = document.querySelectorAll('.kategoria');
const kartyak = document.querySelectorAll('.kartyak');
const alcimek = document.querySelectorAll('.alcim');

function filterCategory(kat) {
    kartyak.forEach(k => {
        k.style.display = (kat === 'osszes' || k.dataset.kat === kat) ? 'grid' : 'none';
    });
    alcimek.forEach(a => {
        if (!a.dataset.kat) {
            a.style.display = 'block';
        } else {
            a.style.display = (kat === 'osszes' || a.dataset.kat === kat) ? 'block' : 'none';
        }
    });
    kategoriak.forEach(k => {
        k.classList.remove('aktiv');
        if (k.dataset.kat === kat) {
            k.classList.add('aktiv');
        }
    });
}

filterCategory('osszes');

kategoriak.forEach(k => {
    k.addEventListener('click', function() {
        filterCategory(this.dataset.kat);
    });
});

const form = document.getElementById('terfogatForm');
const dialog = document.getElementById('eredmenyDialog');
const dialogSzoveg = document.getElementById('dialogSzoveg');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const hossz = document.getElementById('hossz');
    const szelesseg = document.getElementById('szelesseg');
    const magassag = document.getElementById('magassag');

    let valid = true;
    [hossz, szelesseg, magassag].forEach(input => {
        if (!input.value || parseFloat(input.value) <= 0) {
            input.style.borderColor = 'red';
            valid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!valid) {
        alert('Kérem töltse ki az összes mezőt pozitív számmal!');
        return;
    }

    const h = parseFloat(hossz.value);
    const sz = parseFloat(szelesseg.value);
    const m = parseFloat(magassag.value);
    const terfogat = h * sz * m;
    dialogSzoveg.textContent = `A szükséges térkitöltő térfogata: ${terfogat} cm³`;

    dialog.showModal();

    hossz.value = '';
    szelesseg.value = '';
    magassag.value = '';
});