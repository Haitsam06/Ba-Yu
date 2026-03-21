import { useState, useRef } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, X, Check, Globe, Eye, Image as ImageIcon, Plus, Bold, Italic, List, AlignLeft } from 'lucide-react';
import { mataPelajaran } from '../data/mockData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const jenjangOptions = [
  { id: 'SD', label: 'SD', icon: '🎒', kelas: [1, 2, 3, 4, 5, 6] },
  { id: 'SMP', label: 'SMP', icon: '📚', kelas: [7, 8, 9] },
  { id: 'SMA', label: 'SMA/SMK', icon: '🎓', kelas: [10, 11, 12] },
  { id: 'Kuliah', label: 'Kuliah', icon: '🏛️', kelas: [1, 2, 3, 4, 5, 6, 7, 8] }
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const quillRef = useRef<ReactQuill>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mataPelajaran: '',
    customTags: [] as string[],
    jenjang: 'SMA',
    kelas: 10,
    semester: 1,
    thumbnail: null as File | null,
    thumbnailPreview: '',
    content: '',
    uploadedImages: [] as { file: File; preview: string }[],
    isPublic: true,
    ajukanPakar: false,
  });
  const [tagInput, setTagInput] = useState('');

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.customTags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        customTags: [...formData.customTags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      customTags: formData.customTags.filter(t => t !== tag)
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ 
          ...formData, 
          thumbnail: file,
          thumbnailPreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => {
      const reader = new FileReader();
      return new Promise<{ file: File; preview: string }>((resolve) => {
        reader.onloadend = () => {
          resolve({ file, preview: reader.result as string });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(images => {
      setFormData({
        ...formData,
        uploadedImages: [...formData.uploadedImages, ...images]
      });
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      uploadedImages: formData.uploadedImages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    // Mock: submit form
    alert('Catatan berhasil dipublikasikan! 🎉');
    navigate('/home');
  };

  const canProceedStep1 = formData.title && formData.description;
  const canProceedStep2 = formData.mataPelajaran && formData.kelas && formData.semester;
  const canSubmit = canProceedStep1 && canProceedStep2 && formData.content;

  // Get kelas options based on selected jenjang
  const kelasOptions = jenjangOptions.find(j => j.id === formData.jenjang)?.kelas || [];

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen bg-white pb-6 md:max-w-3xl md:mx-auto md:border-x md:border-gray-100 md:shadow-sm">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 z-20">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="font-['Lexend_Deca'] font-bold text-xl text-foreground">
                Buat Catatan
              </h1>
              <p className="text-sm font-['Manrope'] text-muted-foreground">
                Langkah {step} dari 3
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  s <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Step 1: Info Dasar */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Judul */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Judul Catatan *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Rumus Trigonometri Lengkap SMA"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  maxLength={100}
                />
                <p className="text-xs font-['Manrope'] text-muted-foreground mt-1.5">
                  {formData.title.length} / 100 karakter
                </p>
              </div>

              {/* Deskripsi Singkat */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Deskripsi Singkat *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan singkat tentang isi catatan ini..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs font-['Manrope'] text-muted-foreground mt-1.5">
                  {formData.description.length} / 200 karakter
                </p>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Foto Cover (Opsional)
                </label>
                <p className="text-xs font-['Manrope'] text-muted-foreground mb-3">
                  Cover akan otomatis diambil dari gambar pertama di catatan
                </p>
                {!formData.thumbnailPreview ? (
                  <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="font-['Manrope'] text-foreground mb-1 font-medium">
                      Upload foto cover
                    </p>
                    <p className="font-['Manrope'] text-sm text-muted-foreground">
                      JPG, PNG (max 5MB)
                    </p>
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={formData.thumbnailPreview}
                      alt="Thumbnail"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, thumbnail: null, thumbnailPreview: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-full font-['Lexend_Deca'] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 transition-all active:scale-95"
              >
                Lanjutkan
              </button>
            </div>
          )}

          {/* Step 2: Detail & Tags */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Jenjang */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-3">
                  Jenjang Pendidikan *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {jenjangOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFormData({ ...formData, jenjang: option.id, kelas: option.kelas[0] })}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        formData.jenjang === option.id
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-['Lexend_Deca'] font-bold text-sm text-foreground">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Kelas & Semester */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                    Kelas *
                  </label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    {kelasOptions.map((k) => (
                      <option key={k} value={k}>
                        Kelas {k}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                    Semester *
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value={1}>Semester 1</option>
                    <option value={2}>Semester 2</option>
                  </select>
                </div>
              </div>

              {/* Mata Pelajaran */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Mata Pelajaran *
                </label>
                <select
                  value={formData.mataPelajaran}
                  onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-['Manrope'] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  <option value="">Pilih mata pelajaran</option>
                  {mataPelajaran.map((mapel) => (
                    <option key={mapel.id} value={mapel.name}>
                      {mapel.icon} {mapel.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Tags */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Tag Tambahan (Opsional)
                </label>
                <p className="text-xs font-['Manrope'] text-muted-foreground mb-3">
                  Tambahkan kata kunci untuk memudahkan pencarian
                </p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Ketik tag dan tekan Enter"
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-['Manrope'] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {formData.customTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.customTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-['Manrope'] font-medium"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-foreground py-4 rounded-full font-['Lexend_Deca'] font-semibold hover:bg-gray-200 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-full font-['Lexend_Deca'] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 transition-all active:scale-95"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Konten & Pengaturan */}
          {step === 3 && (
            <div className="space-y-6">
              {/* WYSIWYG Editor */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Isi Catatan *
                </label>
                <p className="text-xs font-['Manrope'] text-muted-foreground mb-3">
                  Gunakan editor untuk memformat catatan kamu
                </p>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    modules={modules}
                    formats={formats}
                    placeholder="Mulai menulis catatan kamu di sini..."
                    className="min-h-[300px]"
                  />
                </div>
              </div>

              {/* Upload Images */}
              <div>
                <label className="block font-['Manrope'] font-semibold text-foreground text-sm mb-2">
                  Upload Gambar Pendukung (Opsional)
                </label>
                <p className="text-xs font-['Manrope'] text-muted-foreground mb-3">
                  Tambahkan gambar untuk memperjelas catatan
                </p>
                <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50 cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-['Manrope'] text-sm text-foreground font-medium">
                    Upload gambar
                  </p>
                  <p className="font-['Manrope'] text-xs text-muted-foreground">
                    Bisa pilih lebih dari 1
                  </p>
                </label>

                {formData.uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.uploadedImages.map((img, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden">
                        <img
                          src={img.preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="space-y-3">
                {/* Publik Toggle */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-0.5">
                        Publikasikan
                      </h4>
                      <p className="font-['Manrope'] text-xs text-muted-foreground">
                        Semua orang bisa melihat catatan ini
                      </p>
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        formData.isPublic ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                          formData.isPublic ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Ajukan ke Pakar */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded-xl">
                      <Eye className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-['Lexend_Deca'] font-semibold text-foreground text-sm mb-0.5">
                        Ajukan ke Pakar
                      </h4>
                      <p className="font-['Manrope'] text-xs text-muted-foreground">
                        Dapatkan validasi dari pakar
                      </p>
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, ajukanPakar: !formData.ajukanPakar })}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        formData.ajukanPakar ? 'bg-secondary' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                          formData.ajukanPakar ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h4 className="font-['Lexend_Deca'] font-semibold text-blue-900 mb-2 text-sm">
                  💡 Tips Catatan Berkualitas
                </h4>
                <ul className="space-y-1.5 font-['Manrope'] text-sm text-blue-800">
                  <li>• Format teks dengan bold, italic, dan list</li>
                  <li>• Sisipkan gambar untuk memperjelas materi</li>
                  <li>• Gunakan heading untuk struktur yang rapi</li>
                  <li>• Ajukan ke pakar untuk mendapat badge!</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-foreground py-4 rounded-full font-['Lexend_Deca'] font-semibold hover:bg-gray-200 transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-full font-['Lexend_Deca'] font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 transition-all active:scale-95"
                >
                  Publikasikan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}