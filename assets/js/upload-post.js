
//IMAGE UPLOAD
const submit = document.getElementById('submit-post-upload');
// const section = document.getElementById('post-section-id');
// const title = document.getElementById('post-title-id');
// const file = document.getElementById('post-file-id');
// const body = document.getElementById('post-body-id');

let newPostForm = document.getElementById('new-post-form');

submit.addEventListener('click', (e)=> {
  e.preventDefault();
  
  let formData = new FormData(newPostForm);
    // const data = {
    //     'section': section.value,
    //     'title': title.value,
    //     'body': body.value,
    // };

    // const json = JSON.stringify(data);
    // const blob = new Blob([json], {
    //     type: 'application/json'
    //   });

    // console.log(data);

    // const formData = new FormData();
    // formData.append('file', file.files[0]);
    // formData.append('data', blob);

    // console.log(formData);

    axios({
        method: 'post',
        url: '/posts',
        data: formData,
    })
     .then(response => {
        console.log(response);

      }).catch(error => {
        console.log(error);
      });
});