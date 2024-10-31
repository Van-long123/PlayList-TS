console.log('ok')
// upload Image 
const uploadImage=document.querySelector('[upload-image]');
if(uploadImage){
    const uploadImageInput=document.querySelector('[upload-image-input]')
    const uploadImagePreview=document.querySelector('[upload-image-preview]')
    uploadImageInput.addEventListener('change',(e)=>{
        const file=e.target.files[0];
        console.log(file)
        console.log(e.target.files)
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
        console.log(URL.createObjectURL(file))
    })
}
// End Upload Image 