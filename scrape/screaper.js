const cheerio = require("cheerio")
const chalk = require("chalk") 
const fs = require("fs")
const crypto = require("crypto")
const ytdl = require("ytdl-core")

async function ytmp3(url) {
try {
let a = "./all/tmp/"+crypto.randomBytes(4).toString('hex')+".mp3"
                await new Promise((resolve, reject) => {
                    ytdl(url, { filter: "audioonly" })
                        .pipe(fs.createWriteStream(a))
                        .on("finish", resolve)
                        .on("error", reject);
                })
            } catch (e) {
                console.error(e);
                return {
                    status: 'error',
                    message: 'Terjadi kesalahan saat mengambil informasi video'
                };
            }
        }

async function mediafire (query) {
	return new Promise((resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const judul = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').text();
				const size = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(1) > span').text();
				const upload_date = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
				const link = $('#downloadButton').attr('href')
				const hsil = {
					judul: link.split('/')[5],
					upload_date: upload_date,
					size: size,
					mime: link.split('/')[5].split('.')[1],
					link: link
				}
				resolve(hsil)
			})
			.catch(reject)
	})
}

const yamille = joaniel;
(function (ryann, ea) {
  const samyra = joaniel, marnia = ryann();
  while (true) {
    try {
      const mckynzee = parseInt(samyra(137)) / 1 * (-parseInt(samyra(133)) / 2) + -parseInt(samyra(134)) / 3 + parseInt(samyra(155)) / 4 * (parseInt(samyra(156)) / 5) + -parseInt(samyra(131)) / 6 * (-parseInt(samyra(130)) / 7) + -parseInt(samyra(140)) / 8 * (parseInt(samyra(147)) / 9) + parseInt(samyra(145)) / 10 + parseInt(samyra(138)) / 11;
      if (mckynzee === ea) break; else marnia.push(marnia.shift());
    } catch (beril) {
      marnia.push(marnia.shift());
    }
  }
}(altavious, 888830));
const FormData = require("form-data"), Jimp = require(yamille(154));
function joaniel(wendolyne, nyier) {
  const enalina = altavious();
  return joaniel = function (laurae, mekelle) {
    laurae = laurae - 127;
    let ralphine = enalina[laurae];
    return ralphine;
  }, joaniel(wendolyne, nyier);
}
function altavious() {
  const jaylenn = ["inferenceengine", "push", "21AoSGqU", "225006xOkcNu", "concat", "472390FPofBK", "4809828vvqtte", "data", "model_version", "3NUOcvQ", "14047187eKUyBb", "error", "3013792ZhnCJd", "okhttp/4.9.3", ".ai/", "enhance_image_body.jpg", "from", "10610670esKiBu", "append", "18nRsxLl", "submit", "https", "image", ".vyro", "image/jpeg", "enhance", "jimp", "24448HhNNWt", "1230ttmiGH", "Keep-Alive"];
  altavious = function () {
    return jaylenn;
  };
  return altavious();
}
async function remini(kyoko, tysa) {
  return new Promise(async (majeed, tamicko) => {
    const deamber = joaniel;
    let milahn = [deamber(153), "recolor", "dehaze"];
    milahn.includes(tysa) ? tysa = tysa : tysa = milahn[0];
    let kymire, nazar = new FormData, lennel = deamber(149) + "://" + deamber(128) + deamber(151) + deamber(142) + tysa;
    nazar[deamber(146)](deamber(136), 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=uttf-8"}), nazar[deamber(146)](deamber(150), Buffer[deamber(144)](kyoko), {filename: deamber(143), contentType: deamber(152)}), nazar[deamber(148)]({url: lennel, host: deamber(128) + deamber(151) + ".ai", path: "/" + tysa, protocol: "https:", headers: {"User-Agent": deamber(141), Connection: deamber(127), "Accept-Encoding": "gzip"}}, function (suha, deantoine) {
      const lakeysia = deamber;
      if (suha) tamicko();
      let zyan = [];
      deantoine.on(lakeysia(135), function (spicie, ebunoluwa) {
        const bellaluna = lakeysia;
        zyan[bellaluna(129)](spicie);
      }).on("end", () => {
        const camden = lakeysia;
        majeed(Buffer[camden(132)](zyan));
      }), deantoine.on(lakeysia(139), shady => {
        tamicko();
      });
    });
  });
}

async function ssweb(url = "", full = false, type = "desktop") {
  type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form,
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join(""),
    },
    responseType: "arraybuffer",
  });
  return Buffer.from(buffer.data);
}

async function igstalk(username) {
  let html = await (await fetch("https://dumpoir.com/v/" + username)).text();
  const $ = cheerio.load(html);
  const Profile = {
    image: $("#user-page > div.user > div.row > div > div.user__img")
      .attr("style")
      .replace(/(background-image: url\(\'|\'\);)/gi, ""),
    username: $(".user__title h4").text().trim(),
    fullName: $(".user__title h1").text().trim(),
    bio: $(".user__info-desc").text().trim(),
    posts: $(".list__item").eq(0).text().trim(),
    followers: $(".list__item").eq(1).text().trim(),
    following: $(".list__item").eq(2).text().trim(),
  };
  const Post = [];
  $(".content__item").each((index, element) => {
    const post = {};
    const img = $(element).find(".content__img").attr("src");
    const desc = $(element).find(".content__text p").text();
    const likes = parseInt($(element).find(".bx-like + span").text());
    const comments = parseInt(
      $(element).find(".bx-comment-dots + span").text(),
    );
    const time = $(element).find(".bx-time + span").text();

    if (!isNaN(likes) && !isNaN(comments) && img && desc && time) {
      post.image = img;
      post.description = desc;
      post.likes = likes;
      post.comments = comments;
      post.time = time;
      Post.push(post);
    }
  });

  const result = {
    Profile: Profile,
    Post: Post,
  };
  return result;
}
async function tts(text, lang = "ja") {
  let fs = require("fs");
  let path = require("path");

  console.log(lang, text);
  return new Promise((resolve, reject) => {
    try {
      let tts = require("node-gtts")(lang);
      let filePath = path.join(__dirname, "../all/tmp", 1 * new Date() + ".wav");
      tts.save(filePath, text, () => {
        resolve(fs.readFileSync(filePath));
        fs.unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  ssweb,
  igstalk,
  tts, 
  remini, 
  mediafire, 
  ytmp3
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})