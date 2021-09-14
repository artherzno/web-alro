export const getAccount = () => {

    const provinceid = localStorage.getItem('provinceid')
    const cUsername = localStorage.getItem('cUsername')
    const token = localStorage.getItem('token')

    return {
        provinceID: provinceid,
        username: cUsername,
        token: token
    }
}