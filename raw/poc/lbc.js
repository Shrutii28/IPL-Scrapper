let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary";
console.log("Before");
request(url , cb);
function cb (error, response, html){
    if(error){
        console.log("Error");
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }else{
        // console.log(html);
        dataExtracter(html);
    }
}

function dataExtracter(html){
    let searchTool = cheerio.load(html);
    let elemRepArr = searchTool(".match-comment-wrapper .match-comment-long-text");
    let lbc = searchTool(elemRepArr[0]).text();
    console.log("lbc", lbc);
}
console.log("After");