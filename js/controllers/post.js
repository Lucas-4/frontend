import host from '../host.js';

window.addEventListener('load', async () => {
    const param = new URLSearchParams(window.location.search);
    const id = parseInt(param.get('id'));
    console.log(id);
    const res = await fetch(host + `/posts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const post = await res.json();
    console.log(post)
    document.querySelector('#post').innerHTML += `
        <div data-post-id="${post.id}" class="post">
            <h1 class="title">${post.title}</h1>
            <p class="content">${post.content}</p>
            <p class="created_date">${post.created_date}</p>
        </div>`
})