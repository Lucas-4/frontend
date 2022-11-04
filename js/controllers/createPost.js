import host from '../host.js';

window.addEventListener('load', async () => {
    const res = await fetch(host + '/subreddits', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const subreddits = await res.json();
    console.log(subreddits);
    const subredditSelect = document.querySelector('#subreddit')
    for (let subreddit of subreddits) {
        subredditSelect.innerHTML += `<option value="${subreddit.name}">r/${subreddit.name}</option>`
    }

    document.querySelector('#submit').addEventListener('click', async () => {
        const post = {};
        post.title = document.querySelector('#title').value;
        post.content = document.querySelector('#content').value;
        for (let subreddit of subreddits) {
            if (subreddit.name == document.querySelector('#subreddit').value) {
                post.subreddit_id = subreddit.id;
            }
        }

        const res = await fetch(host + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(post)
        })
    })
})