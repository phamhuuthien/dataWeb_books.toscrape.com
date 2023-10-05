const scrappers = require('./scrapper')
const fs = require('fs')
const scrapeControllers = async(browserInstance)=>{
    const url = 'https://books.toscrape.com/catalogue/category/books_1/index.html'
    const indexs = [0,1,2,3,4,5,6,7,8,9,10]

    try {
        let browser = await browserInstance
        const data = {}

        const categories = await scrappers.scrapeCategory(browser,url)
        const selectedCategory = await categories.filter((category,index) => indexs.some(i => i === index))
        
        
        for (let i=0; i<indexs.length; i++) {
            let result = await scrappers.scrapper(browser,selectedCategory[i].link)
            let nameCategory = selectedCategory[i].category
            data[nameCategory] = result
        }
        fs.writeFile('data.json',JSON.stringify(data),(err)=>{
            if(err) console.log('ghi dữ liệu vào file thất bại '+ err)
            console.log('thêm dữ liệu thành công')
        })


        browser.close()
    } catch (error) {
        console.log('lỗi scrapper controller ' + error)
    }
}


module.exports = scrapeControllers

