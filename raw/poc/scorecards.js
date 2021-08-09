let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
function processSinglematch(url) {

    request(url, cb);
}
function cb(error, response, html) {

    if (error) {
        console.log(error); 
    } else if (response.statusCode == 404) {
        console.log("Page Not Found")
    }
    else {
        dataExtracter(html);
    }
}
function dataExtracter(html) {
    let searchTool = cheerio.load(html)

    let bothInningArr = searchTool(".Collapsible");
    for (let i = 0; i < bothInningArr.length; i++) {
    
        let teamNameElem = searchTool(bothInningArr[i]).find("h5");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        // console.log(teamName);
        let batsManTableBodyAllRows = searchTool(bothInningArr[i]).find(".table.batsman tbody tr");
        console.log(batsManTableBodyAllRows.length);

        for (let j = 0; j < batsManTableBodyAllRows.length; j++) {
            let numberofTds = searchTool(batsManTableBodyAllRows[j]).find("td");

            if (numberofTds.length == 8) {

                let playerName = searchTool(numberofTds[0]).text();
                console.log(playerName);
            }
        }
        console.log("``````````````````````````````````````");

    }

}
module.exports = {
    processSinglematch
}