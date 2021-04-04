"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

var _authHeader = require("../authentication/auth-header");

var _csrftoken = require("../components/csrftoken");

var userService = {
  login: login,
  logout: logout
};
exports.userService = userService;

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
            if (user !== "UNAUTHORIZED") {
              user.authdata = window.btoa(username + ':' + password);
              localStorage.setItem('user', JSON.stringify(user));
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
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then(function (text) {
    var data = text && JSON.parse(text);

    if (!response.ok) {
      data = "UNAUTHORIZED";
      logout();
    }

    return data;
  });
}