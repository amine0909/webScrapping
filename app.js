const cheerio = require("cheerio")
const request = require("request")
const file = require("fs")
const writeFile = file.WriteStream("resultScrapping.csv")


const url = "https://coursetro.com/"

// create header
writeFile.write(`Title;image;date \n`)
request(
    {
        method: 'GET',
        url: 'http://api.scraperapi.com/?key=a4838701e435d28ecc8581af8755c196&url=' + url,
        headers: {
            Accept: 'application/json',
        },
    }, (error,response,html) => {
       if(!error && response.statusCode === 200) {
           const $ = cheerio.load(html)

           const container = $(".post-container")
           container.each((i,el) => {
               const title = $(el)
               .find(".white-container")
               .find("a")
               .find("span")
               .text()
               .replace(/\s/g,'')
               //console.log(titles)


               const imagePost = $(el)
               .find("a")
               .find("img[src*='https://s3.amazonaws.com/coursetro']")
               .attr("src")

               const DatePost = $(el)
               .find(".white-container")
               .find(".total_time   ")
               .text()
               .replace(/\s/g,'')

               writeFile.write(`${title};${imagePost};${DatePost} \n`)
                
            })
            console.log("done")
       }
    })