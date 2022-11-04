import host from '../host.js';
import postRender from './postRender.js';

window.addEventListener('load', async () => {
    const param = new URLSearchParams(window.location.search);
    const id = parseInt(param.get('id'));
    const res = await fetch(host + `/posts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const posts = await res.json();
    postRender(posts);
})