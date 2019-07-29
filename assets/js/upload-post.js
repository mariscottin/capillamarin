//IMAGE UPLOAD
const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
const loadingText = document.querySelector('.loading-text');
let newPostForm = document.getElementById('new-post-form');

submit.addEventListener('click', (e)=> {
  e.preventDefault();
  loadingText.style.display = 'block';
  let formData = new FormData(newPostForm);
  formData.append('section', section.value);

  axios({
        method: 'post',
        url: '/posts',
        data: formData,
    })
     .then(response => {
        console.log(response);
        if(response){
          window.location = '/admin/posts?alert=Novedad%20creada%20con%20exito';
        }

      }).catch(error => {
        console.log(error);
      });
});