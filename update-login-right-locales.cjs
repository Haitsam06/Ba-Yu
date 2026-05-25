const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = {
  id: {
    panel_title: "Memberdayakan Pendidikan.",
    panel_desc: "Bergabunglah dengan ribuan pelajar dan pakar untuk berbagi, belajar, dan tumbuh bersama."
  },
  en: {
    panel_title: "Empowering Education.",
    panel_desc: "Join thousands of students and experts to share, learn, and grow together."
  },
  ko: {
    panel_title: "교육의 힘을 키우다.",
    panel_desc: "수천 명의 학생 및 전문가와 함께 나누고, 배우고, 함께 성장하세요."
  },
  ja: {
    panel_title: "教育に力を。",
    panel_desc: "何千人もの学生や専門家に参加して、共有し、学び、共に成長しましょう。"
  },
  zh: {
    panel_title: "赋能教育。",
    panel_desc: "与数千名学生和专家一起分享、学习并共同成长。"
  },
  de: {
    panel_title: "Bildung stärken.",
    panel_desc: "Schließen Sie sich Tausenden von Studenten und Experten an, um gemeinsam zu teilen, zu lernen und zu wachsen."
  },
  fr: {
    panel_title: "Autonomiser l'éducation.",
    panel_desc: "Rejoignez des milliers d'étudiants et d'experts pour partager, apprendre et grandir ensemble."
  },
  es: {
    panel_title: "Empoderando la Educación.",
    panel_desc: "Únase a miles de estudiantes y expertos para compartir, aprender y crecer juntos."
  },
  pt: {
    panel_title: "Capacitando a Educação.",
    panel_desc: "Junte-se a milhares de estudantes e especialistas para compartilhar, aprender e crescer juntos."
  },
  ru: {
    panel_title: "Расширение возможностей образования.",
    panel_desc: "Присоединяйтесь к тысячам студентов и экспертов, чтобы делиться, учиться и расти вместе."
  }
};

Object.entries(locales).forEach(([lang, texts]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.auth) {
      data.auth = {};
    }
    
    // Merge new texts into auth
    Object.assign(data.auth, texts);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated auth locales in ${lang}.json`);
  }
});
