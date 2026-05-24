const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const stage3Translations = {
    en: {
        verified_expert: "Verified Expert",
        followers: "Followers",
        posts: "Posts",
        report_help_desc: "Help us keep the Ba-Yu ecosystem educational, safe, and comfortable.",
        report_main_reason: "Main Reason",
        close_modal: "Close Modal",
        report_note: "Report Note",
        report_comment: "Report Comment"
    },
    id: {
        verified_expert: "Pakar Terverifikasi",
        followers: "Pengikut",
        posts: "Tulisan",
        report_help_desc: "Bantu kami menjaga ekosistem Ba-Yu tetap edukatif, aman, dan nyaman.",
        report_main_reason: "Alasan Utama",
        close_modal: "Tutup Modal",
        report_note: "Laporkan Catatan",
        report_comment: "Laporkan Komentar"
    },
    de: {
        verified_expert: "Verifizierter Experte",
        followers: "Follower",
        posts: "Beiträge",
        report_help_desc: "Helfen Sie uns, das Ba-Yu-Ökosystem lehrreich, sicher und komfortabel zu halten.",
        report_main_reason: "Hauptgrund",
        close_modal: "Modal schließen",
        report_note: "Notiz melden",
        report_comment: "Kommentar melden"
    },
    es: {
        verified_expert: "Experto Verificado",
        followers: "Seguidores",
        posts: "Publicaciones",
        report_help_desc: "Ayúdanos a mantener el ecosistema de Ba-Yu educativo, seguro y cómodo.",
        report_main_reason: "Razón principal",
        close_modal: "Cerrar modal",
        report_note: "Reportar nota",
        report_comment: "Reportar comentario"
    },
    fr: {
        verified_expert: "Expert Vérifié",
        followers: "Abonnés",
        posts: "Publications",
        report_help_desc: "Aidez-nous à garder l'écosystème Ba-Yu éducatif, sûr et confortable.",
        report_main_reason: "Raison principale",
        close_modal: "Fermer le modal",
        report_note: "Signaler la note",
        report_comment: "Signaler le commentaire"
    },
    ja: {
        verified_expert: "認証済みエキスパート",
        followers: "フォロワー",
        posts: "投稿",
        report_help_desc: "Ba-Yuエコシステムを教育的で安全、かつ快適に保つためにご協力ください。",
        report_main_reason: "主な理由",
        close_modal: "モーダルを閉じる",
        report_note: "ノートを報告",
        report_comment: "コメントを報告"
    },
    ko: {
        verified_expert: "인증된 전문가",
        followers: "팔로워",
        posts: "게시물",
        report_help_desc: "Ba-Yu 생태계를 교육적이고 안전하며 편안하게 유지하도록 도와주세요.",
        report_main_reason: "주요 이유",
        close_modal: "모달 닫기",
        report_note: "노트 신고",
        report_comment: "댓글 신고"
    },
    pt: {
        verified_expert: "Especialista Verificado",
        followers: "Seguidores",
        posts: "Postagens",
        report_help_desc: "Ajude-nos a manter o ecossistema Ba-Yu educativo, seguro e confortável.",
        report_main_reason: "Motivo Principal",
        close_modal: "Fechar Modal",
        report_note: "Denunciar Nota",
        report_comment: "Denunciar Comentário"
    },
    ru: {
        verified_expert: "Подтвержденный эксперт",
        followers: "Подписчики",
        posts: "Записи",
        report_help_desc: "Помогите нам сохранить экосистему Ba-Yu образовательной, безопасной и удобной.",
        report_main_reason: "Основная причина",
        close_modal: "Закрыть окно",
        report_note: "Пожаловаться на заметку",
        report_comment: "Пожаловаться на комментарий"
    },
    zh: {
        verified_expert: "认证专家",
        followers: "关注者",
        posts: "帖子",
        report_help_desc: "帮助我们保持 Ba-Yu 生态系统的教育性、安全性和舒适性。",
        report_main_reason: "主要原因",
        close_modal: "关闭模态框",
        report_note: "举报笔记",
        report_comment: "举报评论"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            let json = JSON.parse(fileData);
            if (!json.note_detail) {
                json.note_detail = {};
            }
            Object.assign(json.note_detail, stage3Translations[lang]);
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
        } catch (err) {
            console.error(err);
        }
    }
});
