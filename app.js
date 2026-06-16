// CartShare App.js - Fixed Version
const STORAGE_KEYS = {
    USERS: 'cartshare_users',
    CURRENT_USER: 'cartshare_current_user',
    CARTS: 'cartshare_carts',
    CART_ITEMS: 'cartshare_cart_items',
    INVITES: 'cartshare_invites'
};

function getUsers() {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'index.html';
}
