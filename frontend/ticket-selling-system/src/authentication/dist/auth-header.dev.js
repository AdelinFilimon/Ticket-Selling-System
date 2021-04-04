"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authHeader = authHeader;

function authHeader() {
  var user = JSON.parse(sessionStorage.getItem('user'));

  if (user && user.authdata) {
    return 'Basic ' + user.authdata;
  } else {
    return null;
  }
}