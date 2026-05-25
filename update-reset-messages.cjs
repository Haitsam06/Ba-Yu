const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const newLocales = {
  id: {
    "auth_modal.reset_sent": "Tautan atur ulang kata sandi telah dikirim ke email Anda.",
    "reset_password.error_token": "Tautan atur ulang tidak valid atau sudah kedaluwarsa.",
    "reset_password.error_user": "Pengguna dengan email ini tidak ditemukan."
  },
  en: {
    "auth_modal.reset_sent": "Password reset link has been sent to your email.",
    "reset_password.error_token": "The reset link is invalid or has expired.",
    "reset_password.error_user": "User with this email cannot be found."
  },
  ko: {
    "auth_modal.reset_sent": "비밀번호 재설정 링크가 이메일로 전송되었습니다.",
    "reset_password.error_token": "재설정 링크가 유효하지 않거나 만료되었습니다.",
    "reset_password.error_user": "이 이메일을 가진 사용자를 찾을 수 없습니다."
  },
  ja: {
    "auth_modal.reset_sent": "パスワードリセットリンクがメールに送信されました。",
    "reset_password.error_token": "リセットリンクが無効または期限切れです。",
    "reset_password.error_user": "このメールアドレスを持つユーザーは見つかりません。"
  },
  zh: {
    "auth_modal.reset_sent": "密码重置链接已发送至您的电子邮箱。",
    "reset_password.error_token": "重置链接无效或已过期。",
    "reset_password.error_user": "找不到使用此邮箱的用户。"
  },
  de: {
    "auth_modal.reset_sent": "Der Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.",
    "reset_password.error_token": "Der Link zum Zurücksetzen ist ungültig oder abgelaufen.",
    "reset_password.error_user": "Benutzer mit dieser E-Mail konnte nicht gefunden werden."
  },
  fr: {
    "auth_modal.reset_sent": "Le lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.",
    "reset_password.error_token": "Le lien de réinitialisation est invalide ou a expiré.",
    "reset_password.error_user": "Aucun utilisateur avec cet e-mail n'a été trouvé."
  },
  es: {
    "auth_modal.reset_sent": "El enlace para restablecer la contraseña se ha enviado a su correo electrónico.",
    "reset_password.error_token": "El enlace de restablecimiento no es válido o ha caducado.",
    "reset_password.error_user": "No se puede encontrar un usuario con este correo electrónico."
  },
  pt: {
    "auth_modal.reset_sent": "O link de redefinição de senha foi enviado para seu e-mail.",
    "reset_password.error_token": "O link de redefinição é inválido ou expirou.",
    "reset_password.error_user": "Usuário com este e-mail não pode ser encontrado."
  },
  ru: {
    "auth_modal.reset_sent": "Ссылка для сброса пароля отправлена на вашу электронную почту.",
    "reset_password.error_token": "Ссылка для сброса недействительна или срок ее действия истек.",
    "reset_password.error_user": "Пользователь с этим адресом электронной почты не найден."
  }
};

Object.entries(newLocales).forEach(([lang, texts]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.auth_modal) data.auth_modal = {};
    if (!data.reset_password) data.reset_password = {};
    
    data.auth_modal.reset_sent = texts["auth_modal.reset_sent"];
    data.reset_password.error_token = texts["reset_password.error_token"];
    data.reset_password.error_user = texts["reset_password.error_user"];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
