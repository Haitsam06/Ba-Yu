const fs = require('fs');
const path = require('path');

const laravelLangDir = path.join(__dirname, 'lang');

const footerTranslations = {
  id: "Jika Anda kesulitan mengklik tombol \":actionText\", salin dan tempel URL di bawah ini\nke browser web Anda:",
  en: "If you're having trouble clicking the \":actionText\" button, copy and paste the URL below\ninto your web browser:",
  ko: "\":actionText\" 버튼을 클릭하는 데 문제가 있는 경우, 아래 URL을 복사하여\n웹 브라우저에 붙여넣으세요:",
  ja: "\":actionText\" ボタンのクリックで問題が発生した場合は、以下のURLをコピーして\nWebブラウザに貼り付けてください:",
  zh: "如果您在点击 \":actionText\" 按钮时遇到问题，请复制以下 URL\n并将其粘贴到您的网络浏览器中:",
  de: "Wenn Sie Probleme beim Klicken auf die Schaltfläche \":actionText\" haben, kopieren Sie die folgende URL\nund fügen Sie sie in Ihren Webbrowser ein:",
  fr: "Si vous rencontrez des problèmes pour cliquer sur le bouton \":actionText\", copiez et collez l'URL ci-dessous\ndans votre navigateur Web:",
  es: "Si tiene problemas para hacer clic en el botón \":actionText\", copie y pegue la siguiente URL\nen su navegador web:",
  pt: "Se você estiver com problemas para clicar no botão \":actionText\", copie e cole o URL abaixo\nem seu navegador da web:",
  ru: "Если у вас возникли проблемы с нажатием кнопки \":actionText\", скопируйте и вставьте приведенный ниже URL-адрес\nв свой веб-браузер:"
};

const greetings = {
  id: "Halo :name!",
  en: "Hello :name!",
  ko: "안녕하세요 :name님!",
  ja: "こんにちは :nameさん！",
  zh: "你好 :name！",
  de: "Hallo :name!",
  fr: "Bonjour :name!",
  es: "¡Hola :name!",
  pt: "Olá :name!",
  ru: "Привет :name!"
};

const regards = {
  id: "Salam hangat,",
  en: "Best regards,",
  ko: "감사합니다,",
  ja: "よろしくお願いいたします。",
  zh: "此致，",
  de: "Mit freundlichen Grüßen,",
  fr: "Cordialement,",
  es: "Saludos cordiales,",
  pt: "Atenciosamente,",
  ru: "С наилучшими пожеланиями,"
};

Object.entries(footerTranslations).forEach(([langCode, footerText]) => {
  // Update Laravel JSON language file
  const jsonPath = path.join(laravelLangDir, `${langCode}.json`);
  let jsonData = {};
  if (fs.existsSync(jsonPath)) {
    jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }
  jsonData["If you're having trouble clicking the \":actionText\" button, copy and paste the URL below\ninto your web browser:"] = footerText;
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));

  // Update email.php
  const emailPhpPath = path.join(laravelLangDir, langCode, 'email.php');
  if (fs.existsSync(emailPhpPath)) {
    let phpContent = fs.readFileSync(emailPhpPath, 'utf8');
    
    // Check if greeting exists
    if (!phpContent.includes("'greeting'")) {
      phpContent = phpContent.replace(
        "return [", 
        `return [\n    'greeting' => '${greetings[langCode]}',\n    'regards' => '${regards[langCode]}',`
      );
      fs.writeFileSync(emailPhpPath, phpContent);
    }
  }
});

console.log("Updated Laravel email translations.");
