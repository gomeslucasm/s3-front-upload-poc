const imageForm = document.getElementById('image-form')
const imageInput = document.getElementById('image-input')


imageForm.addEventListener('submit', async (e)=>{
  e.preventDefault()

  const file = imageInput.files[0]

  const postData = JSON.stringify({name: file.name})

  const { url } =  await fetch('/s3Url', {method: "POST",headers: {
		'Content-type': 'application/json; charset=UTF-8'
	},body: postData}).then(res => res.json())

  console.log({url})
  console.log({file}) 

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



  const imageUrl = url.split('?')[0]

  // post requst to my server to store any extra data
  console.log({imageUrl})
  
  const img = document.getElementById("image")
  img.src = imageUrl
})