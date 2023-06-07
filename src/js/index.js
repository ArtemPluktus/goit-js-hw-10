import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
    breedSl: document.querySelector(`.breed-select`),
    loaderEl: document.querySelector(`.loader`),
    errorEl: document.querySelector(`.error`),
    catIn: document.querySelector(`.cat-info`)
}

new SlimSelect({
    select: id = "selectElement"
})

const options = {
    headers: {
        'Authorization': `Bearer live_Hb9GdFY7EaxAUHctvlHbpH7jaYutGrwxmWdkOSlAYLrX9qIN7LDZxmtfH8fvtbH8`
    }
}

const breeds = [];
const keys = [];

function createOptions() {
    fetch(`https://api.thecatapi.com/v1/breeds`, options).then(response => response.json()).then(res => {
        for (let el of res) {
            const { name, reference_image_id } = el;
            breeds.push(name);
            keys.push(reference_image_id);
        };
        breeds.forEach((breed) => {
            const optionEl = document.createElement('option');
            let index = breeds.indexOf(breed);
            optionEl.value = keys[index];
            optionEl.textContent = breed;
            refs.breedSl.appendChild(optionEl);
        });

    })
}

createOptions();

function fetchBreeds(catId) {
    return fetch(`https://api.thecatapi.com/v1/images/${catId}`, options).then((res) => {
        if (!res.ok) {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            refs.catIn.style.display = "none";
            // refs.errorEl.style.display = "block";
            // refs.breedSl.style.display = "none";
        } else {
            refs.catIn.style.display = "flex";
            return res.json()
        }

    }).then(cat => {
        const main = cat.breeds[0];
        const photoCat = cat.url;
        const { name, description, temperament } = main;

        refs.catIn.innerHTML = `<img src="${photoCat}" alt="${name}" width="500" class="photo"/><div class="right"><h1 class="title">${name}</h1><p class="description">${description}</p><p class="temperament"><b>Temperement:</b> ${temperament}</p></div>`


    });
}

refs.breedSl.addEventListener('change', e => {
    const selectedBreedId = e.target.value;
    refs.errorEl.style.display = 'none';
    refs.loaderEl.style.display = 'block';
    refs.catIn.innerHTML = '';

    fetchBreeds(selectedBreedId)
        .then(() => {
            refs.loaderEl.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error:', error);
            refs.errorEl.style.display = 'block';
            refs.loaderEl.style.display = 'none';
        });
});