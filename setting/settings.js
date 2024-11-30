// BASE CREATE BY RUZTANXD 
/* JANGAN DI HPS HARGAI GOBLOK

• APA BILAH KEHAPUS CREDITS MAKA DI ANGGAP DOSA BESAR 

# RuztanXD Bukan Sepuh ataupun Pengocok jandal RuztanXD cuma mau di anggap ada:) */


require("../all/module.js")
const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options); // Format: Kamis, 20 November 2024
    
//========== Setting Owner ==========//
global.owner = "6289531400176"
global.idsaluran = "123@newsletter"
global.namaowner = "kenami"
global.namabot = "WhatsApp"
global.linkyt = '-'
//SAWERIA 
global.mail = 'abc@gmail.com' // 

//========== Setting Event ==========//
global.autoread = false
global.anticall = false
global.autoreadsw = false
global.owneroff = false
global.autopromosi = false


//========== Setting Foto ===========//
global.imgreply = "https://pomf2.lain.la/f/8ajgk61k.jpg" //"https://pomf2.lain.la/f/7cebsj9s.jpg"
global.thumb = "https://pomf2.lain.la/f/1fx3tz3i.jpg" //"https://pomf2.lain.la/f/k4d4saha.jpg"
//global.imgmenu = fs.readFileSync("./media/Menu.jpg")


//========== SERVER PRIVATE RUZTANXD==========//
global.domainn = "-"
global.apikeyy = "-"
global.capikeyy = "-"

//========== Setting Panell ==========//
global.eggsnya = '15' // id eggs yang dipakai kalo id nya 5 biarin aja ini jangan di ubah
global.location = '1' // id location
global.limitawal = 5

global.domain = '-' // Isi Domain Lu
global.apikey = '-' // Isi Apikey Plta Lu
global.capikey = '-' // Isi Apikey Pltc Lu

//========= Setting Payment =========//
//Kalo Gak Ada Isi Aja jadi "Gak Ada"
global.dana = "-"
global.gopay = "-"
global.ovo = "-"
global.qris = "-"
                             

//========= Setting Message =========//
global.msg = {
"error": "Error terjasi kesalahan",
"done": "Done Kak ✅", 
"wait": "⏳Memproses . . .", 
"group": "Command Ini Hanya Untuk Didalam Grup", 
"private": "Command Ini Hanya Untuk Di Private Chat", 
"admin": "Command Ini Hanya Untuk Admin Grup", 
"adminbot": "Command Ini Dapat Di Gunakan Ketika Bot Menjadi Admin", 
"owner": "Maaf Command Ini Hanya Untuk Owner Bot", 
"developer": "Command Ini Hanya Untuk Developer Bot!"
}

global.hadir = {
"bajuhijau": `📋 *List personil yg hadir Yasinan ${formattedDate}*

*Vokal*
1. 
2. 
3. 
4. 

*Hadroh*
1. 
2. 
3. 
4. 
5. 
6. 

*Bass*
1. 

*Tam*
1. 

*Calti*
1. 


📌 *Noted:*
*Tikum di musholla ba'da maghrib 18.00 cek sound 18.15*
*Dresscode hijau* 🟢`,

"bajuputih": `📋 *List personil yg hadir Yasinan ${formattedDate}*

*Vokal*
1. 
2. 
3. 
4. 

*Hadroh*
1. 
2. 
3. 
4. 
5. 
6. 

*Bass*
1. 

*Tam*
1. 

*Calti*
1. 


📌 *Noted:*
*Tikum di musholla ba'da maghrib 18.00 cek sound 18.15*
*Dresscode putih* ⚪`
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})