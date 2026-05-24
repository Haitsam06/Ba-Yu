import { Link } from 'react-router';
import { BookOpen, Github, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#F8F9FF] dark:bg-[#0E0C17] border-t border-border dark:border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-[#7B68EE] bg-clip-text text-transparent">
                Ba-Yu
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              {t("footer.desc") || "Platform catatan belajar terstruktur untuk pelajar Indonesia"}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1C1A29] border border-border dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1C1A29] border border-border dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#1C1A29] border border-border dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 dark:text-gray-100">{t("footer.product") || "Produk"}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.explore_notes") || "Jelajahi Catatan"}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.dashboard") || "Dashboard"}
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.features") || "Fitur"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 dark:text-gray-100">{t("footer.resources") || "Sumber Daya"}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/settings/help" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.guide") || "Panduan"}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.blog") || "Blog"}
                </Link>
              </li>
              <li>
                <Link to="/settings/help" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.help") || "Bantuan"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 dark:text-gray-100">{t("footer.company") || "Perusahaan"}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.about_us") || "Tentang Kami"}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.careers") || "Karir"}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.contact") || "Kontak"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border dark:border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Ba-Yu (BelajarYuk). All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy") || "Kebijakan Privasi"}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms") || "Syarat & Ketentuan"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
