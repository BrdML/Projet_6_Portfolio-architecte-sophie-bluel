const apiUrl = 'http://localhost:5678/api/users/';
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');


const logIn = async () => {

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch(apiUrl + "login", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
          
            if (response.ok) {
                const data = await response.json();
                // console.log(data);


                localStorage.setItem('token', data.token);

                successMessage.textContent = 'Connexion réussi';
                window.location.replace("../index.html");
            } else {
                console.log('erreur');
                errorMessage.textContent = 'Identifiants invalides. Veuillez réessayer.';
            }

        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            errorMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer plus tard.';
        }
        
    });
}

logIn();