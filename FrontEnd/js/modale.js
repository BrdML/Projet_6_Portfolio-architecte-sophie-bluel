const openModale = document.querySelector('.modifProjet');
const closeModale = document.querySelector('.modal-close');
const galleryList = document.querySelector('.galleryList');
const ajoutForm = document.querySelector('.ajout-post');


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

        a.href = "#";
        a.classList.add('trashBtn');

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


const init = async () => {
    displayImages()
}
init();