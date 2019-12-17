export function authHeader() {
    // return authorization header with jwt token
    let user = localStorage.getItem('user');
    if (user ) {
        return { 'Authorization': 'Token ' + user};
    } else {
        return {};
    }
}