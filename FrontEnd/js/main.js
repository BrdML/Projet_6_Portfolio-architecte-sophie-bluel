import { getFilters, getWorks } from "../js/api.js"; 
import { checkConnected, logOut } from "../js/auth.js";
import {    displayImages, 
            openModal , 
            closeModal, 
            modalPhotos, 
            ajoutImg,
            selectCategorys,
            conditionRemplies,
            deleteImg
        } from "../js/modale.js";  


// Variables
const gallery = document.querySelector('.gallery');
const filters = document.querySelector('.filter');

// Fonction pour récuperer les categories pour les filtres
const displayFilters = (data) => {
    data.forEach(categorie => {
        const a = document.createElement('a');

        a.className = "filter__btn";
        a.setAttribute('id', categorie.id);
        a.textContent = categorie.name;

        filters.appendChild(a);
    });
};

// Fonction pour afficher les projets dans la galerie
export const displayWorks = async (data) => {
    gallery.innerHTML = "";

    data.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption'); 

        img.src = work.imageUrl; 
        img.alt = work.title; 
                
        figcaption.textContent = work.title;

        figure.appendChild(img); 
        figure.appendChild(figcaption);
        gallery.appendChild(figure); 
    });
};

// Fonction pour récuperer les projets en fonction du filtre
const udapteGalery = () => {
    const tous = document.querySelector('.filter__btn[id="0"]');
    const objets = document.querySelector('.filter__btn[id="1"]');
    const appartements = document.querySelector('.filter__btn[id="2"]');
    const hotel = document.querySelector('.filter__btn[id="3"]');
    const btnFilters = document.querySelectorAll('.filter__btn');

    tous.classList.add('active');
    
    btnFilters.forEach(button => {

        console.log(btnFilters)
        button.addEventListener('click', () => {

            btnFilters.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');
        });
    });


    tous.addEventListener('click', async () => {
         // console.log("Tous")
        const data = await getWorks();
        displayWorks(data);
    });

    objets.addEventListener('click', async () => {
        // console.log("Objets")
        const data = await getWorks();
        const result = data.filter((work) => work.category.id === 1);
        console.log(result);
        displayWorks(result);
    });
        
    appartements.addEventListener('click', async () => {
        // console.log("apparetements")
        const data = await getWorks();
        const result = data.filter((work) => work.category.id === 2);
        console.log(result);
        displayWorks(result);
    });

    hotel.addEventListener('click', async () => {
        // console.log('hotel')
        const data = await getWorks();
        const result = data.filter((work) => work.category.id === 3);
        console.log(result);
        displayWorks(result);
    });
};

const init = async () => {
    checkConnected();

    logOut();
    
    const data = await getFilters();
    console.log(data);
    displayFilters(data);

    const data1 = await getWorks();
    console.log(data1);
    displayWorks(data1);

    udapteGalery();

    const data2 = await getWorks();
    displayImages(data2);

    openModal();

    modalPhotos();
    
    ajoutImg();

    closeModal();

    selectCategorys();

    conditionRemplies();

    deleteImg()
}
init();