const startBrowser = require('./browser')
const scrapeController = require('./scrapeController')


// khởi tạo trình duyệt 
let browser = startBrowser()

// điều hướng cho việc crap dữ liệu
scrapeController(browser)
