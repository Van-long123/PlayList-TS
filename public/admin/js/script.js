// upload Image 
const uploadAudio=document.querySelector('[upload-audio]');
if(uploadAudio){
    const uploadAudioInput=document.querySelector('[upload-audio-input]')
    const uploadAudioPlay=document.querySelector('[upload-audio-play]')
    const source=uploadAudioPlay.querySelector('source')
    uploadAudioInput.addEventListener('change',(e)=>{
        const file=e.target.files[0];
        // console.log(file)
        // console.log(e.target.files)
        if(file){
            source.src = URL.createObjectURL(file)//thêm vào thẻ source rồi nhưng có thời gian chưa chạy đc ta phỉa
            uploadAudioPlay.load()
        }
        console.log(URL.createObjectURL(file))
    })
}
// End Upload Image 
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