const submit = document.getElementById('submit-post-edit');
const section = document.getElementById('edit-post-section-id');
const postTitle = document.getElementById('edit-post-title-id');
const postBody = document.getElementById('edit-post-body-id');
const loadingBtn = document.getElementById('loading-edit-btn');

console.log(section.name);
submit.addEventListener('click', (e)=> {
    if(section.value === "default" || postTitle.value === "" || postBody.value === ""){
      alert('Por favor, completar todos los campos');
    }else{
      submit.style.display = 'none';
      loadingBtn.style.display = 'block';
    }
});

function setSelectedIndex(s, i){
  s.options[i-1].selected = true;
  return;
}
setSelectedIndex(document.getElementById("edit-post-section-id"),5);
