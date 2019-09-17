
//IMAGE UPLOAD
const loadingBtn = document.getElementById('loading-btn');
const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
const postTitle = document.getElementById('post-title-id');
const postImage = document.getElementById('post-file-id');
const postBody = document.getElementById('post-body-id');
let newPostForm = document.getElementById('new-post-form');

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


//AUDIO UPLOAD
const loadingAudioBtn = document.getElementById('loading-audio-btn');
const submitAudio = document.getElementById('submit-audio-upload');
const audioTitle = document.getElementById('audio-title-id');
const audioFile = document.getElementById('audio-file-id');
const audioDate = document.getElementById('audio-date-id');

let newAudioForm = document.getElementById('new-audio-form');

submitAudio.addEventListener('click', (e)=> {
  e.preventDefault();
  console.log('clicked');
  if(audioTitle.value === "" || audioFile.value === "" || audioDate.value === ""){
    alert('Por favor, completar todos los campos');
  }else{
    submitAudio.style.display = 'none';
    loadingAudioBtn.style.display = 'block';

    let formData = new FormData(newAudioForm);

    axios({
          method: 'post',
          url: '/audios',
          data: formData,
      })
       .then(response => {
          console.log(response);
          if(response){
            window.location = '/admin/homilias/1?alert=Novedad%20creada%20con%20exito';
          }
  
        }).catch(error => {
          console.log(error);
        });
  }
});