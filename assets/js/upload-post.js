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
     .then(() => {
          console.log('got to here!!');
          window.location.assign('/admin/posts?alert=Novedad%20creada%20con%20exito');
      })
      .catch(error => {
        console.log(error);
      });
});