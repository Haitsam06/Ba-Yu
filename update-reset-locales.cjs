const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = ['id', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

const newData = {
    id: {
        reset_password: {
            success_title: "Password Diperbarui!",
            success_message: "Mengarahkan Anda ke halaman login...",
            title: "Buat Password Baru",
            description_start: "Tentukan password baru yang kuat untuk akun",
            new_password_label: "Password Baru",
            new_password_placeholder: "Minimal 8 karakter",
            confirm_password_label: "Konfirmasi Password",
            confirm_password_placeholder: "Ketik ulang password baru",
            submit_loading: "Menyimpan...",
            submit_button: "Simpan Password Baru"
        },
        forgot_password: {
            modal_title: "Lupa Password",
            modal_description: "Masukkan email akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang password Anda.",
            email_label: "Email Terdaftar",
            email_placeholder: "nama@email.com",
            submit_loading: "Mengirim...",
            submit_button: "Kirim Link Reset"
        }
    },
    en: {
        reset_password: {
            success_title: "Password Updated!",
            success_message: "Redirecting you to the login page...",
            title: "Create New Password",
            description_start: "Set a strong new password for the account",
            new_password_label: "New Password",
            new_password_placeholder: "Minimum 8 characters",
            confirm_password_label: "Confirm Password",
            confirm_password_placeholder: "Retype new password",
            submit_loading: "Saving...",
            submit_button: "Save New Password"
        },
        forgot_password: {
            modal_title: "Forgot Password",
            modal_description: "Enter your account email. We will send you a link to reset your password.",
            email_label: "Registered Email",
            email_placeholder: "name@email.com",
            submit_loading: "Sending...",
            submit_button: "Send Reset Link"
        }
    },
    de: {
        reset_password: {
            success_title: "Passwort aktualisiert!",
            success_message: "Weiterleitung zur Login-Seite...",
            title: "Neues Passwort erstellen",
            description_start: "Legen Sie ein starkes neues Passwort für das Konto fest",
            new_password_label: "Neues Passwort",
            new_password_placeholder: "Mindestens 8 Zeichen",
            confirm_password_label: "Passwort bestätigen",
            confirm_password_placeholder: "Neues Passwort erneut eingeben",
            submit_loading: "Wird gespeichert...",
            submit_button: "Neues Passwort speichern"
        },
        forgot_password: {
            modal_title: "Passwort vergessen",
            modal_description: "Geben Sie Ihre Konto-E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.",
            email_label: "Registrierte E-Mail",
            email_placeholder: "name@email.com",
            submit_loading: "Wird gesendet...",
            submit_button: "Link zum Zurücksetzen senden"
        }
    },
    es: {
        reset_password: {
            success_title: "¡Contraseña actualizada!",
            success_message: "Redirigiéndote a la página de inicio de sesión...",
            title: "Crear nueva contraseña",
            description_start: "Establezca una nueva contraseña segura para la cuenta",
            new_password_label: "Nueva contraseña",
            new_password_placeholder: "Mínimo 8 caracteres",
            confirm_password_label: "Confirmar contraseña",
            confirm_password_placeholder: "Vuelva a escribir la nueva contraseña",
            submit_loading: "Guardando...",
            submit_button: "Guardar nueva contraseña"
        },
        forgot_password: {
            modal_title: "Has olvidado tu contraseña",
            modal_description: "Introduzca el correo electrónico de su cuenta. Le enviaremos un enlace para restablecer su contraseña.",
            email_label: "Correo electrónico registrado",
            email_placeholder: "nombre@email.com",
            submit_loading: "Enviando...",
            submit_button: "Enviar enlace"
        }
    },
    fr: {
        reset_password: {
            success_title: "Mot de passe mis à jour !",
            success_message: "Redirection vers la page de connexion...",
            title: "Créer un nouveau mot de passe",
            description_start: "Définissez un nouveau mot de passe fort pour le compte",
            new_password_label: "Nouveau mot de passe",
            new_password_placeholder: "Minimum 8 caractères",
            confirm_password_label: "Confirmer le mot de passe",
            confirm_password_placeholder: "Retapez le nouveau mot de passe",
            submit_loading: "Enregistrement...",
            submit_button: "Enregistrer le mot de passe"
        },
        forgot_password: {
            modal_title: "Mot de passe oublié",
            modal_description: "Entrez l'e-mail de votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.",
            email_label: "E-mail enregistré",
            email_placeholder: "nom@email.com",
            submit_loading: "Envoi...",
            submit_button: "Envoyer le lien"
        }
    },
    ja: {
        reset_password: {
            success_title: "パスワードを更新しました！",
            success_message: "ログインページにリダイレクトしています...",
            title: "新しいパスワードの作成",
            description_start: "アカウントの強力な新しいパスワードを設定してください",
            new_password_label: "新しいパスワード",
            new_password_placeholder: "最小8文字",
            confirm_password_label: "パスワードの確認",
            confirm_password_placeholder: "新しいパスワードを再入力",
            submit_loading: "保存中...",
            submit_button: "新しいパスワードを保存"
        },
        forgot_password: {
            modal_title: "パスワードをお忘れですか",
            modal_description: "アカウントのメールアドレスを入力してください。パスワードをリセットするためのリンクをお送りします。",
            email_label: "登録メールアドレス",
            email_placeholder: "name@email.com",
            submit_loading: "送信中...",
            submit_button: "リセットリンクを送信"
        }
    },
    ko: {
        reset_password: {
            success_title: "비밀번호가 업데이트되었습니다!",
            success_message: "로그인 페이지로 리디렉션 중...",
            title: "새 비밀번호 만들기",
            description_start: "계정에 대한 강력한 새 비밀번호를 설정하십시오",
            new_password_label: "새 비밀번호",
            new_password_placeholder: "최소 8자",
            confirm_password_label: "비밀번호 확인",
            confirm_password_placeholder: "새 비밀번호 다시 입력",
            submit_loading: "저장 중...",
            submit_button: "새 비밀번호 저장"
        },
        forgot_password: {
            modal_title: "비밀번호 찾기",
            modal_description: "계정 이메일을 입력하십시오. 비밀번호 재설정 링크를 보내드립니다.",
            email_label: "등록된 이메일",
            email_placeholder: "name@email.com",
            submit_loading: "보내는 중...",
            submit_button: "재설정 링크 보내기"
        }
    },
    pt: {
        reset_password: {
            success_title: "Senha atualizada!",
            success_message: "Redirecionando para a página de login...",
            title: "Criar Nova Senha",
            description_start: "Defina uma nova senha forte para a conta",
            new_password_label: "Nova Senha",
            new_password_placeholder: "Mínimo de 8 caracteres",
            confirm_password_label: "Confirme a Senha",
            confirm_password_placeholder: "Redigite a nova senha",
            submit_loading: "Salvando...",
            submit_button: "Salvar Nova Senha"
        },
        forgot_password: {
            modal_title: "Esqueceu a senha",
            modal_description: "Digite o e-mail da sua conta. Enviaremos um link para redefinir sua senha.",
            email_label: "E-mail Registrado",
            email_placeholder: "nome@email.com",
            submit_loading: "Enviando...",
            submit_button: "Enviar Link de Redefinição"
        }
    },
    ru: {
        reset_password: {
            success_title: "Пароль обновлен!",
            success_message: "Перенаправление на страницу входа...",
            title: "Создать новый пароль",
            description_start: "Установите новый надежный пароль для учетной записи",
            new_password_label: "Новый пароль",
            new_password_placeholder: "Минимум 8 символов",
            confirm_password_label: "Подтвердите пароль",
            confirm_password_placeholder: "Введите новый пароль еще раз",
            submit_loading: "Сохранение...",
            submit_button: "Сохранить новый пароль"
        },
        forgot_password: {
            modal_title: "Забыли пароль",
            modal_description: "Введите адрес электронной почты вашей учетной записи. Мы отправим вам ссылку для сброса пароля.",
            email_label: "Зарегистрированный адрес электронной почты",
            email_placeholder: "name@email.com",
            submit_loading: "Отправка...",
            submit_button: "Отправить ссылку для сброса"
        }
    },
    zh: {
        reset_password: {
            success_title: "密码已更新！",
            success_message: "正在重定向到登录页面...",
            title: "创建新密码",
            description_start: "为该帐户设置一个新的强密码",
            new_password_label: "新密码",
            new_password_placeholder: "最少 8 个字符",
            confirm_password_label: "确认密码",
            confirm_password_placeholder: "重新输入新密码",
            submit_loading: "保存中...",
            submit_button: "保存新密码"
        },
        forgot_password: {
            modal_title: "忘记密码",
            modal_description: "输入您的帐户电子邮件。我们将向您发送重置密码的链接。",
            email_label: "注册邮箱",
            email_placeholder: "name@email.com",
            submit_loading: "发送中...",
            submit_button: "发送重置链接"
        }
    }
};

locales.forEach(lang => {
    const file = path.join(localesPath, `${lang}.json`);
    if (fs.existsSync(file)) {
        let current = JSON.parse(fs.readFileSync(file, 'utf8'));
        
        current.reset_password = newData[lang].reset_password;
        current.forgot_password = newData[lang].forgot_password;
        
        fs.writeFileSync(file, JSON.stringify(current, null, 4));
        console.log(`Updated ${lang}.json`);
    }
});
