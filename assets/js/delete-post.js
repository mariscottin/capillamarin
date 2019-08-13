const deleteBtn = document.getElementById('delete-post-btn');
const postId = document.getElementById('delModal').parentNode.id;

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(postId);
})