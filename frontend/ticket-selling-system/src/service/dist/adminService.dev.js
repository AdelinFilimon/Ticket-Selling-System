"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getAllShows;
exports.adminService = void 0;

var _authHeader = require("../authentication/auth-header");

var _csrftoken = require("../authentication/csrftoken");

var _downloadjs = _interopRequireDefault(require("downloadjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adminService = {
  getAllCashiers: getAllCashiers,
  getAllShows: getAllShows,
  addCashier: addCashier,
  deleteCashier: deleteCashier,
  addShow: addShow,
  deleteShow: deleteShow,
  updateCashier: updateCashier,
  getAllArtists: getAllArtists,
  getAllGenres: getAllGenres,
  updateShow: updateShow,
  downloadTickets: downloadTickets
};
exports.adminService = adminService;

function getAllCashiers() {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)()
    },
    mode: "cors"
  };
  return fetch('http://localhost:8080/cashiers', requestOptions).then(function (response) {
    return response.json();
  });
}

function getAllShows() {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)()
    },
    mode: "cors"
  };
  return fetch('http://localhost:8080/shows', requestOptions).then(function (response) {
    return response.json();
  });
}

function addCashier(formdata) {
  var object = {};
  formdata.forEach(function (value, key) {
    object[key] = value;
  });
  delete object['password2'];
  object['role'] = "CASHIER";
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
  return fetch("http://localhost:8080/cashiers/add", requestOptions);
}

function deleteCashier(id) {
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
  return fetch("http://localhost:8080/cashiers/" + id, requestOptions);
}

function addShow(data) {
  var json = JSON.stringify(data);
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
  return fetch("http://localhost:8080/shows/add", requestOptions);
}

function deleteShow(id) {
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
  return fetch("http://localhost:8080/shows/" + id, requestOptions);
}

function updateCashier(id, formdata) {
  var object = {};
  formdata.forEach(function (value, key) {
    object[key] = value;
  });
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
  return fetch("http://localhost:8080/cashiers/" + id, requestOptions);
}

function getAllArtists() {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)()
    },
    mode: "cors"
  };
  return fetch('http://localhost:8080/artists', requestOptions).then(function (response) {
    return response.json();
  });
}

function getAllGenres() {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': (0, _authHeader.authHeader)()
    },
    mode: "cors"
  };
  return fetch('http://localhost:8080/genres', requestOptions).then(function (response) {
    return response.json();
  });
}

function updateShow(id, data) {
  var json = JSON.stringify(data);
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
  return fetch("http://localhost:8080/shows/" + id, requestOptions);
}

function downloadTickets(id) {
  var filename = "SoldTicketsAtShowID" + id;
  fetch("http://localhost:8080/shows/" + id + "/download_tickets", {
    headers: {
      'Authorization': (0, _authHeader.authHeader)(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': _csrftoken.cookie
    },
    method: 'GET',
    mode: 'cors'
  }).then(function (response) {
    return response.blob();
  }).then(function (file) {
    (0, _downloadjs["default"])(file, filename, "application/octet-stream");
  });
}