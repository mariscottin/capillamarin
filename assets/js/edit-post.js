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

console.log(`Original className:${section.className}`);
console.log(`New className:${section.className.substr(28)}`);

function indexMatchingText(ele, text) {
  let result = undefined;
  for (let i = 1; i < ele.options.length; ++i) {
    let newText = ele.options[i].text.replace(/\|(.+?)\|/g, '')
    if (newText.substr(1) === text) { 
        // ele.options[i].selected = true;
        console.log(`${newText} is equal to ${text}!!`);
        result = i;
    }
  }
  return result;
}

function setSelectedIndex(s, i){
  s.options[i].selected = true;
  return;
}

const sectionText = section.className.substr(28);
setSelectedIndex(section, indexMatchingText(section, sectionText));