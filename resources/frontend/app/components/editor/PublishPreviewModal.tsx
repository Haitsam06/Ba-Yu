import React from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Trash2 } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { mataPelajaran } from '../../data/mockData';
import { jenjangOptions } from './editor.constants';

interface PublishPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (val: string) => void;
  content: string;
  previewDescription: string;
  setPreviewDescription: (val: string) => void;
  descriptionEdited: boolean;
  setDescriptionEdited: (val: boolean) => void;
  isCropping: boolean;
  setIsCropping: (val: boolean) => void;
  crop: { x: number; y: number };
  setCrop: (val: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (val: number) => void;
  setCroppedAreaPixels: (val: any) => void;
  handleApplyCrop: () => void;
  finalThumbnail: string | null;
  extractedThumbnail: string | null;
  setFinalThumbnail: (val: string | null) => void;
  thumbnailFit: 'cover' | 'contain';
  setThumbnailFit: (val: 'cover' | 'contain') => void;
  availableImages: string[];
  selectedImageIndex: number;
  handleSelectImage: (index: number) => void;
  meta: any;
  setMeta: (val: any) => void;
  tagInput: string;
  setTagInput: (val: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  mapelSearch: string;
  setMapelSearch: (val: string) => void;
  isMapelDropdownOpen: boolean;
  setIsMapelDropdownOpen: (val: boolean) => void;
  filteredMapel: any[];
  handleSubmit: () => void;
  handleSaveDraft: () => void;
  isSubmitting: boolean;
  isSavingDraft: boolean;
  canPublishFinal: boolean;
  mapelDropdownRef: React.RefObject<HTMLDivElement>;
}

export function PublishPreviewModal(props: PublishPreviewModalProps) {
  const {
    isOpen, onClose, title, setTitle, previewDescription, setPreviewDescription,
    setDescriptionEdited, isCropping, setIsCropping, crop, setCrop, zoom, setZoom,
    setCroppedAreaPixels, handleApplyCrop, finalThumbnail, extractedThumbnail,
    setFinalThumbnail, thumbnailFit, setThumbnailFit, availableImages,
    selectedImageIndex, handleSelectImage, meta, setMeta, tagInput, setTagInput,
    handleAddTag, handleRemoveTag, mapelSearch, setMapelSearch, isMapelDropdownOpen,
    setIsMapelDropdownOpen, filteredMapel, handleSubmit, handleSaveDraft,
    isSubmitting, isSavingDraft, canPublishFinal, mapelDropdownRef
  } = props;

  if (!isOpen) return null;

  const currentJenjang = jenjangOptions.find(j => j.id === meta.jenjang);
  const kelasOptions = currentJenjang?.kelas || [];
  const maxSemester = currentJenjang?.maxSemester || 2;

  return createPortal(
    <div className="fixed inset-0 bg-white dark:bg-[#13111C] z-[9999] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-['Lexend_Deca'] font-extrabold text-2xl md:text-3xl text-gray-900 dark:text-gray-100 tracking-tight">Preview</h1>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Side: Thumbnail Preview */}
          <div className="flex-1 max-w-xl">
            <div className={`w-full aspect-video bg-gray-50 dark:bg-[#1C1A29] rounded-2xl mb-4 flex flex-col items-center justify-center text-center p-8 border border-gray-200/50 dark:border-white/5 relative overflow-hidden group ${isCropping ? 'ring-4 ring-primary' : ''}`}>
              {isCropping && extractedThumbnail ? (
                <div className="absolute inset-0 z-20 bg-black">
                  <Cropper
                    image={extractedThumbnail}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                    onZoomChange={setZoom}
                  />
                  <div className="absolute bottom-4 right-4 z-30 flex gap-2">
                     <button onClick={() => setIsCropping(false)} className="px-3 py-1.5 bg-gray-900/50 text-white rounded text-xs font-bold hover:bg-gray-900/80 transition-colors">Batal</button>
                     <button onClick={handleApplyCrop} className="px-3 py-1.5 bg-primary text-white rounded text-xs font-bold shadow-md hover:bg-primary/90 transition-colors">Terapkan Crop</button>
                  </div>
                </div>
              ) : finalThumbnail || extractedThumbnail ? (
                <img src={finalThumbnail || extractedThumbnail!} alt="Thumbnail" className={`absolute inset-0 w-full h-full ${thumbnailFit === 'cover' ? 'object-cover' : 'object-contain'}`} />
              ) : (
                <>
                  <h4 className="font-['Manrope'] font-bold text-gray-600 mb-2">Include a high-quality image in your story to make it more inviting to readers.</h4>
                  <p className="text-xs text-gray-500 font-['Manrope'] font-medium">Gambar yang kamu tambahkan di dalam tulisan otomatis akan tampil di sini.</p>
                </>
              )}

              {!isCropping && extractedThumbnail && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <div className="bg-white/95 dark:bg-[#1C1A29]/95 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-1 flex gap-1">
                      <button onClick={() => { setFinalThumbnail(extractedThumbnail); setThumbnailFit('contain'); }} className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${thumbnailFit==='contain' && finalThumbnail === extractedThumbnail ? 'bg-gray-900 text-white':'text-gray-600 hover:bg-gray-100'}`}>Tampil Utuh</button>
                      <button onClick={() => setIsCropping(true)} className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-white dark:bg-[#252336] text-gray-950 dark:text-gray-200 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">Sesuaikan Ruang Crop</button>
                   </div>
                </div>
              )}
            </div>

            {/* Thumbnail Selector Carousel */}
            {!isCropping && availableImages.length > 1 && (
              <div className="mb-4 animate-in fade-in zoom-in-95 duration-300">
                <p className="text-[13px] font-['Lexend_Deca'] font-extrabold text-gray-900 dark:text-gray-100 mb-2.5">Pilih Sampul Khusus</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                   {availableImages.map((img, idx) => (
                       <button 
                         key={idx}
                         onClick={() => handleSelectImage(idx)}
                         className={`w-[88px] h-[52px] shrink-0 rounded-[10px] overflow-hidden border-2 transition-all duration-200 cursor-pointer ${selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/30 scale-[1.02] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
                         title={`Gambar ${idx+1}`}
                       >
                          <img src={img} alt={`Pilihan Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                       </button>
                   ))}
                </div>
              </div>
            )}

            <div className="space-y-4 font-['Manrope'] text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-white/5 pb-6 group">
              <div className="relative">
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ubah judul catatan..."
                  className="w-full font-['Lexend_Deca'] text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 border-b border-transparent hover:border-gray-300 dark:hover:border-white/10 focus:border-primary focus:outline-none bg-transparent transition-colors py-1"
                />
                <textarea 
                  value={previewDescription}
                  onChange={(e) => {
                     setPreviewDescription(e.target.value);
                     setDescriptionEdited(true);
                  }}
                  placeholder="Tulis subjudul/ringkasan singkat yang menarik..."
                  className="w-full text-sm leading-relaxed border-b border-transparent hover:border-gray-300 dark:hover:border-white/10 focus:border-primary focus:outline-none bg-transparent transition-colors resize-none overflow-hidden min-h-[60px] text-gray-700 dark:text-gray-300 placeholder:text-gray-500 font-bold"
                  rows={3}
                />
              </div>
            </div>
            <p className="text-[13px] text-gray-500 font-['Manrope'] font-bold mt-4">
              Note: Perubahan metadata di sini akan memengaruhi cara catatanmu ditemukan oleh pelajar lain di Ba-Yu.
            </p>
          </div>

          {/* Right Side: Meta Inputs */}
          <div className="w-full lg:w-[400px] shrink-0">
            
            {/* Mapel Row */}
            <div className="mb-8" ref={mapelDropdownRef}>
               <p className="font-['Lexend_Deca'] font-extrabold text-gray-900 dark:text-gray-100 text-[15px] mb-2">Kategori Mapel <span className="text-red-500">*</span></p>
               <p className="text-[13px] text-gray-600 font-['Manrope'] mb-3 font-bold">Pilih satu kategori utama yang paling sesuai.</p>
               
               <div className="relative">
                  <div 
                     className={`flex items-center w-full px-4 py-3 bg-gray-50 dark:bg-[#1C1A29] border ${isMapelDropdownOpen ? 'border-primary/50 bg-white dark:bg-[#252336]' : 'border-transparent hover:border-gray-200 dark:hover:border-white/10'} rounded-lg transition-all cursor-pointer`}
                     onClick={() => setIsMapelDropdownOpen(true)}
                  >
                     <input
                        type="text"
                        value={isMapelDropdownOpen ? mapelSearch : (meta.mataPelajaran || '')}
                        onChange={(e) => {
                           setMapelSearch(e.target.value);
                           setIsMapelDropdownOpen(true);
                        }}
                        placeholder="Cari kategori mapel..."
                        className="w-full bg-transparent border-none outline-none text-[14px] font-['Manrope'] text-gray-950 placeholder:text-gray-500 font-bold"
                     />
                     <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isMapelDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                  </div>

                  {isMapelDropdownOpen && (
                     <div className="absolute z-10 w-full mt-2 bg-white dark:bg-[#1C1A29] border border-gray-100 dark:border-white/5 rounded-xl shadow-lg dark:shadow-2xl max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
                        {filteredMapel.length > 0 ? (
                           (Object.entries(filteredMapel.reduce((acc, current) => {
                               const category = current.category || 'Lainnya';
                               if (!acc[category]) { acc[category] = []; }
                               acc[category].push(current);
                               return acc;
                           }, {} as Record<string, any[]>)) as [string, any[]][]).map(([category, items]) => (
                              <div key={category} className="pb-1 last:pb-0">
                                 <div className="sticky top-0 bg-white/95 dark:bg-[#1C1A29]/95 backdrop-blur-sm px-4 py-2 text-[11px] font-['Lexend_Deca'] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider z-10 border-b border-gray-100 dark:border-white/5">
                                    {category}
                                 </div>
                                 <div className="py-1">
                                    {items.map((m: any) => (
                                       <div
                                          key={m.id}
                                          onClick={() => {
                                             setMeta({ ...meta, mataPelajaran: m.name });
                                             setMapelSearch('');
                                             setIsMapelDropdownOpen(false);
                                          }}
                                          className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${meta.mataPelajaran === m.name ? 'bg-primary/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                       >
                                          <span className="text-lg">{m.icon}</span>
                                          <span className={`text-[14px] font-['Manrope'] ${meta.mataPelajaran === m.name ? 'font-bold text-primary' : 'font-medium text-gray-700'}`}>
                                             {m.name}
                                          </span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))
                        ) : (
                           <div className="px-4 py-4 text-center">
                              <p className="text-[13px] text-gray-600 font-['Manrope'] font-bold">Kategori tidak ditemukan.</p>
                              <p className="text-[12px] text-gray-500 font-['Manrope'] mt-1 font-medium">Silakan pilih kategori yang terdekat, lalu tambahkan detailnya di bagian Tags.</p>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>

            {/* Pendidikan & Kelas Row */}
            <div className="mb-8">
               <p className="font-['Lexend_Deca'] font-extrabold text-gray-900 dark:text-gray-100 text-[15px] mb-2">Tingkat Pendidikan</p>
               <p className="text-[13px] text-gray-600 font-['Manrope'] mb-3 font-bold">Tentukan audiens kelas sasaran catatan ini.</p>
               
               <div className="flex gap-2 flex-wrap mb-3">
                {jenjangOptions.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => setMeta({ ...meta, jenjang: j.id, kelas: j.kelas[0], semester: 1 })}
                    className={`px-3 py-1 rounded-full text-[12px] font-['Lexend_Deca'] font-black border transition-all duration-200 ${
                      meta.jenjang === j.id
                        ? 'bg-gray-900 dark:bg-primary text-white border-gray-900 dark:border-primary shadow-md shadow-gray-900/10 dark:shadow-none'
                        : 'bg-white dark:bg-[#1C1A29] text-gray-600 dark:text-gray-400 border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {j.label}
                  </button>
                ))}
               </div>

               <div className="flex gap-3">
                  <div className="flex-1 relative">
                      <div 
                         className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-[#1C1A29] border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-lg transition-all cursor-pointer"
                         onClick={(e) => {
                             e.stopPropagation();
                             const currentStatus = document.getElementById('kelas-dropdown')?.classList.contains('hidden');
                             document.getElementById('kelas-dropdown')?.classList.toggle('hidden', !currentStatus);
                             document.getElementById('semester-dropdown')?.classList.add('hidden');
                         }}
                      >
                         <span className="text-[14px] font-['Manrope'] text-gray-950 dark:text-gray-100 font-bold">
                             {meta.kelas ? (meta.jenjang === 'Kuliah' ? meta.kelas : `Kelas ${meta.kelas}`) : 'Pilih Kelas'}
                         </span>
                         <ChevronDown className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                      </div>
                      
                      {/* Kelas Dropdown List */}
                      <div id="kelas-dropdown" className="hidden absolute z-20 w-full mt-2 bg-white dark:bg-[#1C1A29] border border-gray-100 dark:border-white/5 rounded-xl shadow-lg dark:shadow-2xl max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
                          <div className="py-1">
                              {kelasOptions.map((k: string) => (
                                 <div
                                    key={k}
                                    onClick={() => {
                                        setMeta({ ...meta, kelas: k });
                                        document.getElementById('kelas-dropdown')?.classList.add('hidden');
                                    }}
                                    className={`px-4 py-2.5 cursor-pointer transition-colors ${meta.kelas === k ? 'bg-primary/5 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium'} text-[14px] font-['Manrope']`}
                                 >
                                     {meta.jenjang === 'Kuliah' ? k : `Kelas ${k}`}
                                 </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="flex-1 relative">
                      <div 
                         className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-[#1C1A29] border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-lg transition-all cursor-pointer"
                         onClick={(e) => {
                             e.stopPropagation();
                             const currentStatus = document.getElementById('semester-dropdown')?.classList.contains('hidden');
                             document.getElementById('semester-dropdown')?.classList.toggle('hidden', !currentStatus);
                             document.getElementById('kelas-dropdown')?.classList.add('hidden');
                         }}
                      >
                         <span className="text-[14px] font-['Manrope'] text-gray-950 dark:text-gray-100 font-bold">
                             {meta.semester ? `Semester ${meta.semester}` : 'Pilih Semester'}
                         </span>
                         <ChevronDown className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                      </div>

                      {/* Semester Dropdown List */}
                      <div id="semester-dropdown" className="hidden absolute z-20 w-full mt-2 bg-white dark:bg-[#1C1A29] border border-gray-100 dark:border-white/5 rounded-xl shadow-lg dark:shadow-2xl max-h-60 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
                          <div className="py-1">
                              {Array.from({ length: maxSemester }, (_, i) => i + 1).map((s) => (
                                 <div
                                    key={s}
                                    onClick={() => {
                                        setMeta({ ...meta, semester: s });
                                        document.getElementById('semester-dropdown')?.classList.add('hidden');
                                    }}
                                    className={`px-4 py-2.5 cursor-pointer transition-colors ${meta.semester === s ? 'bg-primary/5 text-primary font-bold' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium'} text-[14px] font-['Manrope']`}
                                 >
                                     Semester {s}
                                 </div>
                              ))}
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            {/* Tags Row */}
            <div className="mb-10">
              <p className="font-['Lexend_Deca'] font-extrabold text-gray-900 dark:text-gray-100 text-[15px] mb-2">Tags / Keywords</p>
              <p className="text-[13px] text-gray-600 font-['Manrope'] mb-3 font-bold">Tambahkan hingga 5 kata kunci agar mudah dicari.</p>
              
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
                placeholder="Add a topic (press Enter)..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1C1A29] border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-lg text-[14px] font-['Manrope'] focus:outline-none focus:bg-white dark:focus:bg-[#252336] focus:border-primary/50 transition-all mb-3 text-gray-950 dark:text-gray-100 placeholder:text-gray-500 font-bold"
              />
              
              <div className="flex flex-wrap gap-2">
                 {meta.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-[12px] font-['Manrope'] font-bold shrink-0">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                      <X className="w-3.5 h-3.5" strokeWidth={3} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Publish Area */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
               <button
                  onClick={handleSubmit}
                  disabled={!canPublishFinal || isSubmitting}
                  className="bg-primary text-white px-7 py-2 rounded-full text-[14px] font-['Manrope'] font-bold disabled:opacity-40 hover:bg-primary/90 transition-colors cursor-pointer"
               >
                  {isSubmitting ? 'Publishing...' : 'Publish now'}
               </button>
               <button
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft || isSubmitting}
                  className="text-[14px] font-['Manrope'] text-gray-600 font-bold hover:text-gray-950 transition-colors disabled:opacity-50"
                >
                  {isSavingDraft ? 'Menyimpan...' : 'Simpan draf'}
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
