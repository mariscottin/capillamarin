
//IMAGE DOM
const loadingBtn = document.getElementById('loading-btn');
const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
const postTitle = document.getElementById('post-title-id');
const postImage = document.getElementById('post-file-id');
const postBody = document.getElementById('post-body-id');
let newPostForm = document.getElementById('new-post-form');

//IMAGE UPLOAD
submit.addEventListener('click', (e)=> {
  e.preventDefault();
  if(section.value === "default" || postTitle.value === "" || postImage.value === "" || postBody.value === ""){
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
            window.location = '/admin/posts/1?alert=Novedad%20creada%20con%20exito';
          }
  
        }).catch(error => {
          console.log(error);
        });
  }
});

