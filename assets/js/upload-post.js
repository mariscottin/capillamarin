
//IMAGE UPLOAD
const submit = document.getElementById('submit-post-upload');
const section = document.getElementById('post-section-id');
// const section = dropdown.options[dropdown.selectedIndex].value;
const title = document.getElementById('post-title-id');
const file = document.getElementById('post-file-id');
const body = document.getElementById('post-body-id');
submit.addEventListener('click', (e)=> {
    e.preventDefault();
    const data = {
        'section': section.value,
        'title': title.value,
        'body': body.value,
    }
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
        type: 'application/json'
      });
    console.log(data);
    const formData = new FormData();
    formData.append('file', file.files[0]);
    formData.append('data', blob);
    console.log(formData);
    axios.post(`/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response);

      }).catch(error => {
        console.log(error);
      });

    // const options = {
    //     showLeafArrayIndexes: true
    // };

    // const formData = window.jsonToFormData(data, options);
    // formData.append('file', file.files[0]);

    // axios.post(`/posts`, data, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    //     }).then(response => {
    //      console.log(response);

    //     }).catch(error => {
    //      console.log(error);
    //     });
});