const Nightmare = require('nightmare');

const cheerio = require('cheerio');

const nightmare = new Nightmare({ show: true });
const url = 'https://flipkart.com/';

const getHTML = async () => {
	try {
		let res = await nightmare
			.goto(url)
			.wait('body')
			.click('button._2AkmmA._29YdH8')
			.type('input.LM6RPg', 'nodejs books')
			.click('button.vh79eN')
			.wait('div.bhgxx2')
			.evaluate(() => document.querySelector('body').innerHTML)
			.end();
		getDate(res);
	} catch (err) {
		console.log('Error', err);
	}
};

let getDate = html => {
	const data = [];
	const $ = cheerio.load(html);
	$('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each(
		(row, raw_elem) => {
			$(raw_elem)
				.find('div div div')
				.each((i, elem) => {
					let title = $(elem)
						.find('div div a:nth-child(2)')
						.text();
					let link = $(elem)
						.find('div div a:nth-child(2)')
						.attr('href');

					if (title) {
						data.push({
							title,
							link
						});
					}
				});
		}
	);
	console.log('Data', data);
};

getHTML();
