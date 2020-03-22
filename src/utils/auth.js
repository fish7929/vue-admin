import { getStorageObject, isEmptyObject } from "./tools";

export function getCurrentUser() {
    const currentUser = getStorageObject("CURRENT_USER", window.sessionStorage);
    return currentUser;
}

export function getCurrentAuthority() {
    const currentUser = getCurrentUser();
    const currentAuth = [currentUser.authority || ''];
    return currentAuth;
}

export function check(authority) {
    const current = getCurrentAuthority();
    return current.some(item => authority.includes(item));
}

export function isLogin() {
    const currentUser = getCurrentUser();
    return currentUser && !isEmptyObject(currentUser);
}