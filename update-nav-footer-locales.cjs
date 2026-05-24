const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources/frontend/app/locales');
const languages = ['en', 'id', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

const translations = {
    id: {
        navbar: {
            home: "Beranda",
            about: "Tentang",
            explore: "Jelajahi",
            login: "Masuk",
            register_free: "Daftar Gratis"
        },
        footer: {
            desc: "Platform catatan belajar terstruktur untuk pelajar Indonesia",
            product: "Produk",
            explore_notes: "Jelajahi Catatan",
            dashboard: "Dashboard",
            features: "Fitur",
            resources: "Sumber Daya",
            guide: "Panduan",
            blog: "Blog",
            help: "Bantuan",
            company: "Perusahaan",
            about_us: "Tentang Kami",
            careers: "Karir",
            contact: "Kontak",
            privacy: "Kebijakan Privasi",
            terms: "Syarat & Ketentuan"
        }
    },
    en: {
        navbar: {
            home: "Home",
            about: "About",
            explore: "Explore",
            login: "Log In",
            register_free: "Sign Up Free"
        },
        footer: {
            desc: "Structured study notes platform for students",
            product: "Product",
            explore_notes: "Explore Notes",
            dashboard: "Dashboard",
            features: "Features",
            resources: "Resources",
            guide: "Guide",
            blog: "Blog",
            help: "Help",
            company: "Company",
            about_us: "About Us",
            careers: "Careers",
            contact: "Contact",
            privacy: "Privacy Policy",
            terms: "Terms & Conditions"
        }
    },
    de: {
        navbar: {
            home: "Startseite",
            about: "Über uns",
            explore: "Entdecken",
            login: "Anmelden",
            register_free: "Kostenlos registrieren"
        },
        footer: {
            desc: "Strukturierte Studiennotiz-Plattform für Studenten",
            product: "Produkt",
            explore_notes: "Notizen entdecken",
            dashboard: "Dashboard",
            features: "Eigenschaften",
            resources: "Ressourcen",
            guide: "Handbuch",
            blog: "Blog",
            help: "Hilfe",
            company: "Unternehmen",
            about_us: "Über uns",
            careers: "Karriere",
            contact: "Kontakt",
            privacy: "Datenschutz",
            terms: "Nutzungsbedingungen"
        }
    },
    es: {
        navbar: {
            home: "Inicio",
            about: "Acerca de",
            explore: "Explorar",
            login: "Iniciar sesión",
            register_free: "Regístrate gratis"
        },
        footer: {
            desc: "Plataforma estructurada de notas de estudio para estudiantes",
            product: "Producto",
            explore_notes: "Explorar Notas",
            dashboard: "Panel",
            features: "Características",
            resources: "Recursos",
            guide: "Guía",
            blog: "Blog",
            help: "Ayuda",
            company: "Empresa",
            about_us: "Sobre Nosotros",
            careers: "Carreras",
            contact: "Contacto",
            privacy: "Privacidad",
            terms: "Términos"
        }
    },
    fr: {
        navbar: {
            home: "Accueil",
            about: "À propos",
            explore: "Explorer",
            login: "Connexion",
            register_free: "S'inscrire gratuitement"
        },
        footer: {
            desc: "Plateforme structurée de notes d'étude pour les étudiants",
            product: "Produit",
            explore_notes: "Explorer les Notes",
            dashboard: "Tableau de bord",
            features: "Fonctionnalités",
            resources: "Ressources",
            guide: "Guide",
            blog: "Blog",
            help: "Aide",
            company: "Entreprise",
            about_us: "À propos de nous",
            careers: "Carrières",
            contact: "Contact",
            privacy: "Confidentialité",
            terms: "Conditions"
        }
    },
    ja: {
        navbar: {
            home: "ホーム",
            about: "約",
            explore: "探索",
            login: "ログイン",
            register_free: "無料登録"
        },
        footer: {
            desc: "学生向けの構造化学習ノートプラットフォーム",
            product: "製品",
            explore_notes: "ノートを探索",
            dashboard: "ダッシュボード",
            features: "特徴",
            resources: "リソース",
            guide: "ガイド",
            blog: "ブログ",
            help: "ヘルプ",
            company: "会社",
            about_us: "私たちについて",
            careers: "キャリア",
            contact: "連絡先",
            privacy: "プライバシーポリシー",
            terms: "利用規約"
        }
    },
    ko: {
        navbar: {
            home: "홈",
            about: "정보",
            explore: "탐색",
            login: "로그인",
            register_free: "무료 가입"
        },
        footer: {
            desc: "학생들을 위한 구조화된 학습 노트 플랫폼",
            product: "제품",
            explore_notes: "노트 탐색",
            dashboard: "대시보드",
            features: "특징",
            resources: "자원",
            guide: "가이드",
            blog: "블로그",
            help: "도움말",
            company: "회사",
            about_us: "회사 소개",
            careers: "채용",
            contact: "연락처",
            privacy: "개인정보 보호",
            terms: "이용 약관"
        }
    },
    pt: {
        navbar: {
            home: "Início",
            about: "Sobre",
            explore: "Explorar",
            login: "Entrar",
            register_free: "Cadastre-se Grátis"
        },
        footer: {
            desc: "Plataforma estruturada de notas de estudo para estudantes",
            product: "Produto",
            explore_notes: "Explorar Notas",
            dashboard: "Painel",
            features: "Recursos",
            resources: "Recursos",
            guide: "Guia",
            blog: "Blog",
            help: "Ajuda",
            company: "Empresa",
            about_us: "Sobre Nós",
            careers: "Carreiras",
            contact: "Contato",
            privacy: "Privacidade",
            terms: "Termos"
        }
    },
    ru: {
        navbar: {
            home: "Главная",
            about: "О нас",
            explore: "Исследовать",
            login: "Войти",
            register_free: "Регистрация"
        },
        footer: {
            desc: "Структурированная платформа учебных заметок для студентов",
            product: "Продукт",
            explore_notes: "Исследовать заметки",
            dashboard: "Панель",
            features: "Функции",
            resources: "Ресурсы",
            guide: "Руководство",
            blog: "Блог",
            help: "Помощь",
            company: "Компания",
            about_us: "О нас",
            careers: "Карьера",
            contact: "Контакты",
            privacy: "Конфиденциальность",
            terms: "Условия"
        }
    },
    zh: {
        navbar: {
            home: "主页",
            about: "关于",
            explore: "探索",
            login: "登录",
            register_free: "免费注册"
        },
        footer: {
            desc: "面向学生的结构化学习笔记平台",
            product: "产品",
            explore_notes: "探索笔记",
            dashboard: "仪表板",
            features: "功能",
            resources: "资源",
            guide: "指南",
            blog: "博客",
            help: "帮助",
            company: "公司",
            about_us: "关于我们",
            careers: "职业",
            contact: "联系",
            privacy: "隐私",
            terms: "条款"
        }
    }
};

languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        content.navbar = translations[lang].navbar;
        content.footer = translations[lang].footer;
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
        console.log(`Updated ${lang}.json for navbar and footer`);
    }
});
