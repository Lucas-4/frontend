import host from '../host.js';

document.querySelector('header').innerHTML = `
    <a href="home.html"><img id="logo" src="reddit-logo.png"/></a>
    
        <input type="text" placeholder="Search">
    <div id="menu"></div>
`;


async function getUser() {

        const res = await fetch(host + '/users/me', {
            method: 'GET',
            credentials: 'include'
        })
    
        const data = await res.json();
    
        if (res.status == 401) {
            return `<a href="login.html">Login</a>
            <a href="signup.html">Signup</a>`;
        } else {
            return `<a href="createPost.html"><i class="bi bi-pen"></i>Create Post</a> <a id="logout" href="home.html">Logout</a> <i class="bi bi-person"></i>${data.name}`;
        }

}


window.addEventListener('load', async () => {
    document.body.style.visibility = 'hidden';
    document.querySelector('#menu').innerHTML = await getUser();
    document.body.style.visibility = 'visible';
    const logoutBtn = document.querySelector('#logout');
    if (!(logoutBtn == undefined))
        logoutBtn.addEventListener('click', () => {
            fetch(host + '/users/logout', {
                method: 'POST',
                credentials: 'include'
            })
        })
})
