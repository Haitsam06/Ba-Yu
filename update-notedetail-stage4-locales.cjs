const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const stage4Translations = {
    en: {
        share_cta: "Spread this valuable knowledge to your friends.",
        copy_link_copied: "Link copied!",
        copy_btn: "Copy",
        report_cancel: "Cancel",
        report_send: "Send Report",
        report_sending: "Sending...",
        date_just_now: "Just now"
    },
    id: {
        share_cta: "Sebarkan ilmu bermanfaat ini ke teman-temanmu.",
        copy_link_copied: "Link berhasil disalin!",
        copy_btn: "Salin",
        report_cancel: "Batalkan",
        report_send: "Kirim Laporan",
        report_sending: "Mengirim...",
        date_just_now: "Baru saja"
    },
    de: {
        share_cta: "Teile dieses wertvolle Wissen mit deinen Freunden.",
        copy_link_copied: "Link kopiert!",
        copy_btn: "Kopieren",
        report_cancel: "Abbrechen",
        report_send: "Meldung senden",
        report_sending: "Sendet...",
        date_just_now: "Gerade eben"
    },
    es: {
        share_cta: "Comparte este valioso conocimiento con tus amigos.",
        copy_link_copied: "¡Enlace copiado!",
        copy_btn: "Copiar",
        report_cancel: "Cancelar",
        report_send: "Enviar Reporte",
        report_sending: "Enviando...",
        date_just_now: "Justo ahora"
    },
    fr: {
        share_cta: "Partagez ce précieux savoir avec vos amis.",
        copy_link_copied: "Lien copié !",
        copy_btn: "Copier",
        report_cancel: "Annuler",
        report_send: "Envoyer le signalement",
        report_sending: "Envoi en cours...",
        date_just_now: "À l'instant"
    },
    ja: {
        share_cta: "この貴重な知識を友達にシェアしよう。",
        copy_link_copied: "リンクをコピーしました！",
        copy_btn: "コピー",
        report_cancel: "キャンセル",
        report_send: "報告を送信",
        report_sending: "送信中...",
        date_just_now: "たった今"
    },
    ko: {
        share_cta: "이 귀중한 지식을 친구들에게 공유하세요.",
        copy_link_copied: "링크가 복사되었습니다!",
        copy_btn: "복사",
        report_cancel: "취소",
        report_send: "신고 전송",
        report_sending: "전송 중...",
        date_just_now: "방금 전"
    },
    pt: {
        share_cta: "Compartilhe este valioso conhecimento com seus amigos.",
        copy_link_copied: "Link copiado!",
        copy_btn: "Copiar",
        report_cancel: "Cancelar",
        report_send: "Enviar Denúncia",
        report_sending: "Enviando...",
        date_just_now: "Agora mesmo"
    },
    ru: {
        share_cta: "Поделитесь этими ценными знаниями с друзьями.",
        copy_link_copied: "Ссылка скопирована!",
        copy_btn: "Скопировать",
        report_cancel: "Отмена",
        report_send: "Отправить жалобу",
        report_sending: "Отправка...",
        date_just_now: "Только что"
    },
    zh: {
        share_cta: "将这些宝贵的知识分享给你的朋友。",
        copy_link_copied: "链接已复制！",
        copy_btn: "复制",
        report_cancel: "取消",
        report_send: "提交举报",
        report_sending: "提交中...",
        date_just_now: "刚刚"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!json.note_detail) json.note_detail = {};
        Object.assign(json.note_detail, stage4Translations[lang]);
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
        console.log(`Updated ${lang}.json`);
    }
});
