const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const updates = {
    'id': { respond: "TANGGAPI", highlight: "SOROT" },
    'en': { respond: "RESPOND", highlight: "HIGHLIGHT" },
    'de': { respond: "ANTWORTEN", highlight: "HERVORHEBEN" },
    'es': { respond: "RESPONDER", highlight: "RESALTAR" },
    'fr': { respond: "RÉPONDRE", highlight: "SURLIGNER" },
    'ko': { respond: "응답하다", highlight: "강조하다" },
    'pt': { respond: "RESPONDER", highlight: "DESTACAR" },
    'ru': { respond: "ОТВЕТИТЬ", highlight: "ВЫДЕЛИТЬ" },
    'zh': { respond: "回复", highlight: "强调" },
    'ja': { respond: "返信する", highlight: "ハイライト" }
};

files.forEach(file => {
    const lang = file.split('.')[0];
    const filePath = path.join(localesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.note_detail) {
        data.note_detail = {};
    }
    
    data.note_detail.respond_btn = updates[lang]?.respond || "RESPOND";
    data.note_detail.highlight_btn = updates[lang]?.highlight || "HIGHLIGHT";
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
});
console.log("Locales updated!");
