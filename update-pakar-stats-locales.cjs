const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const translations = {
  'id.json': 'Ditolak',
  'en.json': 'Rejected',
  'ja.json': '拒否されました',
  'ko.json': '거부됨',
  'zh.json': '已拒绝',
  'es.json': 'Rechazado',
  'fr.json': 'Rejeté',
  'de.json': 'Abgelehnt',
  'pt.json': 'Rejeitado',
  'ru.json': 'Отклоненный'
};

for (const file of files) {
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.pakar_dashboard) {
    data.pakar_dashboard.rejected_stats = translations[file] || 'Rejected';
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Updated ${file}`);
  }
}
