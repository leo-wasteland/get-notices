const request = require("request-promise")
const cheerio = require("cheerio")

const url = 'https://ifrs.edu.br/vacaria/editais'

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    const formated = $(".editais__table").find("tbody").text().split("\n").map(e => e.trim()).filter(e => e);

    let array = [];
    for (let i = 0; i < formated.length; ++i) {
      let obj = {
        lastUpdate: formated[i],
        notice: formated[++i],
        noticeDate: formated[++i],
        categories: formated[++i],
        status: formated[++i] == "Vigente" ? true : false
      }
      if (!obj.status) { --i };
      array.push(obj)
    }

    console.log(array.slice(0, 5))
  }
})