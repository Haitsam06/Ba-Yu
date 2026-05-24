const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const stage6Translations = {
    en: {
        comment_sending: "Sending",
        comment_send: "Send",
        unverify_title: "Unverify Note?",
        unverify_desc: "Are you sure you want to cancel the verification status of this note?",
        verify_title: "Verify Note",
        verify_desc: "Verify this note as an accurate and high-quality material?"
    },
    id: {
        comment_sending: "Mengirim",
        comment_send: "Kirim",
        unverify_title: "Batal Verifikasi?",
        unverify_desc: "Yakin ingin membatalkan status verifikasi pada catatan ini?",
        verify_title: "Verifikasi Catatan",
        verify_desc: "Verifikasi catatan ini sebagai materi yang akurat dan berkualitas?"
    },
    de: {
        comment_sending: "Senden",
        comment_send: "Senden",
        unverify_title: "Verifizierung aufheben?",
        unverify_desc: "Möchten Sie den Verifizierungsstatus dieser Notiz wirklich aufheben?",
        verify_title: "Notiz verifizieren",
        verify_desc: "Diese Notiz als genaues und qualitativ hochwertiges Material verifizieren?"
    },
    es: {
        comment_sending: "Enviando",
        comment_send: "Enviar",
        unverify_title: "¿Anular verificación?",
        unverify_desc: "¿Estás seguro de que deseas anular el estado de verificación de esta nota?",
        verify_title: "Verificar Nota",
        verify_desc: "¿Verificar esta nota como material preciso y de alta calidad?"
    },
    fr: {
        comment_sending: "Envoi en cours",
        comment_send: "Envoyer",
        unverify_title: "Annuler la vérification ?",
        unverify_desc: "Êtes-vous sûr de vouloir annuler le statut de vérification de cette note ?",
        verify_title: "Vérifier la note",
        verify_desc: "Vérifier cette note comme étant un document précis et de haute qualité ?"
    },
    ja: {
        comment_sending: "送信中",
        comment_send: "送信",
        unverify_title: "認証をキャンセルしますか？",
        unverify_desc: "このノートの認証ステータスをキャンセルしてもよろしいですか？",
        verify_title: "ノートを認証",
        verify_desc: "このノートを正確で高品質な資料として認証しますか？"
    },
    ko: {
        comment_sending: "전송 중",
        comment_send: "보내기",
        unverify_title: "인증 취소?",
        unverify_desc: "이 노트의 인증 상태를 취소하시겠습니까?",
        verify_title: "노트 인증",
        verify_desc: "이 노트를 정확하고 고품질의 자료로 인증하시겠습니까?"
    },
    pt: {
        comment_sending: "Enviando",
        comment_send: "Enviar",
        unverify_title: "Cancelar Verificação?",
        unverify_desc: "Tem certeza de que deseja cancelar o status de verificação desta nota?",
        verify_title: "Verificar Nota",
        verify_desc: "Verificar esta nota como material preciso e de alta qualidade?"
    },
    ru: {
        comment_sending: "Отправка",
        comment_send: "Отправить",
        unverify_title: "Отменить верификацию?",
        unverify_desc: "Вы уверены, что хотите отменить статус верификации для этой заметки?",
        verify_title: "Верифицировать заметку",
        verify_desc: "Верифицировать эту заметку как точный и качественный материал?"
    },
    zh: {
        comment_sending: "发送中",
        comment_send: "发送",
        unverify_title: "取消认证？",
        unverify_desc: "您确定要取消此笔记的认证状态吗？",
        verify_title: "认证笔记",
        verify_desc: "将此笔记认证为准确且高质量的资料？"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!json.note_detail) json.note_detail = {};
        Object.assign(json.note_detail, stage6Translations[lang]);
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    }
});
