const scrapeCategory = (browser,url) => new Promise(async (resolve,reject) => {
    try {
        let page = await browser.newPage();
        console.log(">> Mở tab mới ......")
        await page.goto(url)
        console.log(">> Truy cập vào " + url)
        //  đợi cho nó load xong 
        await page.waitForSelector('#default')
        console.log(">> Web đã load xong ......")

        // $eval document.queryselector
        // $$eval document.queryselectorAll

        const dataCategory = await page.$$eval('.row > .sidebar > .side_categories > ul >li > ul > li',els =>{
            dataCategory = els.map(el => {
                return {
                    category : el.querySelector('a').innerText,
                    link : el.querySelector('a').href
                }
            })
            return dataCategory
        })
        await page.close()
        console.log("tag đã đóng")
        resolve(dataCategory)
    } catch (error) {
        console.log('lỗi ở scrapper category ' + error)
        reject(error)
    }
})
const scrapper = (browser,url)=> new Promise(async (resolve,reject) => {
    try {
        let page = await browser.newPage();
        console.log(">> Mở tab mới ......")
        await page.goto(url)
        console.log(">> Truy cập vào " + url)
        //  đợi cho nó load xong 
        await page.waitForSelector('#default')
        console.log(">> Web đã load xong ......")

        const data = {}


        //  lấy links detail item
        const detailLinks = await page.$$eval('.page .page_inner section ol li', els=>{
            detailLinks = els.map(el=>{
                return el.querySelector('article > h3 > a').href
            })
            return detailLinks
        })

        const scrapperDetail = async(link)=> new Promise(async(resolve, reject)=>{
            try {
                let pageDetail = await browser.newPage()
                await pageDetail.goto(link)
                console.log('>> truy cập ' + link )
                await pageDetail.waitForSelector('#default')
                console.log('>> load page thành công')
                const content = await pageDetail.$eval('#content_inner ', (el) =>{ 
                    return {
                        bookTitle: el.querySelector('.product_page .product_main h1').innerText,
                        star : el.querySelector('.product_page .product_main > .star-rating')?.className.split(' ')[1],
                        bookPrice : el.querySelector('.product_page .product_main .price_color')?.innerText,
                        available : el.querySelector('.product_page .product_main .availability')?.innerText.match(/\d+/)[0],
                        imagesUrl : el.querySelector('.product_page .carousel img')?.src,
                        bookDescription : el.querySelector('.product_page > p')?.innerText,
                        upc : el.querySelector('.product_page > table.table-striped > tbody > tr > td')?.innerText,
                    }
                })
                await pageDetail.close()    
                console.log('>> đã đóng tab')
                resolve(content)
            } catch (error) {
                console.log('lấy data detail lỗi ' + error)
                reject()
            }
        })

        const details = []
        for (let link of detailLinks){
            const detail = await scrapperDetail(link)
            details.push(detail)
        }
        console.log('>> trình duyệt đã đóng')
        resolve(details)
    } catch (error) {
        reject()
    }
})

module.exports = {
    scrapeCategory,
    scrapper
}
