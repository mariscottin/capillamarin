const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
const postTitle = document.getElementById('post-title-id');
const postBody = document.getElementById('post-body-id');
const loadingBtn = document.getElementById('loading-btn');


submit.addEventListener('click', (e)=> {
    e.preventDefault();

    if(section.value === "default" || postTitle.value === "" || postBody.value === ""){
      alert('Por favor, completar todos los campos');
    }else{
      submit.style.display = 'none';
      loadingBtn.style.display = 'block';
      window.location = '/admin/posts?alert=Novedad%20editada%20con%20exito';
    }
});