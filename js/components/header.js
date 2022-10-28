import host from '../host.js';

document.querySelector('header').innerHTML = `
    <div id="logo">REDDIT</div>
        <input type="text" placeholder="Search">
    <div id="profile"></div>
`;


async function getUser() {

    const res = await fetch(host + '/users/me', {
        method: 'GET',
        credentials: 'include'
    })

    const data = await res.json();

    if (res.status == 401) {
        return `<a href="/views/login.html">login</a>
        <a href="/views/signup.html">signup</a>`;
    } else {
        return `${data.name} <a id="logout" href="home.html">logout</a> <a href="createPost.html">Create Post</a>`;
    }

}


window.addEventListener('load', async () => {
    document.body.style.visibility = 'hidden';
    document.querySelector('#profile').innerHTML = await getUser();
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
