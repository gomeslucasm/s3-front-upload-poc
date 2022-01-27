const imageForm = document.getElementById('image-form')
const imageInput = document.getElementById('image-input')
const imageActivity = document.getElementById('image-activity')

imageForm.addEventListener('submit', async (e)=>{
  e.preventDefault()

  const file = imageInput.files[0]

  const postData = JSON.stringify({name: file.name})

  imageActivity.innerHTML = 'Requesting upload url'

  const { url } =  await fetch('/s3Url', {method: "POST",headers: {
		'Content-type': 'application/json; charset=UTF-8'
	},body: postData}).then(res => res.json())

  imageActivity.innerHTML = 'Uploading image'

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  }).then((responseJson) => {
    console.log({responseJson})
  })
  .catch((error) => {
    console.log('error = ', error)
  });

  imageActivity.innerHTML = 'Image uploaded'
  imageActivity.style.color = 'green'

  const imageUrl = url.split('?')[0]

  // post requst to my server to store any extra data
  console.log({imageUrl})
  
  const img = document.getElementById("image")
  img.src = imageUrl
})