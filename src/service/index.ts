import axios from 'axios';

export const contactSend = axios.create({
    baseURL: 'https://webhook.site/03f39df9-7bde-4f2e-ae57-6f437dd3bf29'
})

export const getData = axios.create({
    baseURL: 'https://accenture-server-rn.herokuapp.com/'
})