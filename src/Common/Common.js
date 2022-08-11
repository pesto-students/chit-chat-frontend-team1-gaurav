


const expired = () => {
    debugger;
    const JWTtoken = localStorage.getItem('token');

    const jwtPayload = JSON.parse(window.atob(JWTtoken.split('.')[1]))

    const tokenExpired = jwtPayload.exp >= Date.now();

    if(JWTtoken === '' || JWTtoken === undefined || JWTtoken === null || !tokenExpired) {
        return true;
    }
    else {
        return false;
    }


}


module.exports = expired;