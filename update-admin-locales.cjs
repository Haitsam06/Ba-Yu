const fs = require('fs');
const path = require('path');

const locales = ['id', 'en', 'de'];
const dataToAdd = {
    'system_server': {
        'id': 'Status Server',
        'en': 'System Servers',
        'de': 'Systemserver'
    },
    'recent_activity': {
        'id': 'Aktivitas Terkini',
        'en': 'Recent Activity',
        'de': 'Letzte Aktivitäten'
    }
};

locales.forEach(lang => {
    const filePath = path.join(__dirname, 'resources/frontend/app/locales', `${lang}.json`);
    if (fs.existsSync(filePath)) {
        let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (!content.admin_dashboard) {
            content.admin_dashboard = {};
        }

        for (const [key, translations] of Object.entries(dataToAdd)) {
            content.admin_dashboard[key] = translations[lang];
        }

        fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
        console.log(`Updated ${lang}.json successfully.`);
    }
});
