//IMAGE UPLOAD
const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
let newPostForm = document.getElementById('new-post-form');

submit.addEventListener('click', (e)=> {
  e.preventDefault();
  
  let formData = new FormData(newPostForm);
  formData.append('section', section.value);

  axios({
        method: 'post',
        url: '/posts',
        data: formData,
    })
     .then(response => {
        console.log(response);

      }).catch(error => {
        console.log(error);
      });
});