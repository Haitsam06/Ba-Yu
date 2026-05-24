const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');

const highlightTranslations = {
    en: {
        highlight_success: "Text successfully highlighted!",
        highlight_failed: "Failed to save highlight",
        highlight_delete_success: "Highlight successfully deleted",
        highlight_delete_failed: "Failed to delete highlight",
        delete_highlight: "Delete Highlight",
        highlight_btn: "HIGHLIGHT",
        edit_comment: "Edit Comment",
        delete_comment_title: "Delete Comment?",
        delete_comment_desc: "Deleted comments cannot be restored.",
        write_reply: "Write reply...",
        write_discussion_short: "Write discussion...",
        comment_success: "Comment successfully posted!",
        comment_failed: "Failed to post comment",
        update_comment_success: "Comment successfully updated!",
        update_comment_failed: "Failed to update comment",
        delete_comment_success: "Comment successfully deleted!",
        delete_comment_failed: "Failed to delete comment",
        no_comments_yet: "No comments yet."
    },
    id: {
        highlight_success: "Teks berhasil di-highlight!",
        highlight_failed: "Gagal menyimpan highlight",
        highlight_delete_success: "Highlight berhasil dihapus",
        highlight_delete_failed: "Gagal menghapus highlight",
        delete_highlight: "Hapus Highlight",
        highlight_btn: "HIGHLIGHT",
        edit_comment: "Edit Komentar",
        delete_comment_title: "Hapus Komentar?",
        delete_comment_desc: "Komentar yang dihapus tidak bisa dikembalikan lagi.",
        write_reply: "Tulis balasan...",
        write_discussion_short: "Tulis diskusi...",
        comment_success: "Komentar berhasil dikirim!",
        comment_failed: "Gagal mengirim komentar",
        update_comment_success: "Komentar berhasil diperbarui!",
        update_comment_failed: "Gagal memperbarui komentar",
        delete_comment_success: "Komentar berhasil dihapus!",
        delete_comment_failed: "Gagal menghapus komentar",
        no_comments_yet: "Belum ada komentar."
    },
    de: {
        highlight_success: "Text erfolgreich hervorgehoben!",
        highlight_failed: "Fehler beim Speichern der Hervorhebung",
        highlight_delete_success: "Hervorhebung erfolgreich gelöscht",
        highlight_delete_failed: "Fehler beim Löschen der Hervorhebung",
        delete_highlight: "Hervorhebung löschen",
        highlight_btn: "HERVORHEBEN",
        edit_comment: "Kommentar bearbeiten",
        delete_comment_title: "Kommentar löschen?",
        delete_comment_desc: "Gelöschte Kommentare können nicht wiederhergestellt werden.",
        write_reply: "Antwort schreiben...",
        write_discussion_short: "Diskussion schreiben...",
        comment_success: "Kommentar erfolgreich gesendet!",
        comment_failed: "Fehler beim Senden des Kommentars",
        update_comment_success: "Kommentar erfolgreich aktualisiert!",
        update_comment_failed: "Fehler beim Aktualisieren des Kommentars",
        delete_comment_success: "Kommentar erfolgreich gelöscht!",
        delete_comment_failed: "Fehler beim Löschen des Kommentars",
        no_comments_yet: "Noch keine Kommentare."
    },
    es: {
        highlight_success: "¡Texto resaltado con éxito!",
        highlight_failed: "Error al guardar el resaltado",
        highlight_delete_success: "Resaltado eliminado con éxito",
        highlight_delete_failed: "Error al eliminar el resaltado",
        delete_highlight: "Eliminar resaltado",
        highlight_btn: "RESALTAR",
        edit_comment: "Editar comentario",
        delete_comment_title: "¿Eliminar comentario?",
        delete_comment_desc: "Los comentarios eliminados no se pueden restaurar.",
        write_reply: "Escribir respuesta...",
        write_discussion_short: "Escribir discusión...",
        comment_success: "¡Comentario publicado con éxito!",
        comment_failed: "Error al publicar el comentario",
        update_comment_success: "¡Comentario actualizado con éxito!",
        update_comment_failed: "Error al actualizar el comentario",
        delete_comment_success: "¡Comentario eliminado con éxito!",
        delete_comment_failed: "Error al eliminar el comentario",
        no_comments_yet: "Aún no hay comentarios."
    },
    fr: {
        highlight_success: "Texte surligné avec succès !",
        highlight_failed: "Échec de l'enregistrement du surlignage",
        highlight_delete_success: "Surlignage supprimé avec succès",
        highlight_delete_failed: "Échec de la suppression du surlignage",
        delete_highlight: "Supprimer le surlignage",
        highlight_btn: "SURLIGNER",
        edit_comment: "Modifier le commentaire",
        delete_comment_title: "Supprimer le commentaire ?",
        delete_comment_desc: "Les commentaires supprimés ne peuvent pas être restaurés.",
        write_reply: "Écrire une réponse...",
        write_discussion_short: "Écrire une discussion...",
        comment_success: "Commentaire publié avec succès !",
        comment_failed: "Échec de la publication du commentaire",
        update_comment_success: "Commentaire mis à jour avec succès !",
        update_comment_failed: "Échec de la mise à jour du commentaire",
        delete_comment_success: "Commentaire supprimé avec succès !",
        delete_comment_failed: "Échec de la suppression du commentaire",
        no_comments_yet: "Pas encore de commentaires."
    },
    ja: {
        highlight_success: "テキストが正常にハイライトされました！",
        highlight_failed: "ハイライトの保存に失敗しました",
        highlight_delete_success: "ハイライトが正常に削除されました",
        highlight_delete_failed: "ハイライトの削除に失敗しました",
        delete_highlight: "ハイライトを削除",
        highlight_btn: "ハイライト",
        edit_comment: "コメントを編集",
        delete_comment_title: "コメントを削除しますか？",
        delete_comment_desc: "削除されたコメントは元に戻せません。",
        write_reply: "返信を書く...",
        write_discussion_short: "ディスカッションを書く...",
        comment_success: "コメントが正常に投稿されました！",
        comment_failed: "コメントの投稿に失敗しました",
        update_comment_success: "コメントが正常に更新されました！",
        update_comment_failed: "コメントの更新に失敗しました",
        delete_comment_success: "コメントが正常に削除されました！",
        delete_comment_failed: "コメントの削除に失敗しました",
        no_comments_yet: "まだコメントはありません。"
    },
    ko: {
        highlight_success: "텍스트가 성공적으로 강조되었습니다!",
        highlight_failed: "강조 표시 저장 실패",
        highlight_delete_success: "강조 표시가 성공적으로 삭제되었습니다",
        highlight_delete_failed: "강조 표시 삭제 실패",
        delete_highlight: "강조 표시 삭제",
        highlight_btn: "강조",
        edit_comment: "댓글 편집",
        delete_comment_title: "댓글을 삭제하시겠습니까?",
        delete_comment_desc: "삭제된 댓글은 복구할 수 없습니다.",
        write_reply: "답글 작성...",
        write_discussion_short: "토론 작성...",
        comment_success: "댓글이 성공적으로 게시되었습니다!",
        comment_failed: "댓글 게시 실패",
        update_comment_success: "댓글이 성공적으로 업데이트되었습니다!",
        update_comment_failed: "댓글 업데이트 실패",
        delete_comment_success: "댓글이 성공적으로 삭제되었습니다!",
        delete_comment_failed: "댓글 삭제 실패",
        no_comments_yet: "아직 댓글이 없습니다."
    },
    pt: {
        highlight_success: "Texto destacado com sucesso!",
        highlight_failed: "Falha ao salvar destaque",
        highlight_delete_success: "Destaque excluído com sucesso",
        highlight_delete_failed: "Falha ao excluir destaque",
        delete_highlight: "Excluir Destaque",
        highlight_btn: "DESTACAR",
        edit_comment: "Editar Comentário",
        delete_comment_title: "Excluir Comentário?",
        delete_comment_desc: "Comentários excluídos não podem ser restaurados.",
        write_reply: "Escrever resposta...",
        write_discussion_short: "Escrever discussão...",
        comment_success: "Comentário postado com sucesso!",
        comment_failed: "Falha ao postar comentário",
        update_comment_success: "Comentário atualizado com sucesso!",
        update_comment_failed: "Falha ao atualizar comentário",
        delete_comment_success: "Comentário excluído com sucesso!",
        delete_comment_failed: "Falha ao excluir comentário",
        no_comments_yet: "Ainda não há comentários."
    },
    ru: {
        highlight_success: "Текст успешно выделен!",
        highlight_failed: "Не удалось сохранить выделение",
        highlight_delete_success: "Выделение успешно удалено",
        highlight_delete_failed: "Не удалось удалить выделение",
        delete_highlight: "Удалить выделение",
        highlight_btn: "ВЫДЕЛИТЬ",
        edit_comment: "Изменить комментарий",
        delete_comment_title: "Удалить комментарий?",
        delete_comment_desc: "Удаленные комментарии не могут быть восстановлены.",
        write_reply: "Написать ответ...",
        write_discussion_short: "Написать обсуждение...",
        comment_success: "Комментарий успешно опубликован!",
        comment_failed: "Не удалось опубликовать комментарий",
        update_comment_success: "Комментарий успешно обновлен!",
        update_comment_failed: "Не удалось обновить комментарий",
        delete_comment_success: "Комментарий успешно удален!",
        delete_comment_failed: "Не удалось удалить комментарий",
        no_comments_yet: "Пока нет комментариев."
    },
    zh: {
        highlight_success: "文本突出显示成功！",
        highlight_failed: "无法保存突出显示",
        highlight_delete_success: "突出显示成功删除",
        highlight_delete_failed: "无法删除突出显示",
        delete_highlight: "删除突出显示",
        highlight_btn: "突出显示",
        edit_comment: "编辑评论",
        delete_comment_title: "删除评论？",
        delete_comment_desc: "删除的评论无法恢复。",
        write_reply: "写回复...",
        write_discussion_short: "写讨论...",
        comment_success: "评论发布成功！",
        comment_failed: "评论发布失败",
        update_comment_success: "评论更新成功！",
        update_comment_failed: "评论更新失败",
        delete_comment_success: "评论成功删除！",
        delete_comment_failed: "删除评论失败",
        no_comments_yet: "暂无评论。"
    }
};

const langs = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            let json = JSON.parse(fileData);
            
            // Merge settings
            if (!json.note_detail) {
                json.note_detail = {};
            }
            Object.assign(json.note_detail, highlightTranslations[lang]);
            
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            console.log(`Updated ${lang}.json for note_detail with highlight strings`);
        } catch (err) {
            console.error(`Error processing ${lang}.json:`, err);
        }
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});
