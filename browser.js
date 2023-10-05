const puppeteer = require('puppeteer');
const startBrowser = async ()=>{
    let browser
    try {
        browser = await puppeteer.launch({
            // có hiển thị ui của Chromium hay không , false là có
            headless : true,
            // chrome sử dụng multiple layer của sandbox để tránh những nội dung web không đáng tin của trình duyệt
            //  nếu tin tưởng content dung thì set
            args :["--disable-setuid-sandbox"],

            //  truy vấn web bỏ qua lỗi liên quan đến http secure

            'ignoreHTTPSErrors': true
        })
    } catch (error) {
        console.log('start browser ' + error)
    }
    return browser
}


module.exports = startBrowser
