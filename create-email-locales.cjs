const fs = require('fs');
const path = require('path');

const langDir = path.join(__dirname, 'lang');
if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir);
}

const locales = ['id', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

const data = {
    id: {
        subject: "Reset Password Anda",
        line1: "Anda menerima email ini karena kami menerima permintaan reset password untuk akun Anda.",
        action: "Reset Password",
        warning: "Peringatan: Jika Anda tidak pernah merasa meminta reset password, abaikan email ini. Apabila terdapat aktivitas mencurigakan, harap amankan akun Anda atau hubungi Support Ba-Yu."
    },
    en: {
        subject: "Reset Your Password",
        line1: "You are receiving this email because we received a password reset request for your account.",
        action: "Reset Password",
        warning: "Warning: If you did not request a password reset, no further action is required. If you suspect suspicious activity, please secure your account or contact Ba-Yu Support."
    },
    de: {
        subject: "Passwort zurücksetzen",
        line1: "Sie erhalten diese E-Mail, weil wir eine Anfrage zum Zurücksetzen des Passworts für Ihr Konto erhalten haben.",
        action: "Passwort zurücksetzen",
        warning: "Achtung: Wenn Sie kein Zurücksetzen des Passworts angefordert haben, sind keine weiteren Maßnahmen erforderlich. Wenn Sie verdächtige Aktivitäten bemerken, sichern Sie bitte Ihr Konto oder kontaktieren Sie den Ba-Yu-Support."
    },
    es: {
        subject: "Restablecer su contraseña",
        line1: "Recibe este correo electrónico porque hemos recibido una solicitud de restablecimiento de contraseña para su cuenta.",
        action: "Restablecer contraseña",
        warning: "Advertencia: Si no solicitó un restablecimiento de contraseña, no es necesario realizar ninguna otra acción. Si sospecha de actividad sospechosa, proteja su cuenta o póngase en contacto con el Soporte de Ba-Yu."
    },
    fr: {
        subject: "Réinitialiser votre mot de passe",
        line1: "Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.",
        action: "Réinitialiser le mot de passe",
        warning: "Avertissement : Si vous n'avez pas demandé de réinitialisation de mot de passe, aucune autre action n'est requise. Si vous soupçonnez une activité suspecte, veuillez sécuriser votre compte ou contacter le support Ba-Yu."
    },
    ja: {
        subject: "パスワードをリセット",
        line1: "このメールは、あなたのアカウントのパスワードリセット要求を受け取ったため送信されました。",
        action: "パスワードをリセット",
        warning: "警告：パスワードリセットをリクエストしていない場合、これ以上の対応は必要ありません。不審なアクティビティが疑われる場合は、アカウントを保護するか、Ba-Yuサポートにお問い合わせください。"
    },
    ko: {
        subject: "비밀번호 재설정",
        line1: "귀하의 계정에 대한 비밀번호 재설정 요청을 받았기 때문에 이 이메일을 받게 되었습니다.",
        action: "비밀번호 재설정",
        warning: "경고: 비밀번호 재설정을 요청하지 않았다면 추가 조치가 필요하지 않습니다. 의심스러운 활동이 의심되는 경우 계정을 보호하거나 Ba-Yu 지원팀에 문의하세요."
    },
    pt: {
        subject: "Redefinir sua senha",
        line1: "Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha para sua conta.",
        action: "Redefinir senha",
        warning: "Aviso: Se você não solicitou uma redefinição de senha, nenhuma ação adicional é necessária. Se você suspeitar de atividade suspeita, proteja sua conta ou entre em contato com o Suporte Ba-Yu."
    },
    ru: {
        subject: "Сброс пароля",
        line1: "Вы получили это письмо, потому что мы получили запрос на сброс пароля для вашей учетной записи.",
        action: "Сбросить пароль",
        warning: "Внимание: Если вы не запрашивали сброс пароля, никаких дальнейших действий не требуется. Если вы подозреваете подозрительную активность, пожалуйста, обезопасьте свою учетную запись или обратитесь в службу поддержки Ba-Yu."
    },
    zh: {
        subject: "重置您的密码",
        line1: "您收到此电子邮件是因为我们收到了针对您帐户的密码重置请求。",
        action: "重置密码",
        warning: "警告：如果您没有请求重置密码，则无需执行进一步操作。如果您怀疑存在可疑活动，请保护您的帐户或联系 Ba-Yu 支持。"
    }
};

locales.forEach(lang => {
    const localeDir = path.join(langDir, lang);
    if (!fs.existsSync(localeDir)) {
        fs.mkdirSync(localeDir, { recursive: true });
    }
    
    const filePath = path.join(localeDir, 'email.php');
    const content = `<?php

return [
    'subject' => '${data[lang].subject.replace(/'/g, "\\'")}',
    'line1' => '${data[lang].line1.replace(/'/g, "\\'")}',
    'action' => '${data[lang].action.replace(/'/g, "\\'")}',
    'warning' => '${data[lang].warning.replace(/'/g, "\\'")}',
];
`;
    fs.writeFileSync(filePath, content);
    console.log(`Created lang/${lang}/email.php`);
});
