// BASE CREATE BY Ruztan
/* JANGAN DI HPS HARGAI GOBLOK

• APA BILAH KEHAPUS CREDITS MAKA DI ANGGAP DOSA BESAR 

Base ini telah di Fix dan diperbarui oleh FallZx-Infinty-Tzy 
Terimakasih Ruztan.
*/

require("./all/global")
const func = require("./all/place")
const readline = require("readline")
const chalk = require('chalk')
const CFonts = require('cfonts')
const welcome = JSON.parse(fs.readFileSync("./all/database/welcome.json"))
const { getBuffer } = require('./all/myfunc')
const NodeCache = require("node-cache")
const msgRetryCounterCache = new NodeCache()
const yargs = require('yargs/yargs')
const _ = require('lodash')
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
})
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
CFonts.say(` `)
CFonts.say(`kenami`, {
   font: 'block',
  align: 'left',
  colors: ['cyan'],

});

console.log(chalk.black(chalk.bgCyan(`• Tetaplah Terlihat\n${chalk.bgBlue("• Walau Tidak Di Anggap :v")}`)))
return new Promise((resolve) => {
rl.question(text, resolve)
})}

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()

const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Android","Safari","20.0.04"],
getMessage: async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'WhatsApp Bot By Mirai'
}}
}

const sock = func.makeWASocket(connectionOptions)
if (usePairingCode && !sock.authState.creds.registered) {
var phoneNumber = await question(chalk.black(chalk.bgCyan(`\nSILAHKAN MASUKAN NOMOR AWALI DENGAN 62:\n`)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
var code = await sock.requestPairingCode(phoneNumber.trim())
code = code?.match(/.{1,4}/g)?.join("-") || code
console.log(chalk.black(chalk.bgCyan(`Your Pairing Code : `)), chalk.black(chalk.bgWhite(code)))
}

sock.ev.on('creds.update', await saveCreds)
store?.bind(sock.ev)

sock.ev.on('call', async (user) => {
if (!global.anticall) return
let botNumber = await sock.decodeJid(sock.user.id)
for (let ff of user) {
if (ff.isGroup == false) {
if (ff.status == "offer") {
let sendcall = await sock.sendMessage(ff.from, {text: `@${ff.from.split("@")[0]} Maaf Kamu Akan Saya Block Karna Ownerbot Menyalakan Fitur *Anticall*\nJika Tidak Sengaja Segera Hubungi Owner Untuk Membuka Blokiran Ini`, contextInfo: {mentionedJid: [ff.from], externalAdReply: {thumbnailUrl: global.imgreply, title: "乂 Panggilan Terdeteksi", body: "Powered By "+global.namabot, previewType: "PHOTO"}}}, {quoted: null})
sock.sendContact(ff.from, [owner], "Telfon Atau Vc = Block", sendcall)
await sleep(7000)
await sock.updateBlockStatus(ff.from, "block")
}}
}})

sock.public = true

sock.ev.on('messages.upsert', async (chatUpdate) => {
try {
//console.log('Message upsertreceived:', chatUpdate)
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') {
if (global.autoreadsw) sock.readMessages([m.key])
}
//if (!sock.public && m.key.remoteJid !== "6289531400176@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') { console.log('Ignoring message because bot is in self mode and not from owner:', m.key.remoteJid) return }
if (!sock.public && m.key.remoteJid !== "6289531400176@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') {
console.log('Ignoring message because bot is in self mode and not from owner:', m.key.remoteJid) 
return
}

if (m.isBaileys) return
if (global.autoread) sock.readMessages([m.key])
m = func.smsg(sock, m, store)
require("./setting/Mirai.js")(sock, m, store)
} catch (err) {
console.log(err)
}
})

sock.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await sock.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}


sock.ev.on('group-participants.update', async (anu) => {
if (!welcome.includes(anu.id)) return
let botNumber = await sock.decodeJid(sock.user.id)
if (anu.participants.includes(botNumber)) return
try {
let metadata = await sock.groupMetadata(anu.id)
let namagc = metadata.subject
let participants = anu.participants
for (let num of participants) {
let check = anu.author !== num && anu.author.length > 1
let tag = check ? [anu.author, num] : [num]
try {
ppuser = await sock.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://pomf2.lain.la/f/7zm6e3wx.jpg'
}
if (anu.action == 'add') {
sock.sendMessage(anu.id, {text: check ? `@${anu.author.split("@")[0]} Telah Menambahkan @${num.split("@")[0]} Ke Dalam Grup Ini`:

`Hallo Kak @${num.split("@")[0]} Selamat Datang Di *${namagc}*

`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Welcome Message', body: '', renderLargerThumbnail: true, sourceUrl: "https://chat.whatsapp.com/LvuFe20VLrc2Y1NrsRUe1i", mediaType: 1}}})
} 
if (anu.action == 'remove') { 
sock.sendMessage(anu.id, {text: check ? `@${anu.author.split("@")[0]} Telah Mengeluarkan @${num.split("@")[0]} Dari Grup Ini`:

`@${num.split("@")[0]} Telah Keluar Dari Grup Ini`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Leaving Message', body: '', renderLargerThumbnail: true, sourceUrl: "https://chat.whatsapp.com/LvuFe20VLrc2Y1NrsRUe1i", mediaType: 1}}})
}
if (anu.action == "promote") {
sock.sendMessage(anu.id, {text: `@${anu.author.split("@")[0]} Telah Menjadikan @${num.split("@")[0]} Sebagai Admin Grup Ini`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Promote Message', body: '', renderLargerThumbnail: true, sourceUrl: "https://chat.whatsapp.com/LvuFe20VLrc2Y1NrsRUe1i", mediaType: 1}}})
}
if (anu.action == "demote") {
sock.sendMessage(anu.id, {text: `@${anu.author.split("@")[0]} Telah Memberhentikan @${num.split("@")[0]} Sebagai Admin Grup Ini`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Demote Message', body: '', renderLargerThumbnail: true, sourceUrl: "https://chat.whatsapp.com/LvuFe20VLrc2Y1NrsRUe1i", mediaType: 1}}})
}
} 
} catch (err) {
console.log(err)
}})

sock.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
sock.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
sock.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
console.log(color('Menghubungkan . . . '))
} else if (connection === "open") {
let teksnotif = `*Mirai MD Aktif Boss*
Connected To ${sock.user.id.split(":")[0]}`
//sock.sendMessage(global.owner+"@s.whatsapp.net", {text: teksnotif})
console.log(color('Bot Berhasil Tersambung'))
}
})

return sock
}

startSesi()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})