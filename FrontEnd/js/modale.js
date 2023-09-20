const openModale = document.querySelector('.modifProjet');
const closeModale = document.querySelector('.modal-close');
const modaleContainer = document.querySelector('.modal-container');
const modaleBackground = document.querySelector('.backgroundModal');
const galleryList = document.querySelector('.galleryList');
const ajoutForm = document.getElementById('ajoutPhotos');
const modaleGallery = document.querySelector('.modal');
const modaleGallery1 = document.querySelector('.modal1');
const imageContainer = document.querySelector('.imgDisplay');
const inputContainer = document.querySelector('.inputDisplay');
import { getFilters, getWorks } from "../js/api.js";
import { displayWorks } from "../js/main.js";

// Fonction pour l'ouverture de la modale de gestion des projets
export const openModal = () => {
    openModale.addEventListener('click', (e) => {
        e.preventDefault();

        modaleBackground.style.display = 'block'; 

        modaleContainer.style.display = 'block';

        modaleGallery.style.display = 'block';

        modaleGallery1.style.display = 'none';
    });
};

// Fonction pour la fermeture de la modale de gestion des projets
export const closeModal = () => {   
    closeModale.addEventListener('click', (e) => {
        e.preventDefault();

        modaleContainer.style.display = 'none';
    });

    modaleBackground.addEventListener('click', (e) => {
        e.preventDefault();

        console.log("click")
        if (e.target === modaleBackground) {

            modaleBackground.style.display = 'none';

            modaleContainer.style.display = 'none';
        }
    });
};

// Fonction pour l'affichage des projets dans l'accueil
// Et ajout des boutons de suppression et deplacement
export const displayImages = async (data) => {
    galleryList.innerHTML = "";

    data.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const a =  document.createElement('a');
        const aCross =  document.createElement('a');
        const editTrash = document.createElement('i');
        const editCross = document.createElement('i');

        img.src = work.imageUrl; 
        img.alt = work.title; 

        a.classList.add('trashBtn');
        a.setAttribute('id', work.id);
        a.setAttribute('data-id', work.id);

        figure.setAttribute('data-id', work.id);
        figure.classList.add('trashFigure');

        editTrash.classList.add('fas', 'fa', 'fa-light', 'fa-trash-can');
        
        
        if (work.id === 1) {
            aCross.href = "#";

            aCross.classList.add('crossBtn');

            editCross.classList.add('fa', 'fa-solid', 'fa-up-down-left-right');

            aCross.appendChild(editCross);

            figure.appendChild(aCross);
        }
                
        figcaption.textContent = "éditer";

        a.appendChild(editTrash);
        figure.appendChild(a);
        figure.appendChild(img); 
        figure.appendChild(figcaption);
        galleryList.appendChild(figure); 
    });
};

// Fonction pour la gestion de l'affichage de la modale d'ajout d'image
export const modalPhotos = () => { 
    const modaleBack = document.querySelector('.modal-back');
    const closeModaleImg = document.querySelector('.modal-close1');
    const fileInput = document.getElementById('imageInput');

    ajoutForm.addEventListener('click', (e) => {
        e.preventDefault();

        fileInput.value = '';

        modaleGallery.style.display = 'none';

        modaleGallery1.style.display = 'block';

        imageContainer.style.display = 'none';

        inputContainer.style.display = 'flex';

    });

    modaleBack.addEventListener('click', (e) => {
        e.preventDefault();

        fileInput.value = '';

        modaleGallery.style.display = 'block';

        modaleGallery1.style.display = 'none';

        imageContainer.style.display = 'none';

        inputContainer.style.display = 'flex';
    });

    closeModaleImg.addEventListener('click', (e) => {
        e.preventDefault();

        fileInput.value = '';

        modaleContainer.style.display = 'none';

        imageContainer.style.display = 'none';

        inputContainer.style.display = 'flex';
    });
};

// Fonction pour la gestion des ajouts d'images 
// Et d'affichage de l'image ajouter
export const ajoutImg = () => {   
    const ajoutbtn = document.getElementById('image-upload');
    const fileInput = document.getElementById('imageInput');

    fileInput.value = '';

    ajoutbtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        fileInput.click();
    
        const filesData = fileInput.files;
        console.log(filesData);
    
        console.log('cliker');
    });

    fileInput.addEventListener('change', (e) => {
        const fileData = e.target.files[0];
        const imageContainer = document.querySelector('.imgDisplay');
        const inputContainer = document.querySelector('.inputDisplay');
    
        if (fileData) {
            imageContainer.style.display = 'block';
            inputContainer.style.display = 'none';

            // Créez un objet FileReader
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const image = new Image();

                image.src = e.target.result;
                image.classList.add('imgHidden');
    
                imageContainer.innerHTML = '';
                imageContainer.appendChild(image);
            };
    
            // Commencez à lire le contenu du fichier en tant qu'URL de données (DataURL)
            reader.readAsDataURL(fileData);
        }
    });

};

// Fonction pour récuperer les categories depuis l'api et 
// Les ajouters a l'élement select 
export const selectCategorys = async () => { 
    const categorySelect = document.getElementById('category');

    const data = await getFilters();

    data.forEach(category => {
        const option = document.createElement('option');
        
        option.value = category.id;

        option.text = category.name;

        categorySelect.appendChild(option); 
    });
};

// Fonction pour vérifier que tout les champs sont bien remplie
// Et gestion d'envoie du formulaire
export const conditionRemplies = async () => { 
    const fileInput = document.getElementById('imageInput');
    const titreInput = document.querySelector('.addWorkTitle');
    const categoryInput = document.querySelector('.selectCategory');
    const btnInput = document.getElementById('confirmAddWork');
    const formConfirm = document.querySelector('.addWorkForm');
    const errorMessage1 = document.getElementById('errorMessage1');

    function verifierChamps() {
        if (fileInput.value !== "" && titreInput.value !== "" && categoryInput.value !== "") {
            btnInput.removeAttribute("disabled");
            btnInput.classList.add('btn-green');
            errorMessage1.style.display = 'none';
        } else {
            btnInput.setAttribute("disabled", "disabled");
            btnInput.classList.remove('btn-green');
            errorMessage1.style.display = 'block';
            errorMessage1.textContent = 'Tous les champs doivent être renseignés pour continuer.';
            setTimeout(function() {
                errorMessage1.textContent = ''; // Effacez le contenu du message d'erreur
            }, 5000);
        }
    }

    fileInput.addEventListener('change', verifierChamps);
    titreInput.addEventListener('input', verifierChamps);
    categoryInput.addEventListener('change', verifierChamps);

    formConfirm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const successMessage = document.getElementById('successMessage');
        const apiUrlWork = 'http://localhost:5678/api/works';
        const token = localStorage.getItem('token');
    
        const formData = new FormData();
        
        formData.append('image', fileInput.files[0]);
        formData.append('title', titreInput.value);
        formData.append('category', categoryInput.value);

        try {
            const response = await fetch(`${apiUrlWork}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData //Corps de la requête
            });

            if (response.ok) {  
                successMessage.textContent = 'Envoie Réussi';
                setTimeout(function() {
                    successMessage.textContent = '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                }, 5000);

                modaleGallery.style.display = 'block';

                modaleGallery1.style.display = 'none';

                const data = await getWorks();
                displayImages(data);

                const data1 = await getWorks();
                displayWorks(data1);

            } else {
                console.log('erreur d\'envoie');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    });
};

// Fonction pour la suppréssion de projet 
// Et mise à jours des galleries photos
export const deleteImg = () => {
    const galleryList = document.querySelector('.galleryList');
    const successMessage = document.getElementById('successMessage');
    console.log(galleryList)

    
    galleryList.addEventListener('click', async (e) => {
        e.preventDefault();
    
        const trashBtn = e.target.closest('.trashBtn');
    
        if (trashBtn) {
            const apiUrl1 = 'http://localhost:5678/api/works';
            const id = trashBtn.getAttribute('data-id');
            const token = localStorage.getItem('token');
    
            console.log(id);
            console.log(token);
    
            try {
                const response1 = await fetch(`${apiUrl1}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                console.log(response1);
    
                if (response1.ok) {
                    successMessage.textContent = 'Suppression réussie';
                    setTimeout(function() {
                        successMessage.textContent = '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                    }, 5000);

                    const data = await getWorks();
                    displayImages(data);
    
                    const data1 = await getWorks();
                    displayWorks(data1);
                } else {
                    console.log('Erreur de suppression');
                }
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        }
    });
};