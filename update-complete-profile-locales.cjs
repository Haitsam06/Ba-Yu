const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = ['id', 'en', 'de'];

const newData = {
    id: {
        complete_profile: {
            title: "Lengkapi Profilmu",
            subtitle: "Satu langkah lagi untuk mulai membagikan catatan belajarmu.",
            full_name_label: "Nama Lengkap",
            username_label: "Username",
            username_hint: "(Tanpa spasi)",
            education_label: "Jenjang Pendidikan",
            profession_label: "Profesi / Peran",
            school_label: "Instansi / Sekolah",
            school_placeholder: "Contoh: SMAN 1 Jakarta",
            submit_button: "Simpan & Lanjutkan",
            submitting: "Menyimpan...",
            username_error: "Username hanya boleh mengandung huruf, angka, dan underscore (_)",
            success_msg: "Profil berhasil dilengkapi! Selamat datang di Ba-Yu",
            error_msg: "Terjadi kesalahan saat menyimpan profil"
        }
    },
    en: {
        complete_profile: {
            title: "Complete Your Profile",
            subtitle: "One more step to start sharing your study notes.",
            full_name_label: "Full Name",
            username_label: "Username",
            username_hint: "(No spaces)",
            education_label: "Education Level",
            profession_label: "Profession / Role",
            school_label: "Institution / School",
            school_placeholder: "Example: Harvard University",
            submit_button: "Save & Continue",
            submitting: "Saving...",
            username_error: "Username can only contain letters, numbers, and underscores (_)",
            success_msg: "Profile successfully completed! Welcome to Ba-Yu",
            error_msg: "An error occurred while saving the profile"
        }
    },
    de: {
        complete_profile: {
            title: "Vervollständige dein Profil",
            subtitle: "Noch ein Schritt, um deine Lernnotizen zu teilen.",
            full_name_label: "Vollständiger Name",
            username_label: "Benutzername",
            username_hint: "(Keine Leerzeichen)",
            education_label: "Bildungsabschluss",
            profession_label: "Beruf / Rolle",
            school_label: "Institution / Schule",
            school_placeholder: "Beispiel: Universität Berlin",
            submit_button: "Speichern & Weiter",
            submitting: "Speichern...",
            username_error: "Benutzername darf nur Buchstaben, Zahlen und Unterstriche (_) enthalten",
            success_msg: "Profil erfolgreich vervollständigt! Willkommen bei Ba-Yu",
            error_msg: "Beim Speichern des Profils ist ein Fehler aufgetreten"
        }
    }
};

for (const lang of locales) {
    const filePath = path.join(localesPath, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let json = JSON.parse(fileContent);
        
        json.complete_profile = newData[lang].complete_profile;
        
        fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf8');
        console.log(`Updated ${lang}.json`);
    }
}
