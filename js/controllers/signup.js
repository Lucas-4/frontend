import host from '../host.js';

document.querySelector('#signup').addEventListener('click', async () => {
    const body = {};
    body.name = document.querySelector('#name').value;
    body.email = document.querySelector('#email').value;
    body.password = document.querySelector('#password').value;
    console.log(body);
    const res = await fetch(host + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })
})