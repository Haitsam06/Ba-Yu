import { useState, useRef, useCallback, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { ArrowLeft, Camera, User, BookOpen, Phone, AlertCircle, Loader2, ZoomIn, ZoomOut, Move, RotateCcw, Check, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';

export default function EditProfilePage() {
  const { user, updateUserSession } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { showToast } = useToast();

  // Local state for the form, pre-filled with actual active user data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    jenjang_pendidikan: user?.jenjang_pendidikan || 'SMP',
    school: user?.school || '',
    phone: user?.phone || ''
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSourceSelector, setShowSourceSelector] = useState(false);

  // Camera state
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraCanvasRef = useRef<HTMLCanvasElement>(null);

  const openCamera = () => {
    setShowSourceSelector(false);
    setCameraError('');
    setShowCameraDialog(true);
  };

  // Start camera stream AFTER the dialog is rendered and video element is mounted
  useEffect(() => {
    if (!showCameraDialog) return;
    let stream: MediaStream | null = null;
    const startStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera error:', err);
        setCameraError('Gagal mengakses kamera. Pastikan browser memberikan izin kamera.');
      }
    };
    startStream();
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [showCameraDialog]);

  const closeCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setShowCameraDialog(false);
  }, []);

  useEffect(() => {
    return () => { closeCamera(); };
  }, [closeCamera]);

  const capturePhoto = () => {
    if (!videoRef.current || !cameraCanvasRef.current) return;
    const video = videoRef.current;
    const canvas = cameraCanvasRef.current;
    // Square crop from center of video
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        closeCamera();
        // Feed into crop editor
        setRawImageUrl(url);
        setCropZoom(1);
        setCropOffset({ x: 0, y: 0 });
        setShowCropEditor(true);
      }
    }, 'image/jpeg', 0.92);
  };

  // Crop Editor state
  const [showCropEditor, setShowCropEditor] = useState(false);
  const [rawImageUrl, setRawImageUrl] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);
  const cropImageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRawImageUrl(url);
      setCropZoom(1);
      setCropOffset({ x: 0, y: 0 });
      setShowCropEditor(true);
    }
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCropConfirm = useCallback(() => {
    const img = cropImageRef.current;
    const canvas = cropCanvasRef.current;
    if (!img || !canvas) return;

    const outputSize = 400; // Final avatar px
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate the visible crop region
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawW: number, drawH: number;
    
    // The image is displayed to fill the circular viewport (300x300 CSS px area)
    // We scale based on the smaller dimension to cover the square
    const viewportSize = 300;
    if (imgAspect > 1) {
      // Landscape: height fills viewport
      drawH = viewportSize * cropZoom;
      drawW = drawH * imgAspect;
    } else {
      // Portrait: width fills viewport
      drawW = viewportSize * cropZoom;
      drawH = drawW / imgAspect;
    }

    // Map the offset from CSS px to image natural coordinates
    const scaleToNatural = img.naturalWidth / drawW;
    
    // Center of the viewport in image-draw coordinates
    const centerXInDraw = (drawW / 2) - cropOffset.x;
    const centerYInDraw = (drawH / 2) - cropOffset.y;

    // The crop square in image-draw coordinates
    const cropSizeInDraw = viewportSize;
    const cropLeftInDraw = centerXInDraw - cropSizeInDraw / 2;
    const cropTopInDraw = centerYInDraw - cropSizeInDraw / 2;

    // Convert to natural image coordinates
    const sx = cropLeftInDraw * scaleToNatural;
    const sy = cropTopInDraw * scaleToNatural;
    const sSize = cropSizeInDraw * scaleToNatural;

    ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, outputSize, outputSize);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `avatar_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(blob));
        setShowCropEditor(false);
        if (rawImageUrl) URL.revokeObjectURL(rawImageUrl);
      }
    }, 'image/jpeg', 0.92);
  }, [cropZoom, cropOffset, rawImageUrl]);

  const handleCropCancel = () => {
    setShowCropEditor(false);
    if (rawImageUrl) URL.revokeObjectURL(rawImageUrl);
    setRawImageUrl(null);
  };

  // Drag handlers for the crop editor
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropOffset.x, y: e.clientY - cropOffset.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setCropOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onPointerUp = () => setIsDragging(false);

  // Wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setCropZoom(prev => Math.min(5, Math.max(1, prev + (e.deltaY > 0 ? -0.1 : 0.1))));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
       setErrorMsg('Nama lengkap tidak boleh kosong');
       return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      const token = localStorage.getItem('bayu-token');
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('bio', formData.bio);
      submitData.append('jenjang_pendidikan', formData.jenjang_pendidikan);
      submitData.append('school', formData.school);
      submitData.append('phone', formData.phone);
      if (avatarFile) {
        submitData.append('avatar', avatarFile);
      }

      // Update data via API using POST spoofing for multipart PUT
      const response = await axios.post('/api/v1/users/me?_method=PUT', submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update global context so changes reflect immediately everywhere
      if (response.data && response.data.data) {
         updateUserSession(response.data.data);
      } else {
         // Fallback manual update if response format is unexpected
         updateUserSession(formData);
      }

      showToast('Profil berhasil diperbarui!', 'success');
      navigate('/profile');
    } catch (error: any) {
      console.error('Failed to update profile', error);
      setErrorMsg(error.response?.data?.message || 'Gagal menyimpan perubahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Compute image style for cropper preview
  const getCropImageStyle = (): React.CSSProperties => {
    if (!cropImageRef.current) return {};
    const img = cropImageRef.current;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const viewportSize = 300;
    let drawW: number, drawH: number;
    if (imgAspect > 1) {
      drawH = viewportSize * cropZoom;
      drawW = drawH * imgAspect;
    } else {
      drawW = viewportSize * cropZoom;
      drawH = drawW / imgAspect;
    }
    return {
      width: `${drawW}px`,
      height: `${drawH}px`,
      transform: `translate(${cropOffset.x}px, ${cropOffset.y}px)`,
      maxWidth: 'none',
    };
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="min-h-screen pb-10 bg-[#FAFAFA]">
        {/* Header - Transparent & Refined */}
        <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-md z-20 px-5 pt-8 pb-4 flex items-center justify-between border-b border-gray-100 mb-6">
          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-full transition-colors shadow-sm disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900 font-['Lexend_Deca'] font-bold text-lg">
            Edit Profil
          </h1>
          <div className="w-10"></div> {/* Spacer for perfect centering */}
        </div>

        <div className="max-w-xl mx-auto px-5">
          
          {errorMsg && (
             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 font-['Manrope'] text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{errorMsg}</p>
             </div>
          )}

          {/* Avatar Section - Clean White Background */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center mb-6">
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div 
              className="relative mb-4 cursor-pointer group"
              onClick={() => setShowSourceSelector(true)}
            >
              <img
                src={avatarPreview || user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                alt={user?.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-50 shadow-sm transition-transform group-hover:scale-105"
              />
              <button 
                type="button"
                className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-md transition-transform border-2 border-white pointer-events-none group-hover:scale-110"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p 
              onClick={() => setShowSourceSelector(true)} 
              className="font-['Manrope'] text-sm font-semibold text-primary cursor-pointer hover:underline"
            >
              Ganti Foto
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {/* Section 1: Informasi Dasar */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
               <div className="flex items-center gap-2 mb-2">
                 <User className="w-4 h-4 text-primary" />
                 <h2 className="font-['Lexend_Deca'] font-bold text-gray-900">Informasi Pribadi</h2>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Nama Lengkap <span className="text-red-500">*</span>
                 </label>
                 <input
                   type="text"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                   placeholder="Masukkan nama lengkap"
                   disabled={loading}
                 />
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Bio Singkat
                 </label>
                 <textarea
                   value={formData.bio}
                   onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                   rows={3}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                   placeholder="Ceritakan minat belajarmu atau tujuanmu..."
                   disabled={loading}
                 />
                 <p className="font-['Manrope'] text-xs text-gray-400 mt-2 text-right">
                   {formData.bio.length}/255 karakter
                 </p>
               </div>
            </div>

            {/* Section 2: Data Pendidikan */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
               <div className="flex items-center gap-2 mb-2">
                 <BookOpen className="w-4 h-4 text-emerald-500" />
                 <h2 className="font-['Lexend_Deca'] font-bold text-gray-900">Detail Akademik</h2>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Jenjang Pendidikan Terkini
                 </label>
                 <div className="relative">
                   <select
                     value={formData.jenjang_pendidikan}
                     onChange={(e) => setFormData({ ...formData, jenjang_pendidikan: e.target.value })}
                     className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                     disabled={loading}
                   >
                     <option value="SD">Sekolah Dasar (SD)</option>
                     <option value="SMP">Menengah Pertama (SMP)</option>
                     <option value="SMA">Menengah Atas (SMA/SMK)</option>
                     <option value="Kuliah">Perguruan Tinggi (Kuliah)</option>
                   </select>
                   <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      ▼
                   </div>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Asal Sekolah / Universitas
                 </label>
                 <input
                   type="text"
                   value={formData.school}
                   onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                   placeholder="Misal: SMAN 1 Jakarta"
                   disabled={loading}
                 />
               </div>
            </div>

            {/* Section 3: Kontak (Locked Email) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
               <div className="flex items-center gap-2 mb-2">
                 <Phone className="w-4 h-4 text-purple-500" />
                 <h2 className="font-['Lexend_Deca'] font-bold text-gray-900">Kontak</h2>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Alamat Email
                 </label>
                 <input
                   type="email"
                   value={user?.email || ''}
                   readOnly
                   className="w-full px-4 py-3.5 bg-gray-100/70 border border-transparent text-gray-500 rounded-2xl font-['Manrope'] text-[15px] cursor-not-allowed"
                 />
                 <p className="font-['Manrope'] text-xs text-gray-400 mt-2">
                   Email utama tidak dapat diubah dari panel ini.
                 </p>
               </div>

               <div>
                 <label className="block text-sm font-['Manrope'] font-bold text-gray-700 mb-2">
                   Nomor Handphone (Opsional)
                 </label>
                 <input
                   type="tel"
                   value={formData.phone}
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                   className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl font-['Manrope'] text-[15px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                   placeholder="Contoh: 0812xxxx"
                   disabled={loading}
                 />
               </div>
            </div>
          </div>

          {/* Fixed Action Button */}
          <div className="sticky bottom-6 mt-8 z-30">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-full font-['Lexend_Deca'] font-bold text-[15px] shadow-xl shadow-gray-200 hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                </>
              ) : (
                'Simpan Perubahan Profil'
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Source Selector Modal */}
      {showSourceSelector && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200" onClick={() => setShowSourceSelector(false)}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-['Lexend_Deca'] font-bold text-gray-900 text-lg">Ganti Foto Profil</h3>
              <button onClick={() => setShowSourceSelector(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-2 pb-6">
              <button 
                onClick={openCamera}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-['Manrope'] font-bold text-gray-900 leading-tight">Ambil dari Kamera</h4>
                  <p className="font-['Manrope'] text-sm text-gray-500">Foto langsung dari kamera perangkatmu</p>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  setShowSourceSelector(false);
                  fileInputRef.current?.click();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-['Manrope'] font-bold text-gray-900 leading-tight">Pilih dari Galeri / File</h4>
                  <p className="font-['Manrope'] text-sm text-gray-500">Pilih file foto dari perangkatmu</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Dialog (Compact) */}
      {showCameraDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] flex items-center justify-center p-5 animate-in fade-in duration-200">
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-md animate-in slide-in-from-bottom-4 duration-300">
            {/* Camera Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gray-800/50">
              <button onClick={closeCamera} className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-['Lexend_Deca'] font-bold text-white text-sm tracking-wide">Ambil Foto</span>
              <div className="w-9"></div>
            </div>

            {/* Viewfinder */}
            <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden">
              {cameraError ? (
                <div className="text-center p-6 space-y-3">
                  <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
                  <p className="font-['Manrope'] text-white/80 text-sm">{cameraError}</p>
                  <button onClick={closeCamera} className="mt-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-['Manrope'] font-semibold text-sm transition-colors">Kembali</button>
                </div>
              ) : (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
              )}
              {/* Circle Guide Overlay */}
              {!cameraError && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[75%] aspect-square rounded-full border-[3px] border-white/30" style={{ boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)' }}></div>
                </div>
              )}
            </div>

            {/* Capture Button */}
            {!cameraError && (
              <div className="flex justify-center py-6 bg-gray-800/50">
                <div 
                  onClick={capturePhoto} 
                  className="w-16 h-16 rounded-full border-4 border-white/40 flex items-center justify-center cursor-pointer active:scale-90 transition-transform hover:border-white/60"
                >
                  <div className="w-11 h-11 bg-white rounded-full hover:bg-gray-100 transition-colors"></div>
                </div>
              </div>
            )}

            <canvas ref={cameraCanvasRef} className="hidden" />
          </div>
        </div>
      )}

      {/* Crop & Zoom Editor Modal */}
      {showCropEditor && rawImageUrl && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-black/50">
            <button 
              onClick={handleCropCancel}
              className="flex items-center gap-2 text-white/80 hover:text-white font-['Manrope'] font-semibold text-sm transition-colors"
            >
              <X className="w-5 h-5" /> Batal
            </button>
            <h3 className="font-['Lexend_Deca'] font-bold text-white text-base">Sesuaikan Foto</h3>
            <button 
              onClick={handleCropConfirm}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-['Lexend_Deca'] font-bold text-sm transition-all hover:scale-105 shadow-lg"
            >
              <Check className="w-4 h-4" /> Gunakan
            </button>
          </div>

          {/* Crop Area */}
          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            {/* The image behind */}
            <div 
              className="relative flex items-center justify-center"
              style={{ width: '300px', height: '300px', overflow: 'hidden', touchAction: 'none' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onWheel={onWheel}
            >
              <img 
                ref={(el) => { cropImageRef.current = el; }}
                src={rawImageUrl} 
                alt="Crop preview"
                draggable={false}
                className="absolute select-none pointer-events-none"
                style={getCropImageStyle()}
                onLoad={() => {
                  // Force re-render after image loads so dimensions are available
                  setCropZoom(prev => prev);
                }}
              />
            </div>

            {/* Circular overlay mask */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(circle 150px at center, transparent 148px, rgba(0,0,0,0.75) 150px)`
            }}></div>
            
            {/* Circle border guide */}
            <div className="absolute pointer-events-none" style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.4)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
            }}></div>

            {/* Drag hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white/70 px-4 py-2 rounded-full font-['Manrope'] text-xs pointer-events-none">
              <Move className="w-3.5 h-3.5" /> Geser untuk mengatur posisi
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="px-6 pb-8 pt-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-4 max-w-sm mx-auto">
              <button 
                onClick={() => setCropZoom(prev => Math.max(1, prev - 0.2))}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.05"
                  value={cropZoom}
                  onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary
                    [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
                />
              </div>
              
              <button 
                onClick={() => setCropZoom(prev => Math.min(5, prev + 0.2))}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center mt-3">
              <button 
                onClick={() => { setCropZoom(1); setCropOffset({ x: 0, y: 0 }); }}
                className="flex items-center gap-1.5 text-white/50 hover:text-white/80 font-['Manrope'] text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          <canvas ref={cropCanvasRef} className="hidden" />
        </div>
      )}

    </MobileLayout>
  );
}
