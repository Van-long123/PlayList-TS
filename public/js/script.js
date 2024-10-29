// APlayer
const aplayer=document.getElementById('aplayer')
if(aplayer){
    let dataSong=aplayer.getAttribute('data-song')//value nó là 1 chuỗi json 
    let dataSinger=aplayer.getAttribute('data-singer')//value nó là 1 chuỗi json 
    // covert sang js 
    dataSong=JSON.parse(dataSong)
    dataSinger=JSON.parse(dataSinger)
    console.log(dataSong)
    const ap = new APlayer({
        container: aplayer, 
        volume:1,
        autoplay: true, //thêm cái này là khi vào trang detail đoạn code này đc chạy thì sẽ tự động phát nhạc
        // có 1 vấn đề nữa là khi load lại chính trang detail đó thì nó sẽ ko tự động chạy audio do google chỏom nó chặn hành vi đó
        // trừ khi có hành động click vào link chuyển qua detail thì đc 
        // lỗi play() failed because the user didn't interact with the document first 
        // trang nhạc của tôi cũng bị y như vâjy 
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }]
    });
    const avatar=document.querySelector('.inner-avatar')
    ap.on('play', function () { //ban đầu vào thì autoplay: true, thì nó sẽ vào play
        avatar.style.animationPlayState= 'running';
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState= 'paused';
    });
}

// APlayer


// button like 
const buttonLike=document.querySelector('[button-like]')
if(buttonLike){
    buttonLike.addEventListener('click',e=>{
        const idSong=buttonLike.getAttribute('button-like')
        const isActive=buttonLike.classList.contains('active')
        const typeLike=isActive ? 'dislike' : 'like';
        const link=`/songs/like/${typeLike}/${idSong}`
        
        // cách 1 dùng ajax i
        // cách 2 dùng socket 
        // cách 3 dùng fetch để gọi api 
        // fetch se gọi đến link đó và tăng lên 1 đơn vị và respones về json 
        
        //để gửi lên bằng pt patch
        // const option 
        const option={
            method:"PATCH"
        }
        // vào nextwork fetch/XHR để xem 
        fetch(link,option) //mặc định nó sẽ là pt get
            .then(res=>{
                // res.json() chuyển đổi dữ liệu phản hồi (thường ở định dạng JSON) thành một đối tượng JavaScript.
                return res.json()
            })
            .then(data=>{
                if(data.code==200){
                    buttonLike.querySelector('span').innerHTML=`${data.like} thích`
                    // buttonLike.querySelector('span').textContent=data.like +' thích'
                    buttonLike.classList.toggle('active')
                }
                
            })
    })
}
// trong pt html chỉ có 2 pt get post để mà gửi bằng các pt khác thì phải cài thư viện còn api này thì ko 
// button like 

// button favorite 
const buttonFavorite=document.querySelector('[button-favorite]')
if(buttonFavorite){
    // user_id lấy từ middleware khi đăng nhập thành công
    buttonFavorite.addEventListener('click',e=>{
        const idSong=buttonFavorite.getAttribute('button-favorite')
        const isActive=buttonFavorite.classList.contains('active')
        const typeFovarite=isActive ? 'unfovarite' : 'fovarite';
        const link=`/songs/fovarite/${typeFovarite}/${idSong}`
        const option={
            method:"PATCH"
        }
        fetch(link,option) 
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                if(data.code==200){
                    buttonFavorite.classList.toggle('active')
                }
            })
    })
}
// button favorite 