//Ini ku enc wir tapi gak terlalu ngaruh sih soalnya ini cuman function nya aja, kalian bisa setting nya di adiwConfig. kenapa ini gua enc karena ya supaya jb gak bisa juwal juwal sembarangan anyink🗿. mau no enc langsung chat gw aja 6285691304150


const fs = require("fs");
const chalk = require("chalk");
const config = require("./adiwConfig");

let approvalTimeout;
async function checkApproval() {
  if (fs.existsSync(config.filePath)) {
    if (approvalTimeout) {
      clearTimeout(approvalTimeout);
    }
    return;
  } else {
    console.log(chalk.blue.bold("Script Membutuhkan Persetujuan Dari Creator, Jika Kamu Sudah Membeli Script Dari " + chalk.yellow.bold("(Creator)") + " Maka Akan Otomatis Di Setujui!"));
    console.log(chalk.cyan.bold("Credits: FallZx"));
    approvalTimeout = setTimeout(() => {
      if (fs.existsSync(config.filePath)) {
        clearTimeout(approvalTimeout);
      } else {
        console.log(chalk.red.bold("Script tidak disetujui oleh creator (jika script sudah disetujui restart agar script berjalan lancar)"));
        process.exit(1);
      }
    }, 60000);
  }
}

async function approveScript(senderNum, approvalCode) {
  if (senderNum.includes(config.approval.num)) {
    if (!fs.existsSync(config.filePath)) {
      fs.writeFileSync(config.filePath, approvalCode);
      console.log(chalk.green.bold("Script disetujui oleh creator, Silahkan Ulang Atau Restart Script!, Terimakasih Sudah Membeli Script Ini Langsung Ke Creator"));
      console.log(chalk.cyan.bold("Credits: FallZx"));
      if (approvalTimeout) {
        clearTimeout(approvalTimeout);
      }
    } else if (approvalTimeout) {
      clearTimeout(approvalTimeout);
    }
  } else {
    console.log(chalk.red.bold("Nomor pengirim tidak sesuai"));
  }
}

async function isApproved() {
  return fs.existsSync(config.filePath);
}

async function validateApprovalData(approvalData) {
  async function getApprovalCode() {
    return new Promise((resolve, reject) => {
      fs.readFile(config.filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.toString());
      });
    });
  }
  const savedApprovalCode = await getApprovalCode();
  if (savedApprovalCode !== approvalData) {
    await fs.unlinkSync(config.filePath);
    await checkApproval();
  }
}

async function checkScriptIntegrity() {
  try {
    const scriptData = fs.readFileSync(config.checkFilePath, "utf8");
    if (!scriptData.includes(config.codeToDetect)) {
      console.log(chalk.red.bold("Terjadi Error, Mungkin Kode Approval Terhapus?, Jika Iya Silahkan Hubungi Creator Untuk Memperbaiki. Jika Tidak Ada Kode Approval Maka Script Tidak Bisa Dijalankan"));
      console.log(chalk.cyan.bold("Credits: FallZx"));
      process.exit(1);
    }
  } catch (error) {
    return;
  }
}

const scriptSecurity = {
  checkApproval,
  approveScript,
  isApproved,
  validateApprovalData,
  checkScriptIntegrity,
  approvalTimeout
};

module.exports = scriptSecurity;
console.log(chalk.cyan.bold("Module scriptSecurity loaded successfully - Credits: FallZx"));
