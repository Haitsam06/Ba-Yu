const fs = require('fs');

const path = 'resources/frontend/app/pages/NoteDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// The replacements map
const replacements = [
    // Highlight
    { from: /"Teks berhasil di-highlight!"/g, to: 't("note_detail.highlight_success")' },
    { from: /"Gagal menyimpan highlight"/g, to: 't("note_detail.highlight_failed")' },
    { from: /"Highlight berhasil dihapus"/g, to: 't("note_detail.highlight_delete_success")' },
    { from: /"Gagal menghapus highlight"/g, to: 't("note_detail.highlight_delete_failed")' },
    { from: /<Trash2 className="w-3 h-3" \/> Hapus Highlight/g, to: '<Trash2 className="w-3 h-3" /> {t("note_detail.delete_highlight")}' },
    { from: />\s*HIGHLIGHT\s*</g, to: '>{t("note_detail.highlight_btn")}<' },
    
    // Comments Core
    { from: /"Komentar berhasil dikirim!"/g, to: 't("note_detail.comment_success")' },
    { from: /"Gagal mengirim komentar"/g, to: 't("note_detail.comment_failed")' },
    { from: /"Komentar berhasil diperbarui!"/g, to: 't("note_detail.update_comment_success")' },
    { from: /"Gagal memperbarui komentar"/g, to: 't("note_detail.update_comment_failed")' },
    { from: /"Komentar berhasil dihapus!"/g, to: 't("note_detail.delete_comment_success")' },
    { from: /"Gagal menghapus komentar"/g, to: 't("note_detail.delete_comment_failed")' },
    { from: />\s*Edit Komentar\s*</g, to: '>{t("note_detail.edit_comment")}<' },
    { from: /title:\s*"Hapus Komentar\?"/g, to: 'title: t("note_detail.delete_comment_title")' },
    { from: /description:\s*"Komentar yang dihapus tidak bisa dikembalikan lagi\."/g, to: 'description: t("note_detail.delete_comment_desc")' },
    { from: />\s*Belum ada komentar\.\s*</g, to: '>{t("note_detail.no_comments_yet")}<' },
    
    // Placeholders
    { from: /`Tulis balasan\.\.\.`/g, to: 't("note_detail.write_reply")' },
    { from: /"Tulis diskusi\.\.\."/g, to: 't("note_detail.write_discussion_short")' },
    { from: /"Tulis diskusi atau pertanyaan\.\.\."/g, to: 't("note_detail.write_discussion")' },
    
    // Buttons & Texts
    { from: />\s*Tulis Komentar\s*</g, to: '>{t("note_detail.write_comment")}<' },
    { from: />\s*Masuk untuk ikut berdiskusi dengan penulis dan pembaca lain\.\s*</g, to: '>{t("note_detail.login_to_discuss")}<' },
    { from: />\s*Catatan tidak ditemukan atau telah dihapus\.\s*</g, to: '>{t("note_detail.not_found")}<' },
    { from: />\s*Batal Verifikasi\s*</g, to: '>{t("note_detail.cancel_verification")}<' },
    { from: />\s*Verifikasi\s*</g, to: '>{t("note_detail.verify")}<' },
    { from: />\s*Mengikuti\s*</g, to: '>{t("note_detail.following")}<' },
    { from: />\s*Ikuti\s*</g, to: '>{t("note_detail.follow")}<' },
    { from: />\s*Menunggu\s*</g, to: '>{t("note_detail.pending")}<' },
    { from: />\s*Ikuti Penulis\s*</g, to: '>{t("note_detail.follow_author")}<' },
    { from: />\s*mnt baca\s*</g, to: '>{t("note_detail.minutes_read")}<' },
    { from: />\s*Review Pakar\s*</g, to: '>{t("note_detail.expert_review")}<' },
    { from: />\s*Akses Dibatasi\s*</g, to: '>{t("note_detail.restricted_access")}<' },
    { from: />\s*Penulis membatasi akses penuh untuk catatan ini\.\s*Ikuti\s*</g, to: '>{t("note_detail.restricted_desc")} <' },
    { from: />\s*untuk membuka keseluruhan materi\.\s*</g, to: '></' }, // Removed since restricted_desc has it
    { from: />\s*Permintaan Terkirim\s*</g, to: '>{t("note_detail.request_sent")}<' },
    { from: />\s*Minta Akses \(Ikuti\)\s*</g, to: '>{t("note_detail.request_access")}<' },
    { from: />\s*Materi Lengkap dalam Genggaman\s*</g, to: '>{t("note_detail.full_material")}<' },
    { from: />\s*Unduh versi PDF asli untuk dipelajari kapan saja,\s*bahkan saat Anda sedang tidak terhubung ke internet\.\s*</g, to: '>{t("note_detail.download_desc")}<' },
    { from: />\s*Download PDF Materi\s*</g, to: '>{t("note_detail.download_pdf")}<' },
    { from: />\s*Expert Verified\s*</g, to: '>{t("note_detail.expert_verified")}<' },
    { from: />\s*Kurasi Materi Pakar\s*</g, to: '>{t("note_detail.expert_curation")}<' },
    { from: />\s*Baca Selengkapnya &rarr;\s*</g, to: '>{t("note_detail.read_more")}<' },
    { from: />\s*Pakar memberikan rating tinggi untuk\s*akurasi materi ini tanpa catatan\s*tambahan\.\s*</g, to: '>{t("note_detail.high_rating")}<' },
    { from: />\s*Verified By\s*</g, to: '>{t("note_detail.verified_by")}<' },
    { from: />\s*Review Pakar Lengkap\s*</g, to: '>{t("note_detail.full_expert_review")}<' },
    { from: /Catatan kurasi dari \{validator\?.name\}/g, to: '{t("note_detail.curation_notes_from")} {validator?.name}' },
    { from: />\s*DITULIS OLEH\s*</g, to: '>{t("note_detail.written_by")}<' },
    { from: /"Pakar Pendidikan tersertifikasi yang aktif membimbing siswa dan meninjau ribuan catatan\."/g, to: 't("note_detail.default_pakar_bio")' },
    { from: /`Pelajar yang aktif membagikan catatannya\. Mari belajar bersama dan raih prestasi!`/g, to: 't("note_detail.default_user_bio")' },
    { from: />\s*Pengikut\s*</g, to: '>{t("note_detail.followers")}<' },
    { from: />\s*Tulisan\s*</g, to: '>{t("note_detail.posts")}<' },
    { from: />\s*Diskusi\s*\(/g, to: '>{t("note_detail.discussion")} (' },
    { from: />\s*Mengirim\s*</g, to: '>{t("note_detail.sending")}<' },
    { from: />\s*Kirim\s*</g, to: '>{t("note_detail.send")}<' },
    { from: />\s*Salin Tautan\s*</g, to: '>{t("note_detail.copy_link")}<' },
    { from: />\s*Laporkan\s*</g, to: '>{t("note_detail.report")}<' },
    { from: />\s*Sorot\s*</g, to: '>{t("note_detail.highlight")}<' },
    { from: />\s*Kutip\s*</g, to: '>{t("note_detail.quote")}<' },
    { from: />\s*Batal\s*</g, to: '>{t("note_detail.cancel")}<' },
    { from: />\s*Edit\s*</g, to: '>{t("note_detail.edit")}<' },
    { from: />\s*Hapus\s*</g, to: '>{t("note_detail.delete")}<' },
    { from: />\s*Simpan\s*</g, to: '>{t("note_detail.save")}<' },
    { from: />\s*Balas\s*</g, to: '>{t("note_detail.reply")}<' },
    { from: />\s*Sembunyikan Balasan\s*</g, to: '>{t("note_detail.hide_replies")}<' },
    { from: />\s*Lihat Balasan\s*</g, to: '>{t("note_detail.view_replies")}<' },
    { from: /"Tautan disalin ke papan klip!"/g, to: 't("note_detail.copied_to_clipboard")' },
    { from: /"Catatan disimpan ke markah"/g, to: 't("note_detail.bookmark_added")' },
    { from: /"Catatan dihapus dari markah"/g, to: 't("note_detail.bookmark_removed")' },
    { from: /"Anda menyukai catatan ini"/g, to: 't("note_detail.like_added")' },
    { from: /"Suka dihapus"/g, to: 't("note_detail.like_removed")' },
    { from: /"Laporan berhasil dikirim"/g, to: 't("note_detail.report_sent")' },
    { from: />\s*Lainnya dari penulis ini\s*</g, to: '>{t("note_detail.more_from_author")}<' },
    { from: />\s*Rekomendasi Catatan\s*</g, to: '>{t("note_detail.recommended_notes")}<' },
    { from: />\s*Lihat Semua\s*</g, to: '>{t("note_detail.view_all")}<' },
    
    // More complex replacements manually handled if regex fails, but let's test these first.
];

replacements.forEach(({ from, to }) => {
    content = content.replace(from, to);
});

fs.writeFileSync(path, content, 'utf8');
console.log('Finished substituting note detail texts.');
