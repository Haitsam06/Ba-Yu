const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const additionalTranslations = {
    en: {
        current_password_placeholder: "Enter old password",
        new_password_placeholder: "Type new password",
        confirm_new_password_placeholder: "Retype new password",
        update_password: "Update Password",
        saving: "Saving...",
        two_factor_auth: "Two-Factor Authentication",
        extra_protection: "Extra protection for your account",
        feature_in_development: "Feature in development",
        login_activity: "Where You're Logged In",
        active_now_extended: "Active right now"
    },
    id: {
        current_password_placeholder: "Masukkan kata sandi lama",
        new_password_placeholder: "Ketik kata sandi baru",
        confirm_new_password_placeholder: "Ketik ulang kata sandi baru",
        update_password: "Perbarui Kata Sandi",
        saving: "Menyimpan...",
        two_factor_auth: "Autentikasi Dua Faktor",
        extra_protection: "Perlindungan ekstra untuk akunmu",
        feature_in_development: "Fitur sedang dalam pengembangan",
        login_activity: "Tempat Anda Login",
        active_now_extended: "Sedang aktif sekarang"
    },
    de: {
        current_password_placeholder: "Altes Passwort eingeben",
        new_password_placeholder: "Neues Passwort eingeben",
        confirm_new_password_placeholder: "Neues Passwort wiederholen",
        update_password: "Passwort aktualisieren",
        saving: "Speichern...",
        two_factor_auth: "Zwei-Faktor-Authentifizierung",
        extra_protection: "Zusätzlicher Schutz für Ihren Account",
        feature_in_development: "Funktion in Entwicklung",
        login_activity: "Ihre Anmeldeorte",
        active_now_extended: "Gerade aktiv"
    },
    es: {
        current_password_placeholder: "Ingrese contraseña antigua",
        new_password_placeholder: "Escriba nueva contraseña",
        confirm_new_password_placeholder: "Vuelva a escribir la nueva contraseña",
        update_password: "Actualizar Contraseña",
        saving: "Guardando...",
        two_factor_auth: "Autenticación de Dos Factores",
        extra_protection: "Protección adicional para tu cuenta",
        feature_in_development: "Función en desarrollo",
        login_activity: "Dónde Has Iniciado Sesión",
        active_now_extended: "Activo ahora mismo"
    },
    fr: {
        current_password_placeholder: "Entrer l'ancien mot de passe",
        new_password_placeholder: "Taper le nouveau mot de passe",
        confirm_new_password_placeholder: "Retapez le nouveau mot de passe",
        update_password: "Mettre à jour le mot de passe",
        saving: "Enregistrement...",
        two_factor_auth: "Authentification à Deux Facteurs",
        extra_protection: "Protection supplémentaire pour votre compte",
        feature_in_development: "Fonctionnalité en développement",
        login_activity: "Où Vous Êtes Connecté",
        active_now_extended: "Actif en ce moment"
    },
    ja: {
        current_password_placeholder: "古いパスワードを入力",
        new_password_placeholder: "新しいパスワードを入力",
        confirm_new_password_placeholder: "新しいパスワードを再入力",
        update_password: "パスワードを更新",
        saving: "保存中...",
        two_factor_auth: "二要素認証",
        extra_protection: "アカウントの追加保護",
        feature_in_development: "開発中の機能",
        login_activity: "ログインしている場所",
        active_now_extended: "現在アクティブ"
    },
    ko: {
        current_password_placeholder: "이전 비밀번호 입력",
        new_password_placeholder: "새 비밀번호 입력",
        confirm_new_password_placeholder: "새 비밀번호 다시 입력",
        update_password: "비밀번호 업데이트",
        saving: "저장 중...",
        two_factor_auth: "2단계 인증",
        extra_protection: "계정에 대한 추가 보호",
        feature_in_development: "개발 중인 기능",
        login_activity: "로그인한 위치",
        active_now_extended: "지금 활동 중"
    },
    pt: {
        current_password_placeholder: "Digite a senha antiga",
        new_password_placeholder: "Digite a nova senha",
        confirm_new_password_placeholder: "Redigite a nova senha",
        update_password: "Atualizar Senha",
        saving: "Salvando...",
        two_factor_auth: "Autenticação de Dois Fatores",
        extra_protection: "Proteção extra para sua conta",
        feature_in_development: "Recurso em desenvolvimento",
        login_activity: "Onde Você Está Conectado",
        active_now_extended: "Ativo agora"
    },
    ru: {
        current_password_placeholder: "Введите старый пароль",
        new_password_placeholder: "Введите новый пароль",
        confirm_new_password_placeholder: "Повторите новый пароль",
        update_password: "Обновить пароль",
        saving: "Сохранение...",
        two_factor_auth: "Двухфакторная аутентификация",
        extra_protection: "Дополнительная защита для вашего аккаунта",
        feature_in_development: "Функция в разработке",
        login_activity: "Где вы вошли в систему",
        active_now_extended: "Активен прямо сейчас"
    },
    zh: {
        current_password_placeholder: "输入旧密码",
        new_password_placeholder: "输入新密码",
        confirm_new_password_placeholder: "重新输入新密码",
        update_password: "更新密码",
        saving: "保存中...",
        two_factor_auth: "双重身份验证",
        extra_protection: "为您的帐户提供额外保护",
        feature_in_development: "功能开发中",
        login_activity: "您的登录位置",
        active_now_extended: "当前在线"
    }
};

const langs = Object.keys(additionalTranslations);

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            let json = JSON.parse(fileData);
            
            // Merge into security
            if (!json.security) json.security = {};
            Object.assign(json.security, additionalTranslations[lang]);
            
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Updated ${lang}.json with additional security keys`);
        } catch (err) {
            console.error(`Error processing ${lang}.json:`, err);
        }
    }
});
