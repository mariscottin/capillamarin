const deleteBtn = document.getElementById('delete-post-btn');
const postId = deleteBtn.parentNode;

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(postId);
})