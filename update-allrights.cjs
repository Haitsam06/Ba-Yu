const fs = require('fs');
const path = require('path');

const laravelLangDir = path.join(__dirname, 'lang');

const translations = {
  id: "Hak cipta dilindungi undang-undang.",
  en: "All rights reserved.",
  ko: "판권 소유.",
  ja: "無断転載を禁じます。",
  zh: "版权所有。",
  de: "Alle Rechte vorbehalten.",
  fr: "Tous droits réservés.",
  es: "Todos los derechos reservados.",
  pt: "Todos os direitos reservados.",
  ru: "Все права защищены."
};

Object.entries(translations).forEach(([langCode, text]) => {
  const jsonPath = path.join(laravelLangDir, `${langCode}.json`);
  let jsonData = {};
  if (fs.existsSync(jsonPath)) {
    jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }
  jsonData["All rights reserved."] = text;
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
});

console.log("Updated All rights reserved.");
