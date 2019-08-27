const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.ycombinator.com';
const getHTML = async () => {
    try {
        let res =  await axios.get(url);
        getDate(res.data);
     } catch(err) {
         console.log('Error', err);
     }
}

let getDate = html => {
    const data = [];
    const $ = cheerio.load(html);
    $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
        data.push({
            title: $(elem).text(),
            link: $(elem).find('a.storylink').attr('href')
        });
    });
    console.log('Data', data);
}

getHTML();
