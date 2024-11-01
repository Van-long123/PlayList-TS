tinymce.init({
    selector: 'textarea.tiny-mce',
    plugins: 'lists link image table code help wordcount',
    toolbar: 'image',

    // khi mà ta upload file lên tinymce sẽ từ dộng upload file đó lên đường dẫn /admin/upload
    images_upload_url:'/admin/upload',//khi thêm thằng này để lưu ảnh trên cloud thì bỏ hết file_picker_callback
    // images_file_types: 'jpg,svg,png',
    /* and here's our custom image picker*/
  

    //Đoạn mã này sử dụng FileReader để chuyển đổi file hình ảnh mà người dùng chọn thành một chuỗi Base64
// và lưu nó tạm thời trong bộ đệm của TinyMCE. (img="base64")
  //   file_picker_callback: (cb, value, meta) => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');

  //   input.addEventListener('change', (e) => {
  //     const file = e.target.files[0];

  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       const id = 'blobid' + (new Date()).getTime();
  //       const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
  //       const base64 = reader.result.split(',')[1];
  //       const blobInfo = blobCache.create(id, file, base64);
  //       blobCache.add(blobInfo);

  //       cb(blobInfo.blobUri(), { title: file.name });
  //     });
  //     reader.readAsDataURL(file);
  //   });

  //   input.click();
  // },
  });
//   selector đến cái thẻ mà ta muốn dùng // TinyMCE ko cần truyền id vào cũng đc
