#!/bin/bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║              Ba-Yu — Update & Redeploy Script                              ║
# ║                                                                            ║
# ║  Jalankan script ini setiap kali ada perubahan kode di GitHub.             ║
# ║  Usage: sudo bash /var/www/bayu/deploy/update.sh                           ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="/var/www/bayu"

log() { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${CYAN}[i]${NC} $1"; }

echo ""
echo -e "${CYAN}═══ Ba-Yu: Updating & Redeploying... ═══${NC}"
echo ""

cd "$APP_DIR"

# 1. Pull perubahan terbaru dari GitHub
info "Menarik perubahan terbaru dari GitHub..."
git pull origin main
log "Git pull selesai"

# 2. Install dependency PHP baru (jika ada)
info "Mengupdate dependencies PHP..."
composer install --no-dev --optimize-autoloader --no-interaction
log "Composer selesai"

# 3. Install dependency Node.js baru (jika ada)
info "Mengupdate dependencies Node.js..."
npm ci --production=false
log "npm selesai"

# 4. Build ulang frontend
info "Mem-build ulang frontend..."
npm run build
log "Build selesai"

# 5. Jalankan migration (jika ada) — MongoDB tidak butuh migration tapi jaga-jaga
php artisan migrate --force 2>/dev/null || true

# 6. Clear & rebuild Laravel cache
info "Mengoptimasi Laravel cache..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
log "Cache berhasil di-rebuild"

# 7. Fix permission
chown -R www-data:www-data "$APP_DIR"
chmod -R 775 "$APP_DIR/storage" "$APP_DIR/bootstrap/cache"

# 8. Restart PHP-FPM agar kode baru dimuat
systemctl restart php8.2-fpm
log "PHP-FPM di-restart"

echo ""
echo -e "${GREEN}═══ ✅ Update selesai! Ba-Yu sudah live dengan versi terbaru. ═══${NC}"
echo ""
