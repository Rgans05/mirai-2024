require("../setting/settings")
require('../reply.json'); // Pesan respons
const newowner = JSON.parse(fs.readFileSync('./all/database/owner.json'))
module.exports = async (sock, m, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''

//========= CONFIGURASI ==========//
const budy = (typeof m.text == 'string' ? m.text : '')
const isOwner = m.sender == owner+"@s.whatsapp.net" ? true : m.fromMe ? true : false
// Function untuk memeriksa apakah pengguna adalah owner
const iniOwner = (sender) => {
    const ownerNumber = '6289531400176@s.whatsapp.net'; // Ganti dengan nomor owner
    return sender === ownerNumber;
};
const prefix = '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ""
const cmd = prefix + command
const args = body.trim().split(/ +/).slice(1)
var crypto = require("crypto")
let { randomBytes } = require("crypto")
const { Client } = require('ssh2');
const fsx = require("fs-extra")
const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const LINODE_API_TOKEN = global.apilinode;
const API_TOKEN = global.apitokendo;
const makeid = randomBytes(3).toString('hex')
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const text = q = args.join(" ")
const botNumber = await sock.decodeJid(sock.user.id)
const isGroup = m.chat.endsWith('@g.us')
const senderNumber = m.sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const sender = m.key.fromMe ? (sock.user.id.split(':')[0]+'@s.whatsapp.net' || sock.user.id) : (m.key.participant || m.key.remoteJid)
const from = m.key.remoteJid;
const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat).catch(e => {}) : {}
// Ambil semua peserta grup
const groupMetadatab = await sock.groupMetadata(m.chat);
const participants = groupMetadatab.participants.map(p => p.id);
let participant_bot = m.isGroup ? groupMetadata?.participants.find((v) => v.id == botNumber) : {}
let participant_sender = m.isGroup ? groupMetadata?.participants.find((v) => v.id == m.sender) : {}
const isBotAdmin = participant_bot?.admin !== null ? true : false
const isAdmin = participant_sender?.admin !== null ? true : false
const isCreator = (m && m?.sender && [botNumber, ...newowner,...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m?.sender)) || false;
const { runtime, getRandom, getTime, tanggal, toRupiah, telegraPh, ucapan, generateProfilePicture, getBuffer, fetchJson, resize } = require('../all/function.js')
const { ssweb, igstalk, tts, remini, mediafire, ytmp3 } = require("../scrape/screaper.js")
const { toAudio, toPTT, toVideo, ffmpeg } = require("../all/converter.js")
const b = fs.readFileSync("./media/menu.mp3")
const poto = fs.readFileSync("./media/poto.jpg")
let modeFile = './all/database/mode.json'; // File untuk menyimpan mode
let currentMode = 'self'; // Mode default
//const isPremium = premium.includes(m.sender)*/


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//database
//const AntiSpam = db.data.antispam
/////////////////////////////////////////////////////////////////////////
async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      timeout: 60000, // 60 seconds
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    return (await response.json()).access_token;
  };

  const accessToken = await getToken();
  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks.items;
}
async function uploadToCatbox(filePath) {
            const form = new FormData();
            form.append('fileToUpload', fs.createReadStream(filePath)); // file yang diupload
            form.append('reqtype', 'fileupload'); // reqtype harus "fileupload"
          
            try {
              const response = await axios.post('https://catbox.moe/user/api.php', form, {
                headers: {
                  ...form.getHeaders(),
                },
              });
          
              if (response.data) {
                // Ambil hanya nama file yang diunggah
                const filename = response.data.trim();
                return `${filename}`;
              } else {
                throw new Error('Gagal mendapatkan URL dari Catbox.');
              }
            } catch (error) {
              console.error('Error uploading to Catbox:', error.message);
              throw error;
            }
          }
          
// Fungsi untuk membaca mode dari file
function loadMode() {
    if (fs.existsSync(modeFile)) {
        try {
            const data = fs.readFileSync(modeFile, 'utf-8');
            const parsedData = JSON.parse(data);
            currentMode = parsedData.mode || 'self'; // Default ke "self" jika tidak ada data
        } catch (error) {
            console.log('❌ Gagal membaca mode, menggunakan default: self');
            currentMode = 'self';
        }
    } else {
        console.log('📂 File mode tidak ditemukan, menggunakan default: self');
        currentMode = 'self';
    }
}

// Fungsi untuk menyimpan mode ke file
function saveMode() {
    fs.writeFileSync(modeFile, JSON.stringify({ mode: currentMode }, null, 2), 'utf-8');
}
loadMode()

// self & public
if (currentMode === 'self' && !isCreator) {
    return console.log(`~ sedang dalam mode ${currentMode.toUpperCase()}`)// Abaikan jika bukan owner
}

// Fungsi untuk memulai ulang bot
function restartBot() {
    spawn(process.argv[0], process.argv.slice(1), {
        stdio: 'inherit',
        detached: true,
    }).unref(); // Melanjutkan proses baru tanpa terikat proses utama

    process.exit(); // Menghentikan proses saat ini
}


//=========== MESSAGE ===========//
/*if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(namaowner), color(`[ PESAN ]`, `cyan`), color(`\nFROM`, `blue`), color(`${senderNumber}`, `cyan`), color(`Text :`, `blue`), color(`🗣️ ${cmd}`, `white`))
}*/
/*if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(namaowner), color(`[ PESAN ]`, `cyan`), chalk.yellow.bgCyan.bold(`\n乂 FROM`, `blue`), color(`${senderNumber}`, `cyan`), chalk.yellow.bgCyan.bold(`\n乂 TEXT :`), color(`🗣️ ${cmd}`, `cyan`), chalk.yellow.bgCyan.bold(`\n乂 WAKTU :`), color(`${jam}`, `cyan`), color(`\n---------------------------`, `green`))
}*/

if (isCmd) {
    // Tentukan apakah pesan dari grup atau pribadi
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const chatType = isGroup ? 'Grup' : 'Chat Pribadi';

    // Jika dari grup, tambahkan nama grup
    let groupName = '';
    if (isGroup) {
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid); // Mendapatkan metadata grup
        groupName = groupMetadata.subject || 'Grup Tidak Diketahui';
    }

    console.log(
        chalk.yellow.bgCyan.bold(namaowner), // Nama owner
        color(`[ PESAN ]`, `cyan`), // Indikator pesan
        chalk.yellow.bgCyan.bold(`\n乂 FROM`, `blue`), // Dari siapa
        color(`${senderNumber}`, `cyan`), // Nomor pengirim
        chalk.yellow.bgCyan.bold(`\n乂 TIPE :`), // Jenis chat
        color(`${chatType}`, `cyan`), // Grup atau pribadi
        isGroup ? chalk.yellow.bgCyan.bold(`\n乂 GRUP :`) + color(`${groupName}`, `cyan`) : '', // Nama grup jika dari grup
        chalk.yellow.bgCyan.bold(`\n乂 TEXT :`), // Isi pesan
        color(`🗣️ ${cmd}`, `cyan`), // Perintah
        chalk.yellow.bgCyan.bold(`\n乂 WAKTU :`), // Waktu
        color(`${jam}`, `cyan`), // Jam
        color(`\n---------------------------`, `green`) // Garis pembatas
    );
}

sock.autoshalat = sock.autoshalat ? sock.autoshalat : {}
    let id = m.chat
    if (id in sock.autoshalat) {
    return false
    }
    let jadwalSholat = {
    shubuh: '04:29',
    terbit: '05:44',
    dhuha: '06:02',
    dzuhur: '12:02',
    ashar: '15:15',
    magrib: '17:52',
    isya: '19:01',
    }
    const datek = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
    }));
    const hours = datek.getHours();
    const minutes = datek.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
    if (timeNow === waktu) {
        sock.autoshalat[id] = [
            sock.sendMessage(m.chat, {
audio: {
    url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'
},
mimetype: 'audio/mp4',
ptt: true,
contextInfo: {
    externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        mediaUrl: '',
        title: `Selamat menunaikan Ibadah Sholat ${sholat}`,
        body: `🕑 ${waktu}`,
        sourceUrl: '',
        thumbnail: await fs.readFileSync('./media/jadwal.jpg'),
        renderLargerThumbnail: true
    }
}
            }, {}),
            setTimeout(async () => {
delete sock.autoshalat[m.chat]
            }, 57000)
        ]
    }
    }
//========= FAKE QUOTED =========//
//Reply
// Fungsi untuk mengirim pesan teks
const sendMessage = async (sock, jid, content) => {
    await sock.sendMessage(jid, { text: content });
    };
    
const reply = (teks) => {
  sock.sendMessage(from, { text: teks }, { quoted: m })
}

async function reply1(txt) {
const Mirai = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: `${global.idsaluran}`,
},
externalAdReply: {  
showAdAttribution: true,
title: `${namabot}`,
body: 'Subscribe My YouTube',
thumbnailUrl: `${imgreply}`,
sourceUrl: 'https://www.youtube.com/@Fallzx-Features',
},
},
text: txt,
}
return sock.sendMessage(m.chat, Mirai, {
quoted: m,
})
}
const qtext2 = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: "..." }}}

//const qtext = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "0@s.whatsapp.net"} : {}) },'message': {extendedTextMessage: {text: "Terimakasih telah order"}}}
const qtext = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "0@s.whatsapp.net"} : {}) },'message': {extendedTextMessage: {text: `...`}}}

const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `...`,jpegThumbnail: ""}}}

const qaudio = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `0@s.whatsapp.net`} : {})}, message: {audioMessage: {seconds: 0, ptt: true }}}

const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `${namaowner}`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6289531400176:+62 895-3140-0176\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}
const qpayment = {
key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "IDR", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "WhatsApp"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "INR"}}}}

    
//========== FUNCTION ===========//
var ppuser
try {
ppuser = await sock.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}


let example = (teks) => {
return `*Contoh Cara Command :*\nketik *${cmd}* ${teks}`
}


function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

async function RuzReply(teks, jid = m.chat, mention = []) {
await sock.sendMessage(jid, {text: `${teks}`, contextInfo: {mentionedJid: mention, externalAdReply: {thumbnailUrl: imgreply, title: "", body: `Selamat ${ucapan()}`, 
previewType: "0"}}}, {quoted: qtext})
}
    async function uploadUguu(path) {
  try {
    const form = new FormData()
    form.append("files[]", fs.createReadStream(path))   
    const res = await fetch("https://uguu.se/upload.php", {
      method: "POST",
      headers: form.getHeaders(),
      body: form
    })    
    const json = await res.json()
    await fs.promises.unlink(path)   
    return json
  } catch (e) {
    await fs.promises.unlink(path)
    throw "Upload failed"
  }
    }

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// Fungsi untuk mengecek role (group/admin/owner)
const checkRole = async (sock, m, sender, role) => {
    if (role === 'admin') {
        const groupMetadata = await sock.groupMetadata(m.chat);
        const isAdmin = groupMetadata.participants.some(p => p.id === sender && p.admin === 'admin');
        if (!isAdmin) {
            reply(sock, sender, reply.admin);
            return false;
        }
    } else if (role === 'owner') {
        if (sender !== `${config.ownerNumber}@s.whatsapp.net`) {
            reply(sock, sender, reply.owner);
            return false;
        }
    } else if (role === 'group') {
        if (!m.isGroup) {
            reply(sock, sender, reply.group);
            return false;
        }
    }
    return true;
};

async function loading () {
var hawemod = [ 
"*[ ʟᴏᴀᴅɪɴɢ ] •──━━──━━──━━──•*",
"*[ ʟᴏᴀᴅɪɴɢ ] •━━─━──━━━━─━━━•*",
"*[ ʟᴏᴀᴅɪɴɢ ] •──━─━──━──━━━━•*",
"*[ ʟᴏᴀᴅɪɴɢ ] •─━──━─━───━───•*",
"*[ ʟᴏᴀᴅɪɴɢ ] •━━━━━━━━━━━━━━•*",
"Selesai"
]
let { key } = await sock.sendMessage(from, {text: 'ʟᴏᴀᴅɪɴɢ...'})//Pengalih isu

for (let i = 0; i < hawemod.length; i++) {
/*await delay(10)*/
await sock.sendMessage(from, {text: hawemod[i], edit: key });//PESAN LEPAS
}
}

// Fungsi untuk membuat polling (menggunakan tombol WhatsApp)
const createPoll = async (sock, m, sender, content) => {
    //if (!(await checkRole(sock, m, sender, 'admin'))) return;

    const pollParts = content.split('|');
    const pollQuestion = pollParts[0].trim();
    const pollOptions = pollParts.slice(1).map(opt => opt.trim());

    if (pollOptions.length < 2) {
        sendMessage(sock, sender, 'Polling harus memiliki minimal dua opsi.');
        return;
    }

    try {
        await sock.sendMessage(m.chat, {
            poll: {
                name: pollQuestion,
                values: pollOptions,
                selectableCount: 1,
            },
        });
        //sendMessage(sock, sender, 'Polling berhasil dibuat.');
    } catch (err) {
        console.error(err);
        sendMessage(config.ownerNumber + '@s.whatsapp.net', `Error saat membuat polling: ${err.message}`);
    }
};



let mruz = "`"
switch (command) {
case "menu":{
let menu = `
┏ ⪻ 𝐋𝐢𝐬𝐭 𝐌𝐞𝐧𝐮 ≫
┃- randommenu
┃- toolsmenu
┃- aimenu
┃- searchmenu
┃- downloadmenu
┃- ownermenu
┃- grupmenu
┗──≫
`
sock.sendMessage(from, { text: menu }, { quoted: qtext })
}
break
case "searchmenu":{
let menu = `
┏ ⪻ 𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮 ≫
┃- spotify
┃- pin
┃- ttstalk
┃- vtuber
┃- webtoon
┃- film
┃- filmsearch
┃- anilist
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break
case "downloadmenu":{
let menu = `
┏ ⪻ 𝐃𝐨𝐰𝐧 𝐌𝐞𝐧𝐮 ≫
┃- igdl
┃- gdrive
┃- igmp4
┃- tiktok
┃- tt2
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break

case "aimenu":{
let menu = `
┏ ⪻ 𝐀𝐢 𝐌𝐞𝐧𝐮 ≫
┃- txt2img
┃- morphic
┃- aio2
┃- gpt4
┃- Mirai-chat
┃- Mirai
┃- autoai
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break
case "ownermenu":{
let menu = `
┏ ⪻ 𝐎𝐰𝐧 𝐌𝐞𝐧𝐮 ≫
┃- block
┃- unblock
┃- addfile2
┃- autoread
┃- setppbot
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break
case "randommenu":{
let menu = `
┏ ⪻ 𝐑𝐚𝐧𝐝𝐨𝐦 𝐌𝐞𝐧𝐮 ≫
┃- pantun
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break
case "toolsmenu":{
let menu = `
┏ ⪻ 𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮 ≫
┃- faketweet
┃- nglspam
┃- tr
┃- trackip
┃- spam-pairing
┃- get
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break
case "grupmenu":{
let menu = `
┏ ⪻ 𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮 ≫
┃- statusgc
┃- hidetag
┃- kick
┃- delete
┃- demote
┃- promote
┃- open
┃- close 
┃- kickall
┗──≫
`
sock.sendMessage(m.chat, {
text: menu,
contextInfo: {
isForwarded: true,
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: namabot,
newsletterJid: idsaluran,
},
externalAdReply: {
title: namabot,
body: namaowner,
thumbnailUrl: thumb,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:m})
}

break

    //=================================================//
    case 'readchange': case 'autoread':{
if (!isCreator) return 
if (args.length < 1) return reply(`Contoh ${prefix + command} on/off`)
if (q === 'on') {
global.autoread = true
reply(`Berhasil mengubah autoread ke ${q}`)
} else if (q === 'off') {
global.autoread = false
m.reply(`Berhasil mengubah autoread ke ${q}`)
}
    }
        break

case 'setppbot':{
if (!isCreator) return m.reply(mess.owner);
if(m.quoted){
const media = await sock.downloadAndSaveMediaMessage(quoted)
const { img } = await generateProfilePicture(media)
await sock.query({ tag: 'iq',  attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture'}, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]})   
await m.reply(`Done`)
} else m.reply("Reply fotonya")
}
break
case 'mirai-chat': {
if (!text) return reply("Hai, ada yang mau kamu diskusikan hari ini")
async function v_girl(text,prompt, name) {
try {
const response = await axios.post('https://boredhumans.com/virtual_girlfriends/virtual_girlfriends_api.php',
      `prompt=${text.replace(/\s+/g, "%2520")}&chat_id=lwle4nyomx5t0w6quo8&init_prompt=${prompt.replace(/\s+/g, "%2520")}&voice_id=XrExE9yKIg1WjnnlVkGX&stability=0.5&similarity_boost=0.75&name=${name.replace(/\s+/g, "%2520")}&useAudio=false&dateLoc=Bookstore`,
      {
        headers: {
          'User-Agent': 'Googlebot-News',
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    return response.data
    } catch (e) {
    return e
    }
    }

let prompt = 'Mirai is a beginner WhatsApp bot maker ', name = 'Mirai'
        let {
            output
        } = await v_girl(text, prompt, name);
        await m.reply(output[0]);
}
break

case 'trackip':
{
if (!text) return m.reply(`*Example:* ${prefix + command} 112.90.150.204`);
try {
let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());

const formatIPInfo = (info) => {
 return `
*IP Information*
• IP: ${info.ip || 'N/A'}
• Success: ${info.success || 'N/A'}
• Type: ${info.type || 'N/A'}
• Continent: ${info.continent || 'N/A'}
• Continent Code: ${info.continent_code || 'N/A'}
• Country: ${info.country || 'N/A'}
• Country Code: ${info.country_code || 'N/A'}
• Region: ${info.region || 'N/A'}
• Region Code: ${info.region_code || 'N/A'}
• City: ${info.city || 'N/A'}
• Latitude: ${info.latitude || 'N/A'}
• Longitude: ${info.longitude || 'N/A'}
• Is EU: ${info.is_eu ? 'Yes' : 'No'}
• Postal: ${info.postal || 'N/A'}
• Calling Code: ${info.calling_code || 'N/A'}
• Capital: ${info.capital || 'N/A'}
• Borders: ${info.borders || 'N/A'}
• Flag:
 - Image: ${info.flag?.img || 'N/A'}
 - Emoji: ${info.flag?.emoji || 'N/A'}
 - Emoji Unicode: ${info.flag?.emoji_unicode || 'N/A'}
• Connection:
 - ASN: ${info.connection?.asn || 'N/A'}
 - Organization: ${info.connection?.org || 'N/A'}
 - ISP: ${info.connection?.isp || 'N/A'}
 - Domain: ${info.connection?.domain || 'N/A'}
• Timezone:
 - ID: ${info.timezone?.id || 'N/A'}
 - Abbreviation: ${info.timezone?.abbr || 'N/A'}
 - Is DST: ${info.timezone?.is_dst ? 'Yes' : 'No'}
 - Offset: ${info.timezone?.offset || 'N/A'}
 - UTC: ${info.timezone?.utc || 'N/A'}
 - Current Time: ${info.timezone?.current_time || 'N/A'}
`;
};
 
if (!res.success) throw new Error(`IP ${text} not found!`);
await sock.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude } }, { ephemeralExpiration: 604800 });
await delay(2000);
m.reply(formatIPInfo(res)); 
} catch (e) { 
m.reply(`Error: Unable to retrieve data for IP ${text}`);
}
}
break

case 'gpt4': {
  if (!text) return m.reply(`Hai, apa yang ingin saya bantu?`)
async function openai(text, logic) { // Membuat fungsi openai untuk dipanggil
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  // Sesuaikan token limit jika diperlukan
            "tokenLimit": 8000,  // Sesuaikan token limit untuk model GPT-4
            "completionTokenLimit": 5000,  // Sesuaikan jika diperlukan
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let kanjuthann = await openai(text, "nama mu adalah Mirai, kamu adalah asisten kecerdasan buatan yang sering membantu orang lain jika ada yang ditanyakan")
m.reply(kanjuthann)
}
break


case 'addfile2': {
    if (!isOwner) return reply(msg.owner)
    if (!text.includes("./")) return m.reply(`Contoh: ${prefix + command} ./path/to/file.txt`);
    
    let filePath = path.resolve(text);
    let dir = path.dirname(filePath);
    let fileName = path.basename(filePath);
    
    if (!fs.existsSync(dir)) {
        return m.reply('Direktori tidak ditemukan!');
    }
    
    // Pastikan pesan yang dikutip berisi dokumen
    if (!m.quoted) {
        return m.reply('Tidak ada file yang dikutip!');
    }

    try {
        let media = await downloadContentFromMessage(m.quoted, "document");
        let buffer = Buffer.from([]);
        
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]); // Gunakan let agar buffer bisa diubah
        }

        if (fs.existsSync(filePath)) {
            fs.appendFileSync(filePath, buffer);
            m.reply(`Berhasil menambahkan konten ke ${fileName}`);
        } else {
            fs.writeFileSync(filePath, buffer);
            m.reply(`Berhasil membuat file ${fileName} dan menambahkan konten.`);
        }
    } catch (err) {
        console.error(err);
        m.reply('Terjadi kesalahan saat mengunduh atau menyimpan file.');
    }
}
break;

case 'get': {
if (!text) return m.reply(`awali *URL* dengan http:// atau https://`)
try {
const gt = await axios.get(text, {
headers: {
"Access-Control-Allow-Origin": "*",
"Referer": "https://www.google.com/",
"Referrer-Policy": "strict-origin-when-cross-origin",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
},
responseType: 'arraybuffer' });
const contentType = gt.headers['content-type'];
console.log(`Content-Type: ${contentType}`);
if (/json/i.test(contentType)) {
const jsonData = JSON.parse(Buffer.from(gt.data, 'binary').toString('utf8'));
return m.reply(JSON.stringify(jsonData, null, 2));
} else if (/text/i.test(contentType)) {
const textData = Buffer.from(gt.data, 'binary').toString('utf8');
return m.reply(textData);
} else if (text.includes('webp')) {
return sock.sendMessage(m.chat, { sticker: {url: text}, contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: `http://wa.me/${owner}/${Math.floor(Math.random() * 100000000000000000)}`,
                    title: `Hai ${pushname}`,
                    body: `${namabot}`,
                    sourceUrl: "",
                    thumbnail: thumb
                }
            }}, { quoted: m })
} else if (/image/i.test(contentType)) { return sock.sendMessage(m.chat, {image: {url: text}, contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: `http://wa.me/${owner}/${Math.floor(Math.random() * 100000000000000000)}`,
                    title: `Hai ${pushname}`,
                    body: `${namabot}`,
                    sourceUrl: "",
                    thumbnail: thumb
                }
            }}, { quoted: m })
} else if (/video/i.test(contentType)) { return sock.sendMessage(m.chat, {video: {url: text}, contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: `http://wa.me/${owner}/${Math.floor(Math.random() * 100000000000000000)}`,
                    title: `Hai ${pushname}`,
                    body: `${namabot}`,
                    sourceUrl: "",
                    thumbnail: thumb
                }
            }}, { quoted: m })
} else if (/audio/i.test(contentType) || text.includes(".mp3")) {
return sock.sendMessage(m.chat, {audio: {url: text}, contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: `http://wa.me/${owner}/${Math.floor(Math.random() * 100000000000000000)}`,
                    title: `Hai ${pushname}`,
                    body: `${namabot}`,
                    sourceUrl: "",
                    thumbnail: thumb
                }
            }}, { quoted: m })
} else if (/application\/zip/i.test(contentType) || /application\/x-zip-compressed/i.test(contentType)) {
return sock.sendMessage(
			m.chat,
			{
				document: { url: text },
				fileName: ``,
				mimetype: text,
			},
			{ quoted: m },
		);			
} else if (/application\/pdf/i.test(contentType)) {
return sock.sendMessage(
			m.chat,
			{
				document: { url: text },
				fileName: ``,
				mimetype: text,
			},
			{ quoted: m },
		);
} else {
return m.reply(`MIME : ${contentType}\n\n${gt.data}`);
}
} catch (error) {
console.error(`Terjadi kesalahan: ${error}`);
return m.reply(`Terjadi kesalahan saat mengakses URL: ${error.message}`);
}}
break;
case 'morphic': {
  if (!text) return reply(`Example: ${prefix + command} hai`)
async function morphic(query) {
  const url = 'https://www.morphic.sh/';
  const formData = new FormData();
  
  formData.append('1', JSON.stringify({ id: '6399a7e212fa477d1a783edade27c8354a64e1ab', bound: null }));
  formData.append('2', JSON.stringify({ id: '9eed8f3e1c51044505fd5c0d73e8d2a92572691c', bound: null }));
  formData.append('3_input', query);
  formData.append('3_include_images', 'true');
  formData.append('0', JSON.stringify([{"action":"$F1","options":{"onSetAIState":"$F2"}},{"chatId":"9TI931x","messages":[]},"$K3",false,"$undefined","$undefined"]));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0',
        Accept: 'text/x-component',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        Referer: 'https://www.morphic.sh/',
        'Next-Action': 'c54d85c7f9588581807befbe1a35958acc57885b',
        'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2F%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
        Origin: 'https://www.morphic.sh',
        Connection: 'close',
        Cookie: 'ph_phc_HK6KqP8mdSmxDjoZtHYi3MW8Kx5mHmlYpmgmZnGuaV5_posthog=%7B%22distinct_id%22%3A%220191839d-890a-7a97-b388-bc7191ac7047%22%2C%22%24sesid%22%3A%5B1724490025781%2C%220191839d-8909-72e8-b586-d66ff3bde34f%22%2C1724490025225%5D%7D',
        Priority: 'u=0',
        TE: 'trailers',
      },
      body: formData
    });

    const data = await response.text();

    const regex = /"diff":\[0,"([^"]+)"\]/g;
    let result;
    let finalText = "";

    while ((result = regex.exec(data)) !== null) {
      finalText += result[1];
    }

    return finalText;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
try {
  let hannpler = await morphic(text)
  sock.sendMessage(m.chat, {text: hannpler}, {quoted: m})
} catch (error) {
  m.reply("Error bang")
}
}
break


case 'aio2': {
  if (!text) return reply(`Example: ${prefix + command} link tt lu`)
async function aio(url){
	return new Promise(async(resolve,reject) => {
		
 const { data: rest } = await axios.get("https://steptodown.com/")
    const $ = cheerio.load(rest) 
    const tokens = $("input[name='token']").val()
    const data = new URLSearchParams(
      Object.entries({
        url: url,
        token: tokens 
      })
    )    
    await axios.post("https://steptodown.com/wp-json/aio-dl/video-data/", data, {
      headers: {
        "cookie": "PHPSESSID=658754a80bacc095aced0be8e110f3b4; pll_language=en",
        "user-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {
      resolve(response.data)
    })
    .catch((e) => {
      reject(e)
    })
  })
}
let sonice = await aio(text)
let wpol = `[ *AIO DOWNLOADER* ]

${sonice.title}

Durasi: ${sonice.duration}
Source: ${sonice.source}
Size: ${sonice.medias[0].formattedSize} || ${sonice.medias[0].size}
Quality: ${sonice.medias[0].quality}
MimeType: ${sonice.medias[0].extension}
`
await sock.sendMessage(m.chat, { video: { url: sonice.medias[0].url }, caption: wpol }, { quoted: m })
}
break


case 'anilist': {
  if (!text) return m.reply("Example: .anilist naruto")
function anilist(query) {
  return new Promise((resolve, reject) => {
    axios.get('https://anilist.co/search/anime?search=' + query)
      .then(response => {
        const $ = cheerio.load(response.data);
        const anime = []
        const ling = []
        const image = []
        
        $('div.media-card a').each(function(a, b) {
          ling.push('https://anilist.co' + $(b).attr('href'))
        })
        
        $('div.media-card a img').each(function(a, b) {
          image.push($(b).attr('src'))
        })
        
        for (let i = 0; i < 10; i++) {
          const link = ling[i]
          const gambar = image[i]
          anime.push({
            link, gambar
          });
        }
        resolve(anime);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function anilistdetail(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');

    const animeData = {
      title,
      description
    };

    return animeData
  } catch (error) {
    console.error(error);
  }
}
const date = await anilist(text)
const kanjut = await anilistdetail(date[0].link)
sock.sendMessage(m.chat, {image: {url: `${date[0].gambar}`}, caption: `Hasil Pencarian Anime:

Judul: ${kanjut.title}
Deskripsi: ${kanjut.description}
Link: ${date[0].link}
`}, {quoted: m})
}
break

case 'ttstalk':{
//wm senn
async function tiktokStalk(user) {
    let res = await axios.get(`https://urlebird.com/user/${user}/`)
//wm senn
         let $ = cheerio.load(res.data), obj = {}
             obj.pp_user = $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src')
                 obj.name = $('h1.user').text().trim()
//wm senn
                 obj.username = $('div.content > h5').text().trim()
               obj.followers = $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1]
//wm senn
           obj.following = $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1]
//wm senn
     obj.description = $('div.content > p').text().trim()
  return obj
//wm senn
} 
if (!text) return m.reply(`Masukan nama pengguna!!\nExample ${prefix + command} sen.h`)
//wm senn
let data = await tiktokStalk(text)
let cap = `\`\`\`「 Tiktok Stalk 」\`\`\`

Nama : ${data.name}
Username : ${data.username}
Pengikut : ${data.followers}
Mengikuti : ${data.following}
Bio : ${data.description}
`

sock.sendMessage(m.chat, { image: { url: data.pp_user }, caption: cap }, { quoted: m })

}
break

case  'pin': {
  if (!text) return reply(`Example: .pin Nakano Ninoo`);
  await reply("Mohon tunggu kak");

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: {
        url
      }
    }, {
      upload: sock.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let res = data.resource_response.data.results.map(v => v.images.orig.url);

  shuffleArray(res);
  let ult = res.splice(0, 5); 
  let i = 1;

  for (let lucuy of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: global.namabot
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: 'Hasil.',
        hasMediaAttachment: true,
        imageMessage: await createImage(lucuy)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": `{"display_text":"Source","url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}","merchant_url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}"}`
          }
        ]
      })
    });
  }

  let bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "Done"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `Search: ${text} | Nama: ${pushname}`
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [
              ...push
            ]
          })
        })
      }
    }
  }, {});

  await sock.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });
  
}
        break
case "removebg": case "nobg": {
try {
    const media = await sock.downloadAndSaveMediaMessage(qmsg);
    let urlnj = await uploadUguu(media);
    let buuhv = await fetchJson(`https://widipe.com/removebg?url=${urlnj}`);
    const vbbjjhbbuub = buuhv.result.urls;
    await sock.sendMessage(m.chat, {
        image: { url: vbbjjhbbuub },
        caption: "Done",
    }, { quoted: m });

} catch (err) {
    console.error("Error during background removal:", err);
}
}
break
case 'tt2': {
  let input = `[!] *wrong input*
	
Ex : ${prefix + command} https://vt.tiktok.com/ZSFSqcuXb/`

    if (!text) return m.reply(input)
    
  if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
    if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
async function tiktokDl(url) {
	return new Promise(async (resolve, reject) => {
		try {
			let data = []
			function formatNumber(integer) {
				let numb = parseInt(integer)
				return Number(numb).toLocaleString().replace(/,/g, '.')
			}
			
			function formatDate(n, locale = 'en') {
				let d = new Date(n)
				return d.toLocaleDateString(locale, {
					weekday: 'long',
					day: 'numeric',
					month: 'long',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				})
			}
			
			let domain = 'https://www.tikwm.com/api/';
			let res = await (await axios.post(domain, {}, {
				headers: {
					'Accept': 'application/json, text/javascript, */*; q=0.01',
					'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Origin': 'https://www.tikwm.com',
					'Referer': 'https://www.tikwm.com/',
					'Sec-Ch-Ua': '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
					'Sec-Ch-Ua-Mobile': '?1',
					'Sec-Ch-Ua-Platform': 'Android',
					'Sec-Fetch-Dest': 'empty',
					'Sec-Fetch-Mode': 'cors',
					'Sec-Fetch-Site': 'same-origin',
					'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
					'X-Requested-With': 'XMLHttpRequest'
				},
				params: {
					url: url,
					count: 12,
					cursor: 0,
					web: 1,
					hd: 1
				}
			})).data.data
			if (res && !res.size && !res.wm_size && !res.hd_size) {
				res.images.map(v => {
					data.push({ type: 'photo', url: v })
				})
			} else {
				if (res && res.wmplay) {
					data.push({ type: 'watermark', url: 'https://www.tikwm.com' + res.wmplay })
				}
				if (res && res.play) {
					data.push({ type: 'nowatermark', url: 'https://www.tikwm.com' + res.play })
				}
				if (res && res.hdplay) {
					data.push({ type: 'nowatermark_hd', url: 'https://www.tikwm.com' + res.hdplay })
				}
			}
			let json = {
				status: true,
				title: res.title,
				taken_at: formatDate(res.create_time).replace('1970', ''),
				region: res.region,
				id: res.id,
				durations: res.duration,
				duration: res.duration + ' Seconds',
				cover: 'https://www.tikwm.com' + res.cover,
				size_wm: res.wm_size,
				size_nowm: res.size,
				size_nowm_hd: res.hd_size,
				data: data,
				music_info: {
					id: res.music_info.id,
					title: res.music_info.title,
					author: res.music_info.author,
					album: res.music_info.album ? res.music_info.album : null,
					url: 'https://www.tikwm.com' + res.music || res.music_info.play
				},
				stats: {
					views: formatNumber(res.play_count),
					likes: formatNumber(res.digg_count),
					comment: formatNumber(res.comment_count),
					share: formatNumber(res.share_count),
					download: formatNumber(res.download_count)
				},
				author: {
					id: res.author.id,
					fullname: res.author.unique_id,
					nickname: res.author.nickname,
					avatar: 'https://www.tikwm.com' + res.author.avatar
				}
			}
			resolve(json)
		} catch (e) {
			reject(e)
		}
	});
}
let down = await tiktokDl(text)
let berak = `[ *TIKTOK DOWNLOADER* ]

Videos:
Judul: ${down.title}
Server: ${down.region}
ID: ${down.id}
Durasi: ${down.duration}
Size: ${down.size_nowm_hd}

Music Info:
ID: ${down.music_info.id}
Judul: ${down.music_info.title}
Pemilik Musik: ${down.music_info.author}

Stats: 
Views: ${down.stats.views}
Likes: ${down.stats.likes}
Comment: ${down.stats.comment}
Share: ${down.stats.share}
Download: ${down.stats.download}

Author: 
ID: ${down.author.id}
Full Name: ${down.author.fullname}
Nickname: ${down.author.nickname}
Avatar: ${down.author.avatar}
`
await sock.sendMessage(m.chat, { video: { url: down.data[2].url }, caption: berak }, { quoted: m })
await sock.sendMessage(m.chat, { audio: { url: down.music_info.url }, mimetype: "audio/mp4", ptt: true }, { quoted: m })
}
break
case 'tiktok':
case 'tt': {
if (args.length == 0) return reply(`Example: ${prefix + command} link lu`)
const api = require('btch-downloader')
if (!args[0]) return reply(`Masukan URL!\n\ncontoh:\n${prefix + command} https://vm.tiktok.com/ZGJAmhSrp/`);
if (!args[0].match(/tiktok/gi)) return reply(`URL Yang Tuan Berikan *Salah!!!*`);
try {
let maximus = await api.ttdl(args[0]);
let caption = `乂 *T I K T O K  D O W N L O A D* 

• *ɴᴀᴍᴀ ᴠɪᴅᴇᴏs:* 
${maximus.title}

• *ɴᴀᴍᴀ ᴀᴜᴅɪᴏ:* 
${maximus.title_audio}

${global.namabot}`;
await sock.sendMessage(m.chat, { video: { url: maximus.video[0] }, caption: caption })
await sock.sendMessage(m.chat, { audio: { url: maximus.audio[0] }, mimetype: "audio/mpeg", ptt: true }, { quoted: m })
      } catch (e) {
		console.log(e)
		reply(e)
	}
}
break


case 'igvid': case 'igmp4': case 'igdl':{
    if (!text) return m.reply(`Anda perlu memberikan URL video, reel`);
   // reply (msg.wait)
    let res;
    try {
        res = await fetch(`https://widipe.com/download/igdl?url=${encodeURIComponent(text)}`);
    } catch (error) {
        return m.reply(`An error occurred: ${error.message}`);
    }

    let api_response;
    try {
        api_response = await res.json();
    } catch (error) {
        return m.reply(`Failed to parse API response: ${error.message}`);
    }

    if (!api_response || !api_response.result || api_response.result.length === 0) {
        return m.reply(`No video or image found or Invalid response from API.`);
    }

try {
    const mediaData = api_response.result[0]; // Ambil elemen pertama dari array result
    //const mediaType = mediaData.thumbnail ? 'image' : 'video'; // Periksa apakah thumbnail ada
    const mediaURL = mediaData.url;
    const cap = `HERE IS THE VIDEO`;

            await sock.sendMessage(m.chat, { video: { url: mediaURL }, caption: cap }, { quoted: m });
        
    } catch (error) {
        return m.reply(`Failed to send media: ${error}`);
    }
}
break


case 'nglspam': {
if (!isOwner) return reply(msg.owner)
    if (!text.split("|")[0] || !text.split("|")[1] || !text.split("|")[2]) {
        return m.reply("Masukan username, pesan, dan jumlah spam!\nContoh: .nglspam Mirai|haloo|5");
    }
async function sendSpamMessage(username, message, spamCount) {
    let counter = 0;
    while (counter < spamCount) {
        try {
            const date = new Date();
            const minutes = date.getMinutes();
            const hours = date.getHours();
            const formattedDate = `${hours}:${minutes}`;
            const deviceId = crypto.randomBytes(21).toString('hex');
            const url = 'https://ngl.link/api/submit';
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Referer': `https://ngl.link/${username}`,
                'Origin': 'https://ngl.link'
            };
            const body = `username=${username}&question=${message}&deviceId=${deviceId}&gameSlug=&referrer=`;

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
                mode: 'cors',
                credentials: 'include'
            });

            if (response.status !== 200) {
                console.log(`[${formattedDate}] [Err] Ratelimited`);
                await new Promise(resolve => setTimeout(resolve, 25000));
            } else {
                counter++;
                console.log(`[${formattedDate}] [Msg] Sent: ${counter}`);
            }
        } catch (error) {
            console.error(`[${formattedDate}] [Err] ${error}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};
    const [username, message, count] = text.split("|");
    const spamCount = parseInt(count, 10);

    if (isNaN(spamCount) || spamCount <= 0) {
        return m.reply("Jumlah spam harus berupa angka positif!");
    }

    try {
        await sendSpamMessage(username, message, spamCount);
        m.reply(`Sukses mengirim ${spamCount} pesan NGL ke ${username}`);
    } catch (e) {
        console.error(e); // Menambahkan logging error untuk debug
        return m.reply("Fitur error, coba lagi nanti.");
    }
}
break
case "setgc": case "statusgc": {
//if (!isGroup) return reply(msg.group)
//if (!isOwner && !isAdmin) return reply(msg.admin)
let teksnya = `Silahkan Pilih Tombol Options Settingan Grup Di Bawah Ini`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender]
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teksnya
}), 
footer: proto.Message.InteractiveMessage.Footer.create({
 text: `© Powered By ${namabot}`
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "single_select",
"buttonParamsJson": `{ title : "Klik Disini",
sections: [{
title: "Welcome Options || Status :  "Aktif ✅" : "Tidak Aktif ❌"}",
rows: [{ title: "ON Welcome", description: "Pilih Opsi Ini Untuk Mengaktifkan Welcome", id: ".open" }, 
{ title: "OFF Welcome", description: "Pilih Opsi Ini Untuk Mematikan Welcome", id: ".close" }]
}]}`
}]
})
})} 
}}, {userJid: m.sender, quoted: qtext2}) 
await sock.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
}
break
case "kik": case "kick": {

if (!isGroup) return 
if (!isBotAdmin) return 
if (!isOwner) return 
if (text || m.quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sock.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => sock.sendMessage(m.chat, {text: `Berhasil Mengeluarkan @${users.split("@")[0]} Dari Grup Ini`, mentions: [`${users}`]}, {quoted: m})).catch((err) => m.reply(err.toString()))
} else return m.reply(example('nomornya/@tag'))}
break
case "hidetag": case "z": case "h": {

if (!isGroup) return 
if (!isOwner) return 
if (!m.quoted && !text) return m.reply(example("teksnya/replyteks"))
var teks = m.quoted ? m.quoted.text : text
var member = await groupMetadata.participants.map(e => e.id)
sock.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break
case "open": {

if (!isGroup) return 
if (!isBotAdmin) return 
if (!isOwner) return 
await sock.groupSettingUpdate(m.chat, 'not_announcement')
m.reply("Berhasil Mengganti Setelan Grup Menjadi Anggota Dapat Mengirim Pesan")
}
break
case "close": {

if (!isGroup) return 
if (!isBotAdmin) return 
if (!isOwner) return 
await sock.groupSettingUpdate(m.chat, 'announcement')
m.reply("Berhasil Mengganti Setelan Grup Menjadi Hanya Admin Yang Dapat Mengirim Pesan")
}
break
case "del": case "delete": {

if (isGroup) {
if (!isOwner) return 
if (m.quoted.sender == botNumber) {
sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender}})
} else {
if (!isBotAdmin) return 
sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender}})
}} else {
if (!isOwner) return 
sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender}})
}}
break
case 'kickall': {
 if (!m.isGroup) return m.reply('Fitur Khusus Group!')
 if (!isCreator) return m.reply('Fitur Khusus Owner & Admin!')
 if (!isBotAdmin) return m.reply('Saya Bukan Admin grup!')
  const kickall = (args[0] === 'numBut')
  ? text.replace(`${args[0]} `, '').split('|')
  : (Number(args[0]))
    ? groupMetadata.participants
      .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${owner}@s.whatsapp.net`)
      .map(item => item.id)
    : groupMetadata.participants
      .filter(item => item.id !== botNumber && item.id !== `${owner}@s.whatsapp.net`)
      .map(item => item.id);
 if (global.welcome === true) {
 welcome = false;
  }
 for (let remove of kickall) {
 await sock.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${remove}@s.whatsapp.net` : remove], "remove");
 await sleep(3000);
 }
 m.reply(`Success`);
}
break
case "ambilq": {
let jsonData = JSON.stringify({ [m.quoted.mtype]: m.quoted }, null, 2)
RuzReply(jsonData)
}
break


case 'spampairing': {
if (!isOwner) return
if (!text) return reply(`*Example:* ${prefix + command} +628xxxxxx|150`)
loading()
let [peenis, pepekk = "200"] = text.split("|")

let target = peenis.replace(/[^0-9]/g, '').trim()
let { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
let { state } = await useMultiFileAuthState('pepek')
let { version } = await fetchLatestBaileysVersion()
let pino = require("pino")
let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) })

for (let i = 0; i < pepekk; i++) {
await sleep(1500)
let prc = await sucked.requestPairingCode(target)
await console.log(`_Succes Spam Pairing Code - Number : ${target} - Code : ${prc}_`)
}
await sleep(15000)
}
break

case 'poll': {
//await loading()
if (!isOwner) return
            const content = args.join(' ');
            if (!content.includes('|')) {
                //reply(from, 'Format salah! Gunakan: .bpol pertanyaan|opsi1|opsi2|...', edit: 'abc' );
                return;
            }
               // Hapus pesan awal (".poll")
        await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.key.id } });
          
                    // Kirim tag semua peserta terlebih dahulu
        /*await sock.sendMessage(
            m.chat,
            {
                text: '📢 Polling baru dimulai! Yuk, ikuti polling ini.',
                mentions: participants // Menyebut semua peserta
            }
        );*/
        await RuzReply('Polling baru dimulai! Yuk, ikuti polling ini.')
            await createPoll(sock, m, sender, content);
            }
            break;


case 'public': {
if (!isOwner) return reply('owner')
sock.public = true
reply('Sukses Change To Public')
}
break

case 'self': {
if (!isOwner) return reply('owner')
sock.public = false
reply('Sukses Change To Self')
}
break

/*
case 'p': 
sock.sendMessage(from, { text: 'oi' }, { quoted: qtext2 })
break

case 'pa': {

sock.sendMessage(from, { text: 'oi' }, { quoted: qtext })
break
}
case 'pi':{
sock.sendMessage(from, { text: 'oi' }, { quoted: qlive })
break
}

case 'po':{

sock.sendMessage(from, { text: 'oi' }, { quoted: qaudio })
break
}*/
case 'listhijau': {
if (!isCreator) return
    await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.key.id } });
    // Ambil tanggal sekarang
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options); // Format: Kamis, 20 November 2024
    // Kirim pesan ke grup/chat
    //m.reply(listMessage);
    sock.sendMessage(m.chat, { text: hadir.bajuhijau, mentions: participants });
    break;
}

case 'listputih': {
if (!isCreator) return
    await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.key.id } });
    // Ambil tanggal sekarang
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options); // Format: Kamis, 20 November 2024
    // Kirim pesan ke grup/chat
    //m.reply(listMessage);
    sock.sendMessage(m.chat, { text: hadir.bajuputih, mentions: participants });
    break;
}


    case 'cekmode': {
    const mode = `*Mode : ${sock.public ? `sock.public` : `sock.self`}*\nmode ${currentMode.toUpperCase() ? `self` : `public`}`
    reply(mode)
    }
    break
    
    // Perintah untuk mengatur mode
case 'mode': {
    // Periksa apakah pengguna menyertakan argumen
    const mode = text.toLowerCase(); // Argumen setelah perintah `.mode`
    if (!mode) {
        return m.reply(`🔍 Mode saat ini: *${currentMode.toUpperCase()}*\nGunakan perintah:\n.mode self - untuk mode hanya owner\n.mode public - untuk semua pengguna`);
    }
    // Hanya owner yang dapat mengubah mode
    if (!isCreator) {
        return m.reply('❌ Anda tidak memiliki izin untuk mengubah mode bot.');
    }
    // Ubah mode sesuai argumen
    if (mode === 'self') {
        if (currentMode === 'self') {
            m.reply('🚫 Mode sudah dalam status *SELF*.');
        } else {
            currentMode = 'self';
            saveMode();
            m.reply('✅ Mode berhasil diubah ke *SELF*.');
        }
    } else if (mode === 'public') {
        if (currentMode === 'public') {
            m.reply('🚫 Mode sudah dalam status *PUBLIC*.');
        } else {
            currentMode = 'public';
            saveMode();
            m.reply('✅ Mode berhasil diubah ke *PUBLIC*.');
        }
    } else {
        m.reply('❌ Format salah. Gunakan:\n.mode self\n.mode public');
    }
    break;
}

case 'restart': case 'res': case 'r': {
    // Periksa apakah pengirim adalah owner
    if (!isCreator) return

    // Kirim pesan konfirmasi
    await console.log("♻️ Bot sedang di-restart...");

    // Mulai ulang bot
    restartBot();
    break;
}

case 'getallgroups': {
    if (!isCreator) return
    const ownerNumber = owner + '@s.whatsapp.net'; // Nomor owner
    try {
        // Ambil semua ID grup yang diikuti bot
        const groups = await sock.groupFetchAllParticipating();
        const groupList = Object.values(groups).map(group => {
            return `📛 *Nama Grup:* ${group.subject}\n🆔 *ID Grup:* ${group.id}`;
        }).join('\n\n');

        const message = `📋 *Daftar Grup yang Diikuti Bot:*\n\n${groupList}`;

        // Kirim pesan ke owner
        await sock.sendMessage(ownerNumber, { text: message });
        console.log(`✅ Daftar grup berhasil dikirim ke owner:\n${message}`);
        m.reply('✅ Daftar grup berhasil dikirim ke chat owner.');
    } catch (error) {
        console.error('❌ Gagal mengambil daftar grup:', error);
        //m.reply('❌ Terjadi kesalahan saat mengambil daftar grup.');
    }
    break;
}

default:

/**
*
*`[ Respon Sticker ]`
*
**/
/*if ((budy.match) && ["kak", "woy", "mek", "jawir", "y", "dah", "yaudah", "bang", "bg", "Bang", "Bg", "Ajg", "ajg", "kontol", "Kontol", "puki", "Puki", "yatim", "Yatim", "memek", "Memek", "asu", "Asu", "ngtd", "Ngtd"].includes(budy)) {
var stik = await fetchJson('https://raw.githubusercontent.com/tanakasenn/Database-Json/refs/heads/main/StickerRespon.json')
var pick = pickRandom(stik)
sock.sendImageAsSticker(m.chat, pick.url, m, { packname: global.namabot, author: global.namaowner })
}*/




}} catch (e) {
console.log(e)
//sock.sendMessage(`${owner}@s.whatsapp.net`, {text:`${util.format(e)}\nCommand From : ${m.sender.split("@")[0]}`}, {quoted: m})
sleep(2000)
}}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})