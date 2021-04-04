import {cookie} from '../authentication/csrftoken'

export const authService = {
    login, 
    logout, 
    isLoggedIn,
    getRole
}

async function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': cookie,
            'Accept': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({ username, password })
    };

    return await fetch('http://localhost:8080/auth', requestOptions)
    .then(handleResponse)
    .then(user => {
        if (user['id']) {
            user.authdata = window.btoa(username + ':' + password);
            sessionStorage.setItem("user", JSON.stringify(user));
        }
        return user;
    });       
}

function logout() {
    sessionStorage.removeItem("user");
}

function handleResponse(response) {
    return response.text().then(text => {
        let data = text && JSON.parse(text);
        if (!response.ok) {
            logout();
        }
        return data;
    });
}

function isLoggedIn() {
    if(sessionStorage.getItem('user')) return true;
    else return false;
}

function getRole() {
    if(sessionStorage.getItem('user')) {
        return JSON.parse(sessionStorage.getItem('user'))['role'];
    }
    else return null;
}