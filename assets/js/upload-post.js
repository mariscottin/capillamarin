//IMAGE UPLOAD
const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
const postTitle = document.getElementById('post-title-id');
const postImage = document.getElementById('post-file-id');
const postBody = document.getElementById('post-body-id');
const loadingBtn = document.getElementById('loading-btn');
let newPostForm = document.getElementById('new-post-form');

submit.addEventListener('click', (e)=> {
  e.preventDefault();
  console.log(section.value);
  console.log(postTitle.value);
  console.log(postImage.value);
  console.log(postBody.value);

  if(section.value = "default" || postTitle.value === "" || postImage.value === "" || postBody.value === ""){
    alert('Por favor, completar todos los campos');
  }else{
    submit.style.display = 'none';
    loadingBtn.style.display = 'block';
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
  }
});