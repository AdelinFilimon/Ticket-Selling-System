import {authHeader} from '../authentication/auth-header'
import {cookie} from '../authentication/csrftoken'
import download from 'downloadjs';

export const adminService = {
    getAllCashiers,
    getAllShows,
    addCashier,
    deleteCashier,
    addShow,
    deleteShow,
    updateCashier,
    getAllArtists,
    getAllGenres,
    updateShow,
    downloadTickets
}

function getAllCashiers() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
        },
        mode: "cors",
    };

    return fetch('http://localhost:8080/cashiers', requestOptions)
            .then(response => response.json());
}

export default function getAllShows() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
        },
        mode: "cors",
    };

    return fetch('http://localhost:8080/shows', requestOptions)
            .then(response => response.json());
}

function addCashier(formdata) {

    let object = {};
    formdata.forEach(function(value, key){
    object[key] = value;
    });
    delete object['password2'];
    object['role'] = "CASHIER";
    let json = JSON.stringify(object);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie
        },
        mode: "cors",
        body: json
    };

    return fetch("http://localhost:8080/cashiers/add", requestOptions);
}

function deleteCashier(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie
        },
        mode: "cors",
    };

    return fetch("http://localhost:8080/cashiers/" + id, requestOptions);
}

function addShow(data) {
    let json = JSON.stringify(data);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie,
        },
        mode: "cors",
        body: json
    };
    return fetch("http://localhost:8080/shows/add", requestOptions);
}

function deleteShow(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie,
        },
        mode: "cors",
    };

    return fetch("http://localhost:8080/shows/" + id, requestOptions);
}

function updateCashier(id, formdata) {

    let object = {};
    formdata.forEach(function(value, key){
    object[key] = value;
    });
    let json = JSON.stringify(object);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie,
        },
        mode: "cors",
        body: json
    };

    return fetch("http://localhost:8080/cashiers/" + id, requestOptions);
}

function getAllArtists() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
        },
        mode: "cors",
    };

    return fetch('http://localhost:8080/artists', requestOptions)
            .then(response => response.json());    
}

function getAllGenres() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
        },
        mode: "cors",
    };

    return fetch('http://localhost:8080/genres', requestOptions)
            .then(response => response.json());    
}

function updateShow(id, data) {
    let json = JSON.stringify(data);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie,
        },
        mode: "cors",
        body: json
    };

    return fetch("http://localhost:8080/shows/" + id, requestOptions);
}

function downloadTickets(id) {
    const filename = "SoldTicketsAtShowID" + id;
    fetch("http://localhost:8080/shows/" + id + "/download_tickets", {
        headers: {
        'Authorization': authHeader(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': cookie,
        },
        method: 'GET',
        mode: 'cors',   
    }).then(response => response.blob())
    .then(file => {
        download(file, filename, "application/octet-stream");
    });  
}


