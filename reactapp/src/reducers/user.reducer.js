export default function user(user = {}, action) {
    if (action.type === 'LOGIN_USER') {
        let newUser = {...user};
        newUser = action.payload;
        return newUser;
    } else if (action.type === 'LOGOUT_USER') {
        let newUser = {};
        return newUser;
    } else {
        return user;
    }
}