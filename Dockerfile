# =============================================================================
# Ba-Yu Production Dockerfile
# Stack: Laravel 11 + MongoDB + Vite (React SPA) + Sanctum
# Target: Render free tier (also works for Railway, Fly.io, etc.)
# =============================================================================

FROM php:8.3-cli

# Step 1: Install system tools & libraries needed by PHP extensions and build tools.
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Step 2: Install Node.js 22 LTS (required for `npm run build` — Vite + TypeScript).
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Step 3: Install standard PHP extensions used by Laravel.
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Step 4: Install MongoDB driver via PECL (this is the critical one).
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Step 5: Install Composer (PHP package manager).
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Step 6: Set working directory inside the container.
WORKDIR /var/www/html

# Step 7: Copy composer manifests first to leverage Docker layer caching.
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

# Step 8: Copy npm manifests for the same caching reason.
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Step 9: Copy the rest of the project source.
COPY . .

# Step 10: Build the frontend (Vite produces public/build/).
RUN npm run build

# Step 11: Finalize composer autoload with the full source present.
RUN composer dump-autoload --optimize --no-interaction

# Step 12: Make storage and cache directories writable.
RUN chmod -R 775 storage bootstrap/cache

# Step 13: Render injects PORT via env var. Default to 8000 for local runs.
ENV PORT=8000
EXPOSE 8000

# Step 14: Start command — clear cached config (in case anything was baked in), then serve.
CMD php artisan config:clear \
    && php artisan serve --host=0.0.0.0 --port=${PORT}
