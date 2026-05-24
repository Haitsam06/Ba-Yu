const fs = require('fs');

const content = fs.readFileSync('resources/frontend/app/pages/NoteDetailPage.tsx', 'utf8');

// Match text nodes within JSX that might be Indonesian
// Very rough regex just to get a sense of what's hardcoded
const matches = content.match(/>([^<{}]+)</g);

if (matches) {
    const cleaned = matches
        .map(m => m.slice(1, -1).trim())
        .filter(m => m.length > 2 && !m.match(/^[0-9\s]+$/) && !m.includes('&&') && !m.includes('=>'));
        
    // Unique values
    const unique = [...new Set(cleaned)];
    console.log("Found", unique.length, "potential strings.");
    console.log(unique.slice(0, 50).join('\n'));
} else {
    console.log("No matches found.");
}
