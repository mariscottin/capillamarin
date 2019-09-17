
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
    
  });