const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const certTranslations = {
    en: {
        view_cert_title: "Expert Certificate",
        view_cert_close: "Close",
        view_cert_download: "Download File",
        btn_view_cert: "View File"
    },
    id: {
        view_cert_title: "Sertifikat Pakar",
        view_cert_close: "Tutup",
        view_cert_download: "Unduh File",
        btn_view_cert: "Lihat File"
    },
    de: {
        view_cert_title: "Expertenzertifikat",
        view_cert_close: "Schließen",
        view_cert_download: "Datei herunterladen",
        btn_view_cert: "Datei ansehen"
    },
    es: {
        view_cert_title: "Certificado de Experto",
        view_cert_close: "Cerrar",
        view_cert_download: "Descargar Archivo",
        btn_view_cert: "Ver Archivo"
    },
    fr: {
        view_cert_title: "Certificat d'expert",
        view_cert_close: "Fermer",
        view_cert_download: "Télécharger le Fichier",
        btn_view_cert: "Voir le Fichier"
    },
    ja: {
        view_cert_title: "専門家証明書",
        view_cert_close: "閉じる",
        view_cert_download: "ファイルをダウンロード",
        btn_view_cert: "ファイルを見る"
    },
    ko: {
        view_cert_title: "전문가 인증서",
        view_cert_close: "닫기",
        view_cert_download: "파일 다운로드",
        btn_view_cert: "파일 보기"
    },
    pt: {
        view_cert_title: "Certificado de Especialista",
        view_cert_close: "Fechar",
        view_cert_download: "Baixar Arquivo",
        btn_view_cert: "Ver Arquivo"
    },
    ru: {
        view_cert_title: "Сертификат эксперта",
        view_cert_close: "Закрыть",
        view_cert_download: "Скачать файл",
        btn_view_cert: "Посмотреть файл"
    },
    zh: {
        view_cert_title: "专家证书",
        view_cert_close: "关闭",
        view_cert_download: "下载文件",
        btn_view_cert: "查看文件"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!json.admin_dashboard) json.admin_dashboard = {};
        Object.assign(json.admin_dashboard, certTranslations[lang]);
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    }
});
