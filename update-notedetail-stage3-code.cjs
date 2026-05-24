const fs = require('fs');
const path = 'resources/frontend/app/pages/NoteDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Bagian Profil
content = content.replace(/>\s*Pakar Terverifikasi\s*</g, '>{t("note_detail.verified_expert")}<');
content = content.replace(/title="Pakar Terverifikasi"/g, 'title={t("note_detail.verified_expert")}');
content = content.replace(/>\s*Pengikut\s*</g, '>{t("note_detail.followers")}<');
content = content.replace(/>\s*Tulisan\s*</g, '>{t("note_detail.posts")}<');

// Komentar
content = content.replace(/>\s*Suka\s*\{" "\}/g, '>{t("note_detail.comment_like")} {" "}');
content = content.replace(/>\s*Balas\s*</g, '>{t("note_detail.comment_reply")}<');

// Modal Report
content = content.replace(/>\s*Bantu kami menjaga ekosistem Ba-Yu tetap\s*edukatif, aman, dan nyaman.\s*</g, '>{t("note_detail.report_help_desc")}<');
content = content.replace(/>\s*Alasan Utama\s*</g, '>{t("note_detail.report_main_reason")}<');
content = content.replace(/>\s*Tutup Modal\s*</g, '>{t("note_detail.close_modal")}<');

// Modal Report Options
content = content.replace(/label: "Pilih alasan pelaporan\.\.\."/g, 'label: t("note_detail.report_reason_placeholder")');
content = content.replace(/label: "Spam pemasaran \/ Iklan mengganggu"/g, 'label: t("note_detail.report_reason_spam")');
content = content.replace(/label: "Informasi keliru \/ Misinformasi materi"/g, 'label: t("note_detail.report_reason_inappropriate")');
content = content.replace(/label: "Ujaran kebencian \/ Kata-kata kasar"/g, 'label: t("note_detail.report_reason_harassment")');
content = content.replace(/label: "Pelecehan \/ Intimidasi terhadap user"/g, 'label: t("note_detail.report_reason_harassment")'); // Merging with harassment
content = content.replace(/label: "Pelanggaran Hak Cipta \/ Plagiasi"/g, 'label: t("note_detail.report_reason_copyright")');
content = content.replace(/label: "Alasan lainnya\.\.\."/g, 'label: t("note_detail.report_reason_other")');

// Laporkan Catatan / Komentar Header
content = content.replace(/"Catatan"/g, 't("note_detail.report_note")');
content = content.replace(/"Komentar"/g, 't("note_detail.report_comment")');

fs.writeFileSync(path, content, 'utf8');
console.log('Finished stage 3 replacements.');
