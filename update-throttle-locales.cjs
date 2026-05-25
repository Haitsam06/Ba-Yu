const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = {
  id: "Silakan tunggu beberapa saat (60 detik) sebelum mencoba lagi.",
  en: "Please wait a moment (60 seconds) before retrying.",
  ko: "다시 시도하기 전에 잠시(60초) 기다려 주십시오.",
  ja: "再試行する前に少し(60秒)お待ちください。",
  zh: "请稍等（60秒）后再试。",
  de: "Bitte warten Sie einen Moment (60 Sekunden), bevor Sie es erneut versuchen.",
  fr: "Veuillez patienter un instant (60 secondes) avant de réessayer.",
  es: "Por favor, espere un momento (60 segundos) antes de volver a intentarlo.",
  pt: "Por favor, aguarde um momento (60 segundos) antes de tentar novamente.",
  ru: "Пожалуйста, подождите немного (60 секунд) перед повторной попыткой."
};

Object.entries(locales).forEach(([lang, text]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.auth_modal) {
      data.auth_modal = {};
    }
    data.auth_modal.reset_throttled = text;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
