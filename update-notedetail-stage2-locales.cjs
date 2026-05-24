const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const stage2Translations = {
    en: {
        share_note: "Share Note",
        report_content: "Report Content",
        report_reason_placeholder: "Select reason...",
        report_desc_placeholder: "Briefly explain why you are reporting this content...",
        report_submit: "Report",
        report_submitting: "Reporting...",
        report_reason_spam: "Spam / Promotion",
        report_reason_inappropriate: "Inappropriate Content",
        report_reason_harassment: "Harassment / Hate Speech",
        report_reason_copyright: "Copyright Violation",
        report_reason_other: "Other",
        comment_like: "Like",
        comment_reply: "Reply",
        comment_replying: "Replying to",
        view_more_replies: "View {{count}} more replies...",
        load_more_comments: "Load More ({{count}})",
        recommendation_title: "Recommended",
        recommendation_subtitle: "Other Notes",
        author_following: "Following",
        author_pending: "Pending",
        author_follow: "Follow"
    },
    id: {
        share_note: "Bagikan Catatan",
        report_content: "Laporkan Konten",
        report_reason_placeholder: "Pilih alasan...",
        report_desc_placeholder: "Jelaskan secara singkat mengapa Anda melaporkan konten ini...",
        report_submit: "Laporkan",
        report_submitting: "Melaporkan...",
        report_reason_spam: "Spam / Promosi",
        report_reason_inappropriate: "Konten Tidak Pantas",
        report_reason_harassment: "Pelecehan / Ujaran Kebencian",
        report_reason_copyright: "Pelanggaran Hak Cipta",
        report_reason_other: "Lainnya",
        comment_like: "Suka",
        comment_reply: "Balas",
        comment_replying: "Membalas",
        view_more_replies: "Lihat {{count}} balasan lainnya...",
        load_more_comments: "Muat Lebih Banyak ({{count}})",
        recommendation_title: "Rekomendasi",
        recommendation_subtitle: "Catatan Lainnya",
        author_following: "Mengikuti",
        author_pending: "Menunggu",
        author_follow: "Ikuti"
    },
    de: {
        share_note: "Notiz teilen",
        report_content: "Inhalt melden",
        report_reason_placeholder: "Grund auswählen...",
        report_desc_placeholder: "Erklären Sie kurz, warum Sie diesen Inhalt melden...",
        report_submit: "Melden",
        report_submitting: "Melde...",
        report_reason_spam: "Spam / Werbung",
        report_reason_inappropriate: "Unangemessener Inhalt",
        report_reason_harassment: "Belästigung / Hassrede",
        report_reason_copyright: "Urheberrechtsverletzung",
        report_reason_other: "Sonstiges",
        comment_like: "Gefällt mir",
        comment_reply: "Antworten",
        comment_replying: "Antwort an",
        view_more_replies: "{{count}} weitere Antworten ansehen...",
        load_more_comments: "Mehr laden ({{count}})",
        recommendation_title: "Empfohlen",
        recommendation_subtitle: "Weitere Notizen",
        author_following: "Folge ich",
        author_pending: "Ausstehend",
        author_follow: "Folgen"
    },
    es: {
        share_note: "Compartir Nota",
        report_content: "Reportar Contenido",
        report_reason_placeholder: "Seleccionar motivo...",
        report_desc_placeholder: "Explica brevemente por qué reportas este contenido...",
        report_submit: "Reportar",
        report_submitting: "Reportando...",
        report_reason_spam: "Spam / Promoción",
        report_reason_inappropriate: "Contenido Inapropiado",
        report_reason_harassment: "Acoso / Discurso de odio",
        report_reason_copyright: "Violación de Derechos de Autor",
        report_reason_other: "Otro",
        comment_like: "Me gusta",
        comment_reply: "Responder",
        comment_replying: "Respondiendo a",
        view_more_replies: "Ver {{count}} respuestas más...",
        load_more_comments: "Cargar Más ({{count}})",
        recommendation_title: "Recomendado",
        recommendation_subtitle: "Otras Notas",
        author_following: "Siguiendo",
        author_pending: "Pendiente",
        author_follow: "Seguir"
    },
    fr: {
        share_note: "Partager la Note",
        report_content: "Signaler le Contenu",
        report_reason_placeholder: "Sélectionner la raison...",
        report_desc_placeholder: "Expliquez brièvement pourquoi vous signalez ce contenu...",
        report_submit: "Signaler",
        report_submitting: "Signalement en cours...",
        report_reason_spam: "Spam / Promotion",
        report_reason_inappropriate: "Contenu Inapproprié",
        report_reason_harassment: "Harcèlement / Discours de haine",
        report_reason_copyright: "Violation des Droits d'Auteur",
        report_reason_other: "Autre",
        comment_like: "J'aime",
        comment_reply: "Répondre",
        comment_replying: "En réponse à",
        view_more_replies: "Voir {{count}} autres réponses...",
        load_more_comments: "Charger Plus ({{count}})",
        recommendation_title: "Recommandé",
        recommendation_subtitle: "Autres Notes",
        author_following: "Abonné",
        author_pending: "En attente",
        author_follow: "Suivre"
    },
    ja: {
        share_note: "ノートを共有",
        report_content: "コンテンツを報告",
        report_reason_placeholder: "理由を選択...",
        report_desc_placeholder: "このコンテンツを報告する理由を簡単に説明してください...",
        report_submit: "報告する",
        report_submitting: "報告中...",
        report_reason_spam: "スパム / 宣伝",
        report_reason_inappropriate: "不適切なコンテンツ",
        report_reason_harassment: "嫌がらせ / ヘイトスピーチ",
        report_reason_copyright: "著作権侵害",
        report_reason_other: "その他",
        comment_like: "いいね",
        comment_reply: "返信",
        comment_replying: "返信先",
        view_more_replies: "さらに{{count}}件の返信を表示...",
        load_more_comments: "さらに読み込む ({{count}})",
        recommendation_title: "おすすめ",
        recommendation_subtitle: "その他のノート",
        author_following: "フォロー中",
        author_pending: "保留中",
        author_follow: "フォロー"
    },
    ko: {
        share_note: "노트 공유",
        report_content: "콘텐츠 신고",
        report_reason_placeholder: "이유 선택...",
        report_desc_placeholder: "이 콘텐츠를 신고하는 이유를 간단히 설명해 주세요...",
        report_submit: "신고",
        report_submitting: "신고 중...",
        report_reason_spam: "스팸 / 홍보",
        report_reason_inappropriate: "부적절한 콘텐츠",
        report_reason_harassment: "괴롭힘 / 혐오 발언",
        report_reason_copyright: "저작권 침해",
        report_reason_other: "기타",
        comment_like: "좋아요",
        comment_reply: "답글",
        comment_replying: "답글 작성 중",
        view_more_replies: "{{count}}개의 답글 더 보기...",
        load_more_comments: "더 보기 ({{count}})",
        recommendation_title: "추천",
        recommendation_subtitle: "다른 노트",
        author_following: "팔로잉",
        author_pending: "대기 중",
        author_follow: "팔로우"
    },
    pt: {
        share_note: "Compartilhar Nota",
        report_content: "Denunciar Conteúdo",
        report_reason_placeholder: "Selecione o motivo...",
        report_desc_placeholder: "Explique brevemente por que você está denunciando este conteúdo...",
        report_submit: "Denunciar",
        report_submitting: "Denunciando...",
        report_reason_spam: "Spam / Promoção",
        report_reason_inappropriate: "Conteúdo Inadequado",
        report_reason_harassment: "Assédio / Discurso de Ódio",
        report_reason_copyright: "Violação de Direitos Autorais",
        report_reason_other: "Outro",
        comment_like: "Curtir",
        comment_reply: "Responder",
        comment_replying: "Respondendo a",
        view_more_replies: "Ver mais {{count}} respostas...",
        load_more_comments: "Carregar Mais ({{count}})",
        recommendation_title: "Recomendado",
        recommendation_subtitle: "Outras Notas",
        author_following: "Seguindo",
        author_pending: "Pendente",
        author_follow: "Seguir"
    },
    ru: {
        share_note: "Поделиться заметкой",
        report_content: "Пожаловаться на контент",
        report_reason_placeholder: "Выберите причину...",
        report_desc_placeholder: "Кратко объясните, почему вы жалуетесь на этот контент...",
        report_submit: "Пожаловаться",
        report_submitting: "Отправка жалобы...",
        report_reason_spam: "Спам / Реклама",
        report_reason_inappropriate: "Недопустимый контент",
        report_reason_harassment: "Домогательства / Разжигание ненависти",
        report_reason_copyright: "Нарушение авторских прав",
        report_reason_other: "Другое",
        comment_like: "Нравится",
        comment_reply: "Ответить",
        comment_replying: "Ответ",
        view_more_replies: "Смотреть еще {{count}} ответов...",
        load_more_comments: "Загрузить еще ({{count}})",
        recommendation_title: "Рекомендуемые",
        recommendation_subtitle: "Другие заметки",
        author_following: "Вы подписаны",
        author_pending: "В ожидании",
        author_follow: "Подписаться"
    },
    zh: {
        share_note: "分享笔记",
        report_content: "报告内容",
        report_reason_placeholder: "选择原因...",
        report_desc_placeholder: "简要说明您报告此内容的原因...",
        report_submit: "报告",
        report_submitting: "正在报告...",
        report_reason_spam: "垃圾信息 / 推广",
        report_reason_inappropriate: "不当内容",
        report_reason_harassment: "骚扰 / 仇恨言论",
        report_reason_copyright: "侵犯版权",
        report_reason_other: "其他",
        comment_like: "喜欢",
        comment_reply: "回复",
        comment_replying: "回复",
        view_more_replies: "查看更多 {{count}} 条回复...",
        load_more_comments: "加载更多 ({{count}})",
        recommendation_title: "推荐",
        recommendation_subtitle: "其他笔记",
        author_following: "已关注",
        author_pending: "待定",
        author_follow: "关注"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            let json = JSON.parse(fileData);
            
            // Merge settings
            if (!json.note_detail) {
                json.note_detail = {};
            }
            Object.assign(json.note_detail, stage2Translations[lang]);
            
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Updated ${lang}.json for note_detail stage 2`);
        } catch (err) {
            console.error(`Error processing ${lang}.json:`, err);
        }
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});
