const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const stage5Translations = {
    en: {
        activity_reply: "Replied to a comment on",
        activity_discuss: "Commented on",
        activity_note: "Note",
        recently: "Just now",
        no_history: "No Activity Yet",
        no_history_sub: "has not commented on any notes yet.",
        discussion_label: "DISCUSSION",
        tab_activity: "Activity",
        btn_reply: "Reply"
    },
    id: {
        activity_reply: "Membalas komentar di",
        activity_discuss: "Berkomentar di",
        activity_note: "Catatan",
        recently: "Baru saja",
        no_history: "Belum Ada Aktivitas",
        no_history_sub: "belum memberikan komentar pada catatan apa pun.",
        discussion_label: "DISKUSI",
        tab_activity: "Aktivitas",
        btn_reply: "Balas"
    },
    de: {
        activity_reply: "Hat geantwortet auf",
        activity_discuss: "Hat kommentiert auf",
        activity_note: "Notiz",
        recently: "Gerade eben",
        no_history: "Noch keine Aktivität",
        no_history_sub: "hat noch keine Notizen kommentiert.",
        discussion_label: "DISKUSSION",
        tab_activity: "Aktivität",
        btn_reply: "Antworten"
    },
    es: {
        activity_reply: "Respondió a un comentario en",
        activity_discuss: "Comentó en",
        activity_note: "Nota",
        recently: "Justo ahora",
        no_history: "Sin actividad",
        no_history_sub: "no ha comentado en ninguna nota.",
        discussion_label: "DISCUSIÓN",
        tab_activity: "Actividad",
        btn_reply: "Responder"
    },
    fr: {
        activity_reply: "A répondu sur",
        activity_discuss: "A commenté sur",
        activity_note: "Note",
        recently: "À l'instant",
        no_history: "Aucune activité",
        no_history_sub: "n'a encore commenté aucune note.",
        discussion_label: "DISCUSSION",
        tab_activity: "Activité",
        btn_reply: "Répondre"
    },
    ja: {
        activity_reply: "に返信しました",
        activity_discuss: "にコメントしました",
        activity_note: "ノート",
        recently: "たった今",
        no_history: "アクティビティなし",
        no_history_sub: "はノートにコメントしていません。",
        discussion_label: "ディスカッション",
        tab_activity: "アクティビティ",
        btn_reply: "返信"
    },
    ko: {
        activity_reply: "다음에 답글을 남겼습니다",
        activity_discuss: "다음에 댓글을 남겼습니다",
        activity_note: "노트",
        recently: "방금 전",
        no_history: "활동 없음",
        no_history_sub: "님은 아직 댓글을 남기지 않았습니다.",
        discussion_label: "토론",
        tab_activity: "활동",
        btn_reply: "답글"
    },
    pt: {
        activity_reply: "Respondeu a um comentário em",
        activity_discuss: "Comentou em",
        activity_note: "Nota",
        recently: "Agora mesmo",
        no_history: "Sem atividade ainda",
        no_history_sub: "ainda não comentou.",
        discussion_label: "DISCUSSÃO",
        tab_activity: "Atividade",
        btn_reply: "Responder"
    },
    ru: {
        activity_reply: "Ответил(а) на",
        activity_discuss: "Прокомментировал(а)",
        activity_note: "Заметка",
        recently: "Только что",
        no_history: "Нет активности",
        no_history_sub: "еще не комментировал(а).",
        discussion_label: "ОБСУЖДЕНИЕ",
        tab_activity: "Активность",
        btn_reply: "Ответить"
    },
    zh: {
        activity_reply: "回复了评论于",
        activity_discuss: "评论了",
        activity_note: "笔记",
        recently: "刚刚",
        no_history: "暂无活动",
        no_history_sub: "尚未发表评论。",
        discussion_label: "讨论",
        tab_activity: "活动",
        btn_reply: "回复"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!json.public_profile) json.public_profile = {};
        Object.assign(json.public_profile, stage5Translations[lang]);
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    }
});
