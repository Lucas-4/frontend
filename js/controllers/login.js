import host from '../host.js';

document.querySelector('button').addEventListener('click', () => {
    const body = {};
    body.email = document.querySelector('#email').value;
    body.password = document.querySelector('#password').value;
    fetch(host + '/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if(res.status==401){
            console.log(401);
        }else{
            window.location.href = 'home.html';
        }
    });
})
