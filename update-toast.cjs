const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const newLocales = {
  id: "Tautan atur ulang kata sandi telah dikirim ke email Anda.",
  en: "Password reset link has been sent to your email.",
  ko: "비밀번호 재설정 링크가 이메일로 전송되었습니다.",
  ja: "パスワードリセットリンクがメールに送信されました。",
  zh: "密码重置链接已发送至您的电子邮箱。",
  de: "Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.",
  fr: "Le lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.",
  es: "El enlace para restablecer la contraseña se ha enviado a su correo electrónico.",
  pt: "O link de redefinição de senha foi enviado para seu e-mail.",
  ru: "Ссылка для сброса пароля отправлена на вашу электронную почту."
};

Object.entries(newLocales).forEach(([lang, text]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.forgot_password) data.forgot_password = {};
    
    data.forgot_password.reset_sent = text;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
