import { useState } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Share2, Bookmark, Heart, Eye, MessageCircle, Flag, Check, Star } from 'lucide-react';
import { getNoteById, getUserById, getCommentsByNoteId } from '../data/mockData';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');

  const note = getNoteById(id || '');
  const author = note ? getUserById(note.authorId) : null;
  const comments = note ? getCommentsByNoteId(note.id) : [];
  const validator = note?.validatedBy ? getUserById(note.validatedBy) : null;

  if (!note || !author) {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground">Catatan tidak ditemukan</p>
        </div>
      </MobileLayout>
    );
  }

  const handleComment = () => {
    if (commentText.trim()) {
      // Mock: add comment
      setCommentText('');
      alert('Komentar berhasil ditambahkan!');
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen pb-6 md:max-w-3xl md:mx-auto md:bg-white md:shadow-sm md:border-x md:border-gray-100">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-primary text-primary' : 'text-foreground'}`} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Flag className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Author Info */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-['Lexend_Deca'] font-semibold text-foreground">
                  {author.name}
                </h3>
                {author.role === 'pakar' && (
                  <div className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span className="text-xs font-['Manrope'] font-medium">Pakar</span>
                  </div>
                )}
              </div>
              <p className="text-sm font-['Manrope'] text-muted-foreground">{author.jenjang}</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-['Manrope'] font-medium">
              Ikuti
            </button>
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="px-6 py-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-['Manrope'] font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {note.mataPelajaran}
            </span>
            <span className="text-xs font-['Manrope'] font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              Kelas {note.kelas}
            </span>
            <span className="text-xs font-['Manrope'] font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              Semester {note.semester}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Lexend_Deca'] font-bold text-2xl text-foreground mb-3">
            {note.title}
          </h1>

          {/* Stats */}
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-['Manrope']">{note.views} views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-['Manrope']">{note.comments} komentar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              <span className="text-sm font-['Manrope']">{note.bookmarks} bookmark</span>
            </div>
          </div>

          <p className="text-sm font-['Manrope'] text-muted-foreground mb-6">
            Diupload {note.createdAt}
          </p>

          {/* Validation Status */}
          {note.isValidated && validator && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-['Lexend_Deca'] font-semibold text-green-800 text-sm">
                  Tervalidasi oleh Pakar
                </h4>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={validator.avatar}
                  alt={validator.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-['Manrope'] text-green-700">{validator.name}</span>
              </div>
              {note.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < note.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-['Lexend_Deca'] font-semibold text-foreground mb-3">
              Deskripsi
            </h3>
            <p className="font-['Manrope'] text-foreground leading-relaxed">
              {note.description}
            </p>
          </div>

          {/* Preview Content */}
          <div className="mb-6">
            <h3 className="font-['Lexend_Deca'] font-semibold text-foreground mb-3">
              Isi Catatan
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <img
                src={note.thumbnail}
                alt="Preview"
                className="w-full rounded-xl mb-4"
              />
              <p className="font-['Manrope'] text-foreground leading-relaxed">
                {note.content}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex-1 py-3 rounded-full font-['Manrope'] font-medium flex items-center justify-center gap-2 transition-all ${
                liked
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-gray-100 text-foreground'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`} />
              {liked ? 'Disukai' : 'Suka'} ({note.likes + (liked ? 1 : 0)})
            </button>
            <button className="flex-1 bg-primary text-white py-3 rounded-full font-['Manrope'] font-medium">
              Bagikan
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="font-['Lexend_Deca'] font-semibold text-foreground mb-4">
              Komentar ({comments.length})
            </h3>

            {/* Comment Input */}
            <div className="mb-6">
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-['Manrope'] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                  <button
                    onClick={handleComment}
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-['Manrope'] font-medium"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => {
                const commentAuthor = getUserById(comment.userId);
                if (!commentAuthor) return null;

                return (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={commentAuthor.avatar}
                      alt={commentAuthor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-2xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-['Lexend_Deca'] font-semibold text-sm text-foreground">
                            {commentAuthor.name}
                          </span>
                          <span className="text-xs font-['Manrope'] text-muted-foreground">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="font-['Manrope'] text-sm text-foreground">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty Comments */}
            {comments.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-['Manrope'] text-sm text-muted-foreground">
                  Belum ada komentar. Jadilah yang pertama berkomentar!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
