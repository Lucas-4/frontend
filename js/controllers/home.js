import host from '../host.js';
import postRender from './postRender.js';

window.addEventListener('load', async () => {
    const res = await fetch(host + '/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const posts = await res.json();
    postRender(posts);
})