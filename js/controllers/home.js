import host from '../host.js';

async function getPosts(){
    const res = await fetch(host + '/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const posts = await res.json();
    return posts;
}

function voteHandler(){
    const upvoteBtns = document.querySelectorAll('.upvote');

    for (let upvoteBtn of upvoteBtns) {
        upvoteBtn.addEventListener('click', async (e) => {
            //if downvote button is selected when trying to upvote, remove selection
            e.target.parentElement.querySelector('.downvote').classList.remove('downvoted');
            console.log(e.target.parentElement.parentElement.getAttribute('data-post-id'))
            //select upvote button
            e.target.classList.toggle('upvoted')

            if(e.target.classList.contains('upvoted')){
                //fetch upvote post
                const body = {
                    vote_value: 1,
                    post_id: parseInt(e.target.parentElement.parentElement.getAttribute('data-post-id'))
                }
                console.log('upvote')
                fetch(host + '/votes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(data => console.log(data));
            } else{
                //fetch delete upvote
                console.log('remove vote');
                const body = {
                    post_id: parseInt(e.target.parentElement.parentElement.getAttribute('data-post-id'))
                }
                fetch(host + '/votes', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',

                    body: JSON.stringify(body)
                }).then(res => res.json()).then(data => console.log(data));
            }            
        })
    }

    const downvoteBtns = document.querySelectorAll('.downvote');

    for (let downvoteBtn of downvoteBtns) {
        downvoteBtn.addEventListener('click', (e) => {
            //
            e.target.parentElement.querySelector('.upvote').classList.remove('upvoted');

            //select upvote button
            e.target.classList.toggle('downvoted')

            if(e.target.classList.contains('downvoted')){
                //fetch upvote post
                console.log('downvote')
                const body = {
                    vote_value: -1,
                    post_id: parseInt(e.target.parentElement.parentElement.getAttribute('data-post-id'))
                }
                console.log('upvote')
                fetch(host + '/votes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',

                    body: JSON.stringify(body)
                }).then(res => res.json()).then(data => console.log(data));
            } else{
                //fetch delete upvote
                console.log('remove vote');
                const body = {
                    post_id: parseInt(e.target.parentElement.parentElement.getAttribute('data-post-id'))
                }
                fetch(host + '/votes', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',

                    body: JSON.stringify(body)
                }).then(res => res.json()).then(data => console.log(data));
            }            
        })
        
    }
}

window.addEventListener('load', async () => {
    const posts = await getPosts();
    for(let post of posts){
        document.querySelector('#posts').innerHTML += `
        <div data-post-id="${post.id}" class="post">
            <div class="vote">
                <p class="upvote">up</p>
                <p class="vote_num">58</p>
                <p class="downvote">down</p>
            </div>
            <h1 class="title"><a href="post.html?id=${post.id}">${post.title}</a></h1>
            <p class="content">${post.content}</p>
            <p class="created_date">${post.created_date}</p>
        </div>`
    }

    voteHandler();
}) 