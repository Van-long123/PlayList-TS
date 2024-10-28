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