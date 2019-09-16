//AUDIO UPLOAD
const submitAudio = document.getElementById('submit-audio-upload');
const audioTitle = document.getElementById('audio-title-id');
const audioFile = document.getElementById('audio-file-id');
const audioDate = document.getElementById('audio-date-id');
const loadingBtn = document.getElementById('loading-audio-btn');

let newAudioForm = document.getElementById('new-audio-form');

submitAudio.addEventListener('click', (e)=> {
  e.preventDefault();
  if(audioTitle.value === "" || audioFile.value === "" || audioDate.value === ""){
    alert('Por favor, completar todos los campos');
  }else{
    submitAudio.style.display = 'none';
    loadingBtn.style.display = 'block';
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