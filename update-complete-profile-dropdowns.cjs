const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = ['id', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

const newData = {
    id: {
        edu_sd: "Sekolah Dasar (SD)",
        edu_smp: "Menengah Pertama (SMP)",
        edu_sma: "Menengah Atas (SMA/SMK)",
        edu_college: "Perguruan Tinggi (Kuliah)",
        edu_general: "Umum",
        prof_student: "Pelajar",
        prof_college_student: "Mahasiswa",
        prof_teacher: "Pengajar (Guru/Dosen)",
        prof_general: "Umum / Profesional"
    },
    en: {
        edu_sd: "Elementary School (SD)",
        edu_smp: "Junior High School (SMP)",
        edu_sma: "Senior High School (SMA/SMK)",
        edu_college: "Higher Education (College/University)",
        edu_general: "General",
        prof_student: "Student",
        prof_college_student: "College Student",
        prof_teacher: "Teacher / Lecturer",
        prof_general: "General / Professional"
    },
    de: {
        edu_sd: "Grundschule",
        edu_smp: "Mittelschule",
        edu_sma: "Gymnasium",
        edu_college: "Hochschule / Universität",
        edu_general: "Allgemein",
        prof_student: "Schüler",
        prof_college_student: "Student",
        prof_teacher: "Lehrer / Dozent",
        prof_general: "Allgemein / Professionell"
    },
    es: {
        edu_sd: "Escuela Primaria",
        edu_smp: "Escuela Secundaria",
        edu_sma: "Escuela Preparatoria",
        edu_college: "Universidad",
        edu_general: "General",
        prof_student: "Estudiante",
        prof_college_student: "Estudiante Universitario",
        prof_teacher: "Profesor / Docente",
        prof_general: "General / Profesional"
    },
    fr: {
        edu_sd: "École primaire",
        edu_smp: "Collège",
        edu_sma: "Lycée",
        edu_college: "Université",
        edu_general: "Général",
        prof_student: "Élève",
        prof_college_student: "Étudiant",
        prof_teacher: "Professeur / Enseignant",
        prof_general: "Général / Professionnel"
    },
    ja: {
        edu_sd: "小学校",
        edu_smp: "中学校",
        edu_sma: "高等学校",
        edu_college: "大学",
        edu_general: "一般",
        prof_student: "生徒",
        prof_college_student: "大学生",
        prof_teacher: "教師 / 講師",
        prof_general: "一般 / 専門家"
    },
    ko: {
        edu_sd: "초등학교",
        edu_smp: "중학교",
        edu_sma: "고등학교",
        edu_college: "대학교",
        edu_general: "일반",
        prof_student: "학생",
        prof_college_student: "대학생",
        prof_teacher: "교사 / 강사",
        prof_general: "일반 / 전문가"
    },
    pt: {
        edu_sd: "Ensino Fundamental",
        edu_smp: "Ensino Fundamental II",
        edu_sma: "Ensino Médio",
        edu_college: "Ensino Superior (Universidade)",
        edu_general: "Geral",
        prof_student: "Estudante",
        prof_college_student: "Estudante Universitário",
        prof_teacher: "Professor / Docente",
        prof_general: "Geral / Profissional"
    },
    ru: {
        edu_sd: "Начальная школа",
        edu_smp: "Средняя школа",
        edu_sma: "Старшая школа",
        edu_college: "Университет",
        edu_general: "Общее",
        prof_student: "Школьник",
        prof_college_student: "Студент",
        prof_teacher: "Учитель / Преподаватель",
        prof_general: "Общее / Профессионал"
    },
    zh: {
        edu_sd: "小学",
        edu_smp: "初中",
        edu_sma: "高中",
        edu_college: "大学",
        edu_general: "通用",
        prof_student: "学生",
        prof_college_student: "大学生",
        prof_teacher: "老师 / 讲师",
        prof_general: "通用 / 专业人士"
    }
};

for (const lang of locales) {
    const filePath = path.join(localesPath, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let json = JSON.parse(fileContent);
        
        json.complete_profile = {
            ...json.complete_profile,
            ...newData[lang]
        };
        
        fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf8');
        console.log(`Updated dropdowns in ${lang}.json`);
    }
}
