const adminBar = document.querySelector('.admin-header');
const displayLogin = document.querySelector('.login');
const displayLogout = document.querySelector('.logout');
const filters = document.querySelector('.filter');
const modifImage = document.querySelector('.modifImg');
const modifProjet = document.querySelector('.modifProjet');


export const checkConnected = () => {
    let elements = "";
    if (localStorage.getItem('token')) {
        adminBar.style.display = 'flex';

        displayLogin.style.display = 'none';

        displayLogout.style.display = 'block';

        filters.style.visibility = 'hidden';

        modifImage.style.display = 'block';

        modifProjet.style.display = 'block';
    }
    else {
        adminBar.style.display = 'none';

        displayLogin.style.display = 'block';

        displayLogout.style.display = 'none';

        modifImage.style.display = 'none';

        modifProjet.style.display = 'none';
    }
}

export const logOut = () => {

    displayLogout.addEventListener("click",() =>{

        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("token");
    });

}