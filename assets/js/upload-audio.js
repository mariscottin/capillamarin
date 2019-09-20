
//AUDIO DOM
const loadingAudioBtn = document.getElementById('loading-audio-btn');
const submitAudio = document.getElementById('submit-audio-upload');
const audioTitle = document.getElementById('audio-title-id');
const audioFile = document.getElementById('audio-file-id');
const audioDate = document.getElementById('audio-date-id');
let newAudioForm = document.getElementById('new-audio-form');

//AUDIO UPLOAD
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
              url: '/audio',
              data: formData,
          })
           .then(response => {
              console.log(response);
              if(response){
                window.location = '/admin/homilias/1?alert=Homilia%20cargada%20con%20exito';
              }
      
            }).catch(error => {
              console.log(error);
            });
      }
  });