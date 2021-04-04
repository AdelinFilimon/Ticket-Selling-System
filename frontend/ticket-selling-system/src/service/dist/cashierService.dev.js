"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cashierService = void 0;

var _authHeader = require("../authentication/auth-header");

var _csrftoken = require("../authentication/csrftoken");

var cashierService = {
  getAllTickets: getAllTickets,
  addTicket: addTicket,
  deleteTicket: deleteTicket,
  updateTicket: updateTicket
};
exports.cashierService = cashierService;

function getAllTickets() {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)()
    },
    mode: "cors"
  };
  return fetch('http://localhost:8080/tickets', requestOptions).then(function (response) {
    return response.json();
  });
}

function addTicket(object) {
  var json = JSON.stringify(object);
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)(),
      'X-CSRFTOKEN': _csrftoken.cookie
    },
    mode: "cors",
    body: json
  };
  return fetch("http://localhost:8080/tickets/add", requestOptions);
}

function deleteTicket(id) {
  var requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)(),
      'X-CSRFTOKEN': _csrftoken.cookie
    },
    mode: "cors"
  };
  return fetch("http://localhost:8080/tickets/" + id, requestOptions);
}

function updateTicket(id, object) {
  var json = JSON.stringify(object);
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)(),
      'X-CSRFTOKEN': _csrftoken.cookie
    },
    mode: "cors",
    body: json
  };
  return fetch("http://localhost:8080/tickets/" + id, requestOptions);
}