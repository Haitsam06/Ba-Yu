#!/bin/bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║              Ba-Yu — Oracle Cloud Server Setup Script                       ║
# ║                                                                            ║
# ║  Jalankan script ini di server Ubuntu 22.04 (ARM64) Oracle Cloud.          ║
# ║  Script ini akan menginstall semua yang dibutuhkan Ba-Yu.                  ║
# ║                                                                            ║
# ║  Usage: sudo bash setup-server.sh                                          ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

set -e  # Berhenti jika ada error

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

log() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
info() { echo -e "${CYAN}[i]${NC} $1"; }
err() { echo -e "${RED}[✗]${NC} $1"; }

# ── Pastikan dijalankan sebagai root ──────────────────────────────────────────
if [ "$EUID" -ne 0 ]; then
    err "Script ini harus dijalankan sebagai root (gunakan sudo)"
    exit 1
fi

echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║          Ba-Yu Server Setup — Oracle Cloud                  ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ── 1. Update System ─────────────────────────────────────────────────────────
info "Mengupdate sistem..."
apt update -y && apt upgrade -y
log "Sistem berhasil diupdate"

# ── 2. Install Dependencies Dasar ────────────────────────────────────────────
info "Menginstall dependencies dasar..."
apt install -y software-properties-common curl wget git unzip zip acl

# ── 3. Install PHP 8.2 + Extensions ─────────────────────────────────────────
info "Menambahkan repository PHP (ondrej/php)..."
add-apt-repository ppa:ondrej/php -y
apt update -y

info "Menginstall PHP 8.2 dan extension yang dibutuhkan..."
apt install -y \
    php8.2-fpm \
    php8.2-cli \
    php8.2-common \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-zip \
    php8.2-bcmath \
    php8.2-gd \
    php8.2-intl \
    php8.2-readline \
    php8.2-tokenizer \
    php8.2-fileinfo \
    php8.2-dev

log "PHP 8.2 berhasil diinstall"

# ── 4. Install MongoDB PHP Extension ────────────────────────────────────────
info "Menginstall MongoDB PHP extension..."
apt install -y php-pear pkg-config libssl-dev
pecl install mongodb
echo "extension=mongodb.so" > /etc/php/8.2/mods-available/mongodb.ini
phpenmod mongodb
log "MongoDB PHP extension berhasil diinstall"

# ── 5. Install Composer ─────────────────────────────────────────────────────
info "Menginstall Composer..."
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
log "Composer berhasil diinstall: $(composer --version 2>/dev/null | head -1)"

# ── 6. Install Node.js 20 LTS ───────────────────────────────────────────────
info "Menginstall Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
log "Node.js berhasil diinstall: $(node --version)"
log "npm berhasil diinstall: $(npm --version)"

# ── 7. Install Nginx ────────────────────────────────────────────────────────
info "Menginstall Nginx..."
apt install -y nginx
systemctl enable nginx
systemctl start nginx
log "Nginx berhasil diinstall dan berjalan"

# ── 8. Install Certbot (SSL) ────────────────────────────────────────────────
info "Menginstall Certbot untuk SSL..."
apt install -y certbot python3-certbot-nginx
log "Certbot berhasil diinstall"

# ── 9. Setup Firewall (iptables) ────────────────────────────────────────────
info "Mengkonfigurasi firewall..."
# Oracle Cloud Ubuntu menggunakan iptables, buka port 80 dan 443
iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
netfilter-persistent save 2>/dev/null || iptables-save > /etc/iptables/rules.v4 2>/dev/null || true
log "Firewall: Port 80 (HTTP) dan 443 (HTTPS) dibuka"

# ── 10. Clone Repository ────────────────────────────────────────────────────
APP_DIR="/var/www/bayu"

if [ -d "$APP_DIR" ]; then
    warn "Direktori $APP_DIR sudah ada, melakukan git pull..."
    cd "$APP_DIR" && git pull
else
    info "Meng-clone repository Ba-Yu..."
    git clone https://github.com/Haitsam06/Ba-Yu.git "$APP_DIR"
fi
log "Repository Ba-Yu tersedia di $APP_DIR"

# ── 11. Install Dependencies Laravel ─────────────────────────────────────────
info "Menginstall dependencies PHP (Composer)..."
cd "$APP_DIR"
composer install --no-dev --optimize-autoloader --no-interaction

info "Menginstall dependencies Node.js (npm)..."
npm ci --production=false

info "Mem-build aset frontend (Vite + React)..."
npm run build
log "Frontend berhasil di-build"

# ── 12. Setup Laravel ────────────────────────────────────────────────────────
info "Menyiapkan environment Laravel..."

# Buat .env dari example jika belum ada
if [ ! -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env.example" "$APP_DIR/.env"
    warn ".env dibuat dari .env.example — KAMU HARUS EDIT FILE INI!"
fi

# Generate APP_KEY jika belum ada
php artisan key:generate --force

# Buat symlink storage
php artisan storage:link 2>/dev/null || true

# ── 13. Set Permissions ──────────────────────────────────────────────────────
info "Mengatur permission folder..."
chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"
chmod -R 775 "$APP_DIR/storage" "$APP_DIR/bootstrap/cache"
log "Permission berhasil diatur"

# ── 14. Setup Nginx Config ───────────────────────────────────────────────────
info "Mengkonfigurasi Nginx..."
cp "$APP_DIR/deploy/nginx-bayu.conf" /etc/nginx/sites-available/bayu.conf
ln -sf /etc/nginx/sites-available/bayu.conf /etc/nginx/sites-enabled/bayu.conf
rm -f /etc/nginx/sites-enabled/default

# Test konfigurasi Nginx
nginx -t
systemctl reload nginx
log "Nginx berhasil dikonfigurasi dan di-reload"

# ── 15. Restart PHP-FPM ─────────────────────────────────────────────────────
systemctl restart php8.2-fpm
log "PHP-FPM berhasil di-restart"

# ── 16. Optimize Laravel untuk Production ────────────────────────────────────
info "Mengoptimasi Laravel untuk production..."
cd "$APP_DIR"
php artisan config:cache
php artisan route:cache
php artisan view:cache
log "Laravel production cache berhasil dibuat"

# ── Selesai! ─────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          ✅ Setup Selesai! Ba-Yu Siap Digunakan!            ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}LANGKAH SELANJUTNYA:${NC}"
echo -e "  1. Edit file .env production:"
echo -e "     ${CYAN}sudo nano /var/www/bayu/.env${NC}"
echo -e ""
echo -e "  2. Yang WAJIB diubah di .env:"
echo -e "     - APP_ENV=production"
echo -e "     - APP_DEBUG=false"
echo -e "     - APP_URL=https://domain-kamu.my.id"
echo -e "     - MONGODB_URI=mongodb+srv://..."
echo -e "     - CLOUDINARY_URL=cloudinary://..."
echo -e "     - MAIL_PASSWORD=<app password gmail>"
echo -e "     - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET"
echo -e "     - GOOGLE_REDIRECT_URI=https://domain-kamu.my.id/api/auth/google/callback"
echo -e "     - FIREBASE_CREDENTIALS=storage/app/firebase-credentials.json"
echo -e ""
echo -e "  3. Upload file firebase-credentials.json:"
echo -e "     ${CYAN}scp firebase-credentials.json ubuntu@<IP>:/var/www/bayu/storage/app/${NC}"
echo -e ""
echo -e "  4. Setelah edit .env, rebuild cache:"
echo -e "     ${CYAN}cd /var/www/bayu && sudo php artisan config:cache${NC}"
echo -e ""
echo -e "  5. Setup SSL (jika sudah punya domain):"
echo -e "     ${CYAN}sudo certbot --nginx -d domain-kamu.my.id${NC}"
echo ""
