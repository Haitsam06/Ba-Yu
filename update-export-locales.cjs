const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources/frontend/app/locales');
const locales = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const newKeys = {
    "status_pending": {
        "en": "Pending", "id": "Menunggu", "zh": "待定", "es": "Pendiente",
        "de": "Ausstehend", "ko": "대기 중", "fr": "En attente", "pt": "Pendente",
        "ru": "В ожидании", "ja": "保留中"
    },
    "status_resolved": {
        "en": "Resolved", "id": "Selesai", "zh": "已解决", "es": "Resuelto",
        "de": "Gelöst", "ko": "해결됨", "fr": "Résolu", "pt": "Resolvido",
        "ru": "Решено", "ja": "解決済み"
    },
    "status_rejected": {
        "en": "Rejected", "id": "Ditolak", "zh": "已拒绝", "es": "Rechazado",
        "de": "Abgelehnt", "ko": "거부됨", "fr": "Rejeté", "pt": "Rejeitado",
        "ru": "Отклонено", "ja": "拒否されました"
    },
    "status_approved": {
        "en": "Approved", "id": "Disetujui", "zh": "已批准", "es": "Aprobado",
        "de": "Genehmigt", "ko": "승인됨", "fr": "Approuvé", "pt": "Aprovado",
        "ru": "Одобрено", "ja": "承認済み"
    },
    "cat_certs": {
        "en": "Certifications", "id": "Sertifikasi", "zh": "认证", "es": "Certificaciones",
        "de": "Zertifizierungen", "ko": "인증", "fr": "Certifications", "pt": "Certificações",
        "ru": "Сертификаты", "ja": "認定"
    },
    "certs_desc": {
        "en": "List of expert certification submissions.", "id": "Daftar pengajuan sertifikasi pakar.",
        "zh": "专家认证申请列表。", "es": "Lista de presentaciones de certificación de expertos.",
        "de": "Liste der Expertenzertifizierungsanträge.", "ko": "전문가 인증 제출 목록.",
        "fr": "Liste des soumissions de certification d'experts.", "pt": "Lista de envios de certificação de especialistas.",
        "ru": "Список заявок на сертификацию экспертов.", "ja": "専門家認定の提出リスト。"
    }
};

const adminDashboardKeys = {
    "tab_pending": {
        "en": "Action Needed", "id": "Menunggu Tindakan", "zh": "需要行动", "es": "Acción necesaria",
        "de": "Handlung erforderlich", "ko": "조치 필요", "fr": "Action requise", "pt": "Ação necessária",
        "ru": "Требуется действие", "ja": "アクションが必要"
    },
    "tab_history": {
        "en": "History", "id": "Riwayat", "zh": "历史记录", "es": "Historial",
        "de": "Verlauf", "ko": "기록", "fr": "Historique", "pt": "Histórico",
        "ru": "История", "ja": "履歴"
    }
}

locales.forEach(file => {
    const filePath = path.join(localesDir, file);
    const lang = file.split('.')[0];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.export_modal) data.export_modal = {};
    for (const [key, translations] of Object.entries(newKeys)) {
        if (!data.export_modal[key]) {
            data.export_modal[key] = translations[lang] || translations['en'];
        }
    }
    
    if (!data.admin_dashboard) data.admin_dashboard = {};
    for (const [key, translations] of Object.entries(adminDashboardKeys)) {
        if (!data.admin_dashboard[key]) {
            data.admin_dashboard[key] = translations[lang] || translations['en'];
        }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
});
console.log("Done updating locales");
