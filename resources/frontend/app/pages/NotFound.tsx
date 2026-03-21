import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Halaman tidak ditemukan</p>
        <Link
          to="/home"
          className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold"
        >
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
