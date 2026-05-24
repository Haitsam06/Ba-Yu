const fs = require('fs');

const content = fs.readFileSync('resources/frontend/app/pages/NoteDetailPage.tsx', 'utf8');

// Match everything between > and <
const matches = content.match(/>([^<]+)</g);

if (matches) {
    const cleaned = matches
        .map(m => m.slice(1, -1).trim())
        // filter out pure punctuation, empty strings, numbers, or simple operators
        .filter(m => m.length > 2 && !/^[0-9\s.,;:'"?!@#$%^&*()[\]{}+-=_]+$/.test(m) && !m.includes('=>') && !m.includes('&&') && !m.includes('||'));
        
    const unique = [...new Set(cleaned)];
    console.log(unique.slice(0, 100).join('\n'));
}
