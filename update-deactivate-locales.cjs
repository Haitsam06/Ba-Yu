const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const translations = {
  id: {
    deactivate_success: "Akun Anda berhasil dinonaktifkan dan akan dihapus secara permanen dalam 30 hari.",
    deactivate_failed: "Gagal menonaktifkan akun. Silakan coba lagi nanti.",
    deactivate_title: "Nonaktifkan Akun (Dormant)",
    deactivate_desc: "Akun Anda akan disembunyikan (dormant) dari platform Ba-Yu. Profil, catatan, dan komentar Anda tidak akan dapat dilihat oleh pengguna lain. <strong>Jika Anda tidak login kembali dalam 30 hari, seluruh data Anda akan dihapus secara permanen.</strong>",
    deactivate_button: "Nonaktifkan Akun",
    processing: "Memproses...",
    yes_deactivate: "Ya, Nonaktifkan Akun Saya",
    cancel: "Batal"
  },
  en: {
    deactivate_success: "Your account has been deactivated and will be permanently deleted in 30 days.",
    deactivate_failed: "Failed to deactivate account. Please try again later.",
    deactivate_title: "Deactivate Account (Dormant)",
    deactivate_desc: "Your account will be hidden (dormant) from the Ba-Yu platform. Your profile, notes, and comments will not be visible to other users. <strong>If you do not log back in within 30 days, all your data will be permanently deleted.</strong>",
    deactivate_button: "Deactivate Account",
    processing: "Processing...",
    yes_deactivate: "Yes, Deactivate My Account",
    cancel: "Cancel"
  },
  ja: {
    deactivate_success: "アカウントは無効化され、30日後に完全に削除されます。",
    deactivate_failed: "アカウントの無効化に失敗しました。後でもう一度お試しください。",
    deactivate_title: "アカウントの無効化（休眠）",
    deactivate_desc: "アカウントはBa-Yuプラットフォームから非表示（休眠）になります。プロフィール、ノート、コメントは他のユーザーには表示されません。<strong>30日以内に再度ログインしない場合、すべてのデータは完全に削除されます。</strong>",
    deactivate_button: "アカウントを無効にする",
    processing: "処理中...",
    yes_deactivate: "はい、アカウントを無効にします",
    cancel: "キャンセル"
  },
  ko: {
    deactivate_success: "계정이 비활성화되었으며 30일 후에 영구적으로 삭제됩니다.",
    deactivate_failed: "계정을 비활성화하지 못했습니다. 나중에 다시 시도해 주세요.",
    deactivate_title: "계정 비활성화 (휴면)",
    deactivate_desc: "계정이 Ba-Yu 플랫폼에서 숨겨집니다(휴면). 귀하의 프로필, 노트 및 댓글은 다른 사용자에게 표시되지 않습니다. <strong>30일 이내에 다시 로그인하지 않으면 모든 데이터가 영구적으로 삭제됩니다.</strong>",
    deactivate_button: "계정 비활성화",
    processing: "처리 중...",
    yes_deactivate: "예, 내 계정을 비활성화합니다",
    cancel: "취소"
  },
  zh: {
    deactivate_success: "您的帐户已停用，将在 30 天后永久删除。",
    deactivate_failed: "停用帐户失败。请稍后再试。",
    deactivate_title: "停用帐户（休眠）",
    deactivate_desc: "您的帐户将在 Ba-Yu 平台上隐藏（休眠）。其他用户将无法看到您的个人资料、笔记和评论。<strong>如果您在 30 天内没有重新登录，您的所有数据将被永久删除。</strong>",
    deactivate_button: "停用帐户",
    processing: "处理中...",
    yes_deactivate: "是的，停用我的帐户",
    cancel: "取消"
  },
  de: {
    deactivate_success: "Ihr Konto wurde deaktiviert und wird in 30 Tagen dauerhaft gelöscht.",
    deactivate_failed: "Konto konnte nicht deaktiviert werden. Bitte versuchen Sie es später noch einmal.",
    deactivate_title: "Konto deaktivieren (Ruhezustand)",
    deactivate_desc: "Ihr Konto wird auf der Ba-Yu-Plattform ausgeblendet (Ruhezustand). Ihr Profil, Ihre Notizen und Kommentare sind für andere Benutzer nicht sichtbar. <strong>Wenn Sie sich nicht innerhalb von 30 Tagen wieder anmelden, werden alle Ihre Daten dauerhaft gelöscht.</strong>",
    deactivate_button: "Konto deaktivieren",
    processing: "Wird bearbeitet...",
    yes_deactivate: "Ja, mein Konto deaktivieren",
    cancel: "Abbrechen"
  },
  fr: {
    deactivate_success: "Votre compte a été désactivé et sera définitivement supprimé dans 30 jours.",
    deactivate_failed: "Échec de la désactivation du compte. Veuillez réessayer plus tard.",
    deactivate_title: "Désactiver le compte (Inactif)",
    deactivate_desc: "Votre compte sera masqué (inactif) sur la plateforme Ba-Yu. Votre profil, vos notes et vos commentaires ne seront pas visibles pour les autres utilisateurs. <strong>Si vous ne vous reconnectez pas dans les 30 jours, toutes vos données seront définitivement supprimées.</strong>",
    deactivate_button: "Désactiver le compte",
    processing: "En traitement...",
    yes_deactivate: "Oui, désactiver mon compte",
    cancel: "Annuler"
  },
  es: {
    deactivate_success: "Su cuenta ha sido desactivada y se eliminará permanentemente en 30 días.",
    deactivate_failed: "Error al desactivar la cuenta. Por favor, inténtelo de nuevo más tarde.",
    deactivate_title: "Desactivar cuenta (Inactivo)",
    deactivate_desc: "Su cuenta estará oculta (inactiva) en la plataforma Ba-Yu. Su perfil, notas y comentarios no serán visibles para otros usuarios. <strong>Si no vuelve a iniciar sesión dentro de 30 días, todos sus datos se eliminarán permanentemente.</strong>",
    deactivate_button: "Desactivar cuenta",
    processing: "Procesando...",
    yes_deactivate: "Sí, desactivar mi cuenta",
    cancel: "Cancelar"
  },
  pt: {
    deactivate_success: "Sua conta foi desativada e será permanentemente excluída em 30 dias.",
    deactivate_failed: "Falha ao desativar a conta. Por favor, tente novamente mais tarde.",
    deactivate_title: "Desativar conta (Inativo)",
    deactivate_desc: "Sua conta ficará oculta (inativa) na plataforma Ba-Yu. Seu perfil, notas e comentários não serão visíveis para outros usuários. <strong>Se você não fizer login novamente em 30 dias, todos os seus dados serão excluídos permanentemente.</strong>",
    deactivate_button: "Desativar conta",
    processing: "Processando...",
    yes_deactivate: "Sim, desativar minha conta",
    cancel: "Cancelar"
  },
  ru: {
    deactivate_success: "Ваша учетная запись деактивирована и будет безвозвратно удалена через 30 дней.",
    deactivate_failed: "Не удалось деактивировать учетную запись. Пожалуйста, повторите попытку позже.",
    deactivate_title: "Деактивировать учетную запись (Спящий режим)",
    deactivate_desc: "Ваша учетная запись будет скрыта (в спящем режиме) на платформе Ba-Yu. Ваш профиль, заметки и комментарии не будут видны другим пользователям. <strong>Если вы не войдете в систему снова в течение 30 дней, все ваши данные будут безвозвратно удалены.</strong>",
    deactivate_button: "Деактивировать учетную запись",
    processing: "Обработка...",
    yes_deactivate: "Да, деактивировать мою учетную запись",
    cancel: "Отмена"
  }
};

const supportedLocales = ['id', 'en', 'ko', 'ja', 'zh', 'de', 'fr', 'es', 'pt', 'ru'];

supportedLocales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    let raw = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(raw);
    
    if (!data.privacy_settings) {
      data.privacy_settings = {};
    }
    
    // Add missing translation strings
    Object.assign(data.privacy_settings, translations[lang]);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated deactivate locales in ${lang}.json`);
  }
});
