import unidecode from 'unidecode'
export const convertToSlug=(text:string):string =>{
    const unidecodeText=unidecode(text.trim());//hàm này sẽ biến value thành ko dấu
    const slug:string=unidecodeText.replace(/\s+/g,'-')///\s+/g có nghĩa là tìm những khoảng trắng thay thế bằng dấu - kể cả khoảng trắng đó nhiều dài ntn 
    // nhờ s+ thì có khoảng trắng là nó thây thế nó cộng dần lên cat+++doi
    return slug;
}