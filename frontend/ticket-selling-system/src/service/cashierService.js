import {authHeader} from '../authentication/auth-header'
import {cookie} from '../authentication/csrftoken'

export const cashierService = {
    getAllTickets,
    addTicket,
    deleteTicket,
    updateTicket
}

function getAllTickets() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
        },
        mode: "cors",
    }

    return fetch('http://localhost:8080/tickets', requestOptions)
            .then(response => response.json())
}

function addTicket(object) {
    let json = JSON.stringify(object)
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
    }

    return fetch("http://localhost:8080/tickets/add", requestOptions)
}

function deleteTicket(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authHeader(),
            'X-CSRFTOKEN': cookie
        },
        mode: "cors",
    }

    return fetch("http://localhost:8080/tickets/" + id, requestOptions)
}

function updateTicket(id, object) {

    let json = JSON.stringify(object)
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
    }

    return fetch("http://localhost:8080/tickets/" + id, requestOptions)
}