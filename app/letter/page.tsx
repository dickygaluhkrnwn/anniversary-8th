import LoveLetter from "../components/letter/LoveLetter";
// Hapus import MusicPlayer

export default function LetterPage() {
  return (
    <main className="min-h-screen bg-lilac-50 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full blur-[100px] opacity-30 animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-lilac-300 rounded-full blur-[100px] opacity-30 animate-blob animation-delay-2000" />
      </div>

      {/* Komponen Utama */}
      <div className="z-10 w-full flex justify-center">
        <LoveLetter />
      </div>

      {/* Floating Music Player dihapus dari sini */}
      
    </main>
  );
}