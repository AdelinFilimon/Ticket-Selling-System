"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authService = void 0;

var _csrftoken = require("../authentication/csrftoken");

var authService = {
  login: login,
  logout: logout,
  isLoggedIn: isLoggedIn,
  getRole: getRole
};
exports.authService = authService;

function login(username, password) {
  var requestOptions;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFTOKEN': _csrftoken.cookie,
              'Accept': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify({
              username: username,
              password: password
            })
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:8080/auth', requestOptions).then(handleResponse).then(function (user) {
            if (user['id']) {
              user.authdata = window.btoa(username + ':' + password);
              sessionStorage.setItem("user", JSON.stringify(user));
            }

            return user;
          }));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function logout() {
  sessionStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then(function (text) {
    var data = text && JSON.parse(text);

    if (!response.ok) {
      logout();
    }

    return data;
  });
}

function isLoggedIn() {
  if (sessionStorage.getItem('user')) return true;else return false;
}

function getRole() {
  if (sessionStorage.getItem('user')) {
    return JSON.parse(sessionStorage.getItem('user'))['role'];
  } else return null;
}