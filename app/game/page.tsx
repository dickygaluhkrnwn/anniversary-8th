import MemoryBoard from "../components/game/MemoryBoard";

export default function GamePage() {
  return (
    <main className="min-h-screen bg-lilac-50 py-12 px-4 flex flex-col items-center justify-center">
      
      {/* Header Halaman */}
      <div className="text-center mb-12 space-y-3">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-lilac-900">
          Memory Lane
        </h1>
        <p className="text-lilac-600 max-w-md mx-auto">
          Coba ingat-ingat lagi momen kita. Cocokkan 4 pasang foto ini untuk membuka pintu selanjutnya.
        </p>
      </div>

      {/* Komponen Game Board */}
      <MemoryBoard />
      
    </main>
  );
}