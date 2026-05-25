const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const updates = {
    'id': {
        written_by: "Ditulis oleh:",
        downloaded_at: "Diunduh:",
        pdf_restricted_title: "Materi Terproteksi",
        pdf_restricted_desc: "Versi PDF ini hanya memuat sebagian materi. Ikuti penulis <b>@{author}</b> di aplikasi Ba-Yu untuk mengunduh versi lengkapnya.",
        pdf_footer: "Dokumen ini diunduh dari <span class=\"footer-brand\">Ba-Yu</span> - Platform Belajar Masa Depan"
    },
    'en': {
        written_by: "Written by:",
        downloaded_at: "Downloaded:",
        pdf_restricted_title: "Protected Material",
        pdf_restricted_desc: "This PDF version only contains partial material. Follow the author <b>@{author}</b> on the Ba-Yu app to download the full version.",
        pdf_footer: "This document was downloaded from <span class=\"footer-brand\">Ba-Yu</span> - The Future Learning Platform"
    },
    'de': {
        written_by: "Geschrieben von:",
        downloaded_at: "Heruntergeladen:",
        pdf_restricted_title: "Geschütztes Material",
        pdf_restricted_desc: "Diese PDF-Version enthält nur teilweises Material. Folgen Sie dem Autor <b>@{author}</b> in der Ba-Yu App, um die vollständige Version herunterzuladen.",
        pdf_footer: "Dieses Dokument wurde von <span class=\"footer-brand\">Ba-Yu</span> heruntergeladen - Die Lernplattform der Zukunft"
    },
    'es': {
        written_by: "Escrito por:",
        downloaded_at: "Descargado:",
        pdf_restricted_title: "Material Protegido",
        pdf_restricted_desc: "Esta versión en PDF solo contiene material parcial. Sigue al autor <b>@{author}</b> en la aplicación Ba-Yu para descargar la versión completa.",
        pdf_footer: "Este documento fue descargado de <span class=\"footer-brand\">Ba-Yu</span> - La plataforma de aprendizaje del futuro"
    },
    'fr': {
        written_by: "Écrit par :",
        downloaded_at: "Téléchargé :",
        pdf_restricted_title: "Matériel Protégé",
        pdf_restricted_desc: "Cette version PDF ne contient que du matériel partiel. Suivez l'auteur <b>@{author}</b> sur l'application Ba-Yu pour télécharger la version complète.",
        pdf_footer: "Ce document a été téléchargé depuis <span class=\"footer-brand\">Ba-Yu</span> - La plateforme d'apprentissage du futur"
    },
    'ko': {
        written_by: "작성자:",
        downloaded_at: "다운로드:",
        pdf_restricted_title: "보호된 자료",
        pdf_restricted_desc: "이 PDF 버전은 자료의 일부만 포함하고 있습니다. 전체 버전을 다운로드하려면 Ba-Yu 앱에서 <b>@{author}</b> 작가를 팔로우하세요.",
        pdf_footer: "이 문서는 미래 학습 플랫폼 <span class=\"footer-brand\">Ba-Yu</span>에서 다운로드되었습니다"
    },
    'pt': {
        written_by: "Escrito por:",
        downloaded_at: "Baixado:",
        pdf_restricted_title: "Material Protegido",
        pdf_restricted_desc: "Esta versão em PDF contém apenas material parcial. Siga o autor <b>@{author}</b> no aplicativo Ba-Yu para baixar a versão completa.",
        pdf_footer: "Este documento foi baixado de <span class=\"footer-brand\">Ba-Yu</span> - A Plataforma de Aprendizado do Futuro"
    },
    'ru': {
        written_by: "Автор:",
        downloaded_at: "Скачано:",
        pdf_restricted_title: "Защищенный материал",
        pdf_restricted_desc: "Эта PDF-версия содержит лишь часть материала. Подпишитесь на автора <b>@{author}</b> в приложении Ba-Yu, чтобы скачать полную версию.",
        pdf_footer: "Этот документ был скачан с <span class=\"footer-brand\">Ba-Yu</span> — образовательной платформы будущего"
    },
    'zh': {
        written_by: "作者：",
        downloaded_at: "下载：",
        pdf_restricted_title: "受保护材料",
        pdf_restricted_desc: "此 PDF 版本仅包含部分材料。在 Ba-Yu 应用程序上关注作者 <b>@{author}</b> 即可下载完整版本。",
        pdf_footer: "此文档下载自 <span class=\"footer-brand\">Ba-Yu</span> - 未来学习平台"
    },
    'ja': {
        written_by: "著者：",
        downloaded_at: "ダウンロード：",
        pdf_restricted_title: "保護された資料",
        pdf_restricted_desc: "この PDF 版には資料の一部のみが含まれています。完全版をダウンロードするには、Ba-Yu アプリで著者 <b>@{author}</b> をフォローしてください。",
        pdf_footer: "このドキュメントは未来の学習プラットフォーム <span class=\"footer-brand\">Ba-Yu</span> からダウンロードされました"
    }
};

files.forEach(file => {
    const lang = file.split('.')[0];
    const filePath = path.join(localesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.note_detail) {
        data.note_detail = {};
    }
    
    const u = updates[lang] || updates['id'];
    data.note_detail.written_by = u.written_by;
    data.note_detail.downloaded_at = u.downloaded_at;
    data.note_detail.pdf_restricted_title = u.pdf_restricted_title;
    data.note_detail.pdf_restricted_desc = u.pdf_restricted_desc;
    data.note_detail.pdf_footer = u.pdf_footer;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
});
console.log("PDF Locales updated!");
