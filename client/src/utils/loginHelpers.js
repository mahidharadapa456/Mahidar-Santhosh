export function setUserToLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromStorage() {
    return JSON.parse(localStorage.getItem("user")) || null
}

export function removeUserFromStorage() {
    if (getUserFromStorage()) {
       localStorage.removeItem("user")
    }
}