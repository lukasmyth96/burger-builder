import axios from 'axios'

const instance = axios.create({
    baseURL: "https://react-burger-builder-6f45d.firebaseio.com/"
});

export default instance;