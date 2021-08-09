let request = require("request");
let cheerio = require("cheerio");
// let fs = require("fs");
let scoreCardObj=require("./scorecards")
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"
request(url, cb);
function cb (error, response, html){
    if(error){
        console.log("Error");
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }else{
        dataExtracter(html);
    }
}
function dataExtracter(html){
    let searchTool = cheerio.load(html);
    let anchorrep = searchTool('a[data-hover="View All Results"]');
    let link = anchorrep.attr("href");

    let fullAllMatchPageLink = `https://www.espncricinfo.com${link}`;
    console.log(fullAllMatchPageLink);
    request(fullAllMatchPageLink, allMatchPageCb);
}
function allMatchPageCb(error, response, html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("Page Not Found");
    }else{
        // console.log(html);
        getAllSortedCardLink(html)
    }
}
function getAllSortedCardLink(html){
    console.log("``````````````````````````````````````");
    let searchTool =  cheerio.load(html);
    let scorecardssArr = searchTool("a[data-hover='Scorecard']");
    let val = 1
    for(let i = 0; i<scorecardssArr.length; i++){
        let link = searchTool(scorecardssArr[i]).attr("href");
        let fullAllMatchPageLink = `https://www.espncricinfo.com${link}`;
        // console.log(fullAllMatchPageLink );
        scoreCardObj.processSinglematch(fullAllMatchPageLink)
    }
    console.log("`````````````````");
}

