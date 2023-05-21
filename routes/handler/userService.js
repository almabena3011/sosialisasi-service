// userService.js
const axios = require('axios');
const { URL_SERVICE_USER } = process.env;
async function getUserById(id) {
    try {
        const response = await axios.get(`${URL_SERVICE_USER}/users/${id}`);
        if (!response.data) {
            throw new Error('User not found');
        }
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error('User service is not available');
        }
    }
}
module.exports = { getUserById };
