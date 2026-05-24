const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources/frontend/app/locales');
const locales = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const exportModalKeys = {
    "col_title": { "en": "Title", "id": "Judul", "zh": "标题", "es": "Título", "de": "Titel", "ko": "제목", "fr": "Titre", "pt": "Título", "ru": "Заголовок", "ja": "タイトル" },
    "col_author": { "en": "Author", "id": "Penulis", "zh": "作者", "es": "Autor", "de": "Autor", "ko": "저자", "fr": "Auteur", "pt": "Autor", "ru": "Автор", "ja": "著者" },
    "col_subject": { "en": "Subject", "id": "Mata Pelajaran", "zh": "科目", "es": "Sujeto", "de": "Fach", "ko": "주제", "fr": "Sujet", "pt": "Assunto", "ru": "Предмет", "ja": "件名" },
    "col_class": { "en": "Class", "id": "Kelas", "zh": "班级", "es": "Clase", "de": "Klasse", "ko": "수업", "fr": "Classe", "pt": "Classe", "ru": "Класс", "ja": "クラス" },
    "col_status": { "en": "Status", "id": "Status", "zh": "状态", "es": "Estado", "de": "Status", "ko": "상태", "fr": "Statut", "pt": "Status", "ru": "Статус", "ja": "ステータ스" },
    "col_date": { "en": "Date", "id": "Tanggal", "zh": "日期", "es": "Fecha", "de": "Datum", "ko": "날짜", "fr": "Date", "pt": "Data", "ru": "Дата", "ja": "日付" },
    "col_target": { "en": "Target", "id": "Target", "zh": "目标", "es": "Objetivo", "de": "Ziel", "ko": "대상", "fr": "Cible", "pt": "Alvo", "ru": "Цель", "ja": "ターゲット" },
    "col_reporter": { "en": "Reporter", "id": "Pelapor", "zh": "举报人", "es": "Informante", "de": "Melder", "ko": "보고자", "fr": "Signalant", "pt": "Relator", "ru": "Заявитель", "ja": "報告者" },
    "col_reason": { "en": "Reason", "id": "Alasan", "zh": "原因", "es": "Razón", "de": "Grund", "ko": "이유", "fr": "Raison", "pt": "Razão", "ru": "Причина", "ja": "理由" },
    "col_desc": { "en": "Description", "id": "Deskripsi", "zh": "描述", "es": "Descripción", "de": "Beschreibung", "ko": "설명", "fr": "Description", "pt": "Descrição", "ru": "Описание", "ja": "説明" },
    "col_user_id": { "en": "User ID", "id": "User ID", "zh": "用户ID", "es": "ID de usuario", "de": "Benutzer-ID", "ko": "사용자 ID", "fr": "ID utilisateur", "pt": "ID do usuário", "ru": "ID пользователя", "ja": "ユーザーID" },
    "col_field": { "en": "Field of Expertise", "id": "Bidang Keahlian", "zh": "专业领域", "es": "Campo de experiencia", "de": "Fachgebiet", "ko": "전문 분야", "fr": "Domaine d'expertise", "pt": "Campo de Especialidade", "ru": "Область знаний", "ja": "専門分野" },
    "col_reject_reason": { "en": "Rejection Reason", "id": "Alasan Penolakan", "zh": "拒绝原因", "es": "Motivo de rechazo", "de": "Ablehnungsgrund", "ko": "거부 이유", "fr": "Motif de rejet", "pt": "Motivo de rejeição", "ru": "Причина отказа", "ja": "拒否理由" },
    "col_name": { "en": "Name", "id": "Nama", "zh": "名称", "es": "Nombre", "de": "Name", "ko": "이름", "fr": "Nom", "pt": "Nome", "ru": "Имя", "ja": "名前" },
    "col_email": { "en": "Email", "id": "Email", "zh": "电子邮件", "es": "Correo electrónico", "de": "E-Mail", "ko": "이메일", "fr": "E-mail", "pt": "E-mail", "ru": "Эл. почта", "ja": "メール" },
    "col_role": { "en": "Role", "id": "Role", "zh": "角色", "es": "Rol", "de": "Rolle", "ko": "역할", "fr": "Rôle", "pt": "Função", "ru": "Роль", "ja": "役割" },
    "col_reg_date": { "en": "Registration Date", "id": "Tanggal Daftar", "zh": "注册日期", "es": "Fecha de registro", "de": "Registrierungsdatum", "ko": "등록일", "fr": "Date d'inscription", "pt": "Data de Registro", "ru": "Дата регистрации", "ja": "登録日" }
};

locales.forEach(file => {
    const filePath = path.join(localesDir, file);
    const lang = file.split('.')[0];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.export_modal) data.export_modal = {};
    for (const [key, translations] of Object.entries(exportModalKeys)) {
        data.export_modal[key] = translations[lang] || translations['en'];
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
});
console.log("Done updating export locales");
