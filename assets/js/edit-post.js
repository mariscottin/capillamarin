const submit = document.getElementById('submit-post-edit');
const section = document.getElementById('edit-post-section-id');
const postTitle = document.getElementById('edit-post-title-id');
const postBody = document.getElementById('edit-post-body-id');
const loadingBtn = document.getElementById('loading-edit-btn');

submit.addEventListener('click', (e)=> {
    if(section.value === "default" || postTitle.value === "" || postBody.value === ""){
      alert('Por favor, completar todos los campos');
    }else{
      submit.style.display = 'none';
      loadingBtn.style.display = 'block';
    }
});

function indexMatchingText(ele, text) {
  for (let i = 1; i < ele.options.length; ++i) {
    let newText = ele.options[i].text.replace(/\|(.+?)\|/g, '')
    if (newText === text) { 
        // ele.options[i].selected = true;
        return i;
    }
  }

}

function setSelectedIndex(s, i){
  s.options[i-1].selected = true;
  return;
}

setSelectedIndex(section, 5);

const result = indexMatchingText(section, section.name);
console.log(result);