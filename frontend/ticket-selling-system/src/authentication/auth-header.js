export function authHeader() {

    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.authdata) {
        return 'Basic ' + user.authdata ;
    } else {
        return null;
    }
}