//AUDIO UPLOAD
const loadingBtn = document.getElementById('loading-audio-btn');
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
    console.log('got here!')
    submitAudio.style.display = 'none';
    loadingBtn.style.display = 'block';
    let formData = new FormData(newAudioForm);
    formData.append('date', audioDate.value);

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