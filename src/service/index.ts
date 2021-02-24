import axios from 'axios';

export const contactSend = axios.create({
    baseURL: 'https://webhook.site/bacbf635-3749-437c-a703-82e77e146816'
})

export const getData = axios.create({
    baseURL: 'https://accenture-server-rn.herokuapp.com/'
})