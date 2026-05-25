const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = {
  id: {
    welcome: "Selamat Datang",
    welcome_desc: "Masuk untuk melanjutkan ke Ba-Yu.",
    start_journey: "Mulai Perjalananmu",
    start_journey_desc: "Daftar dan bagikan catatan pertamamu.",
    login_tab: "Masuk",
    register_tab: "Daftar Baru",
    login_btn: "Masuk ke Akun",
    register_btn: "Daftar Sekarang",
    processing: "Memproses...",
    or_continue: "atau lanjutkan dengan",
    remember_me: "Ingat saya"
  },
  en: {
    welcome: "Welcome Back",
    welcome_desc: "Sign in to continue to Ba-Yu.",
    start_journey: "Start Your Journey",
    start_journey_desc: "Register and share your first note.",
    login_tab: "Login",
    register_tab: "Sign Up",
    login_btn: "Login to Account",
    register_btn: "Register Now",
    processing: "Processing...",
    or_continue: "or continue with",
    remember_me: "Remember me"
  },
  ko: {
    welcome: "환영합니다",
    welcome_desc: "Ba-Yu에 계속하려면 로그인하세요.",
    start_journey: "여정을 시작하세요",
    start_journey_desc: "가입하고 첫 노트를 공유하세요.",
    login_tab: "로그인",
    register_tab: "새 계정 만들기",
    login_btn: "계정 로그인",
    register_btn: "지금 가입하기",
    processing: "처리 중...",
    or_continue: "또는 다음으로 계속",
    remember_me: "나를 기억해"
  },
  ja: {
    welcome: "ようこそ",
    welcome_desc: "ログインしてBa-Yuを続けてください。",
    start_journey: "旅を始めよう",
    start_journey_desc: "登録して最初のノートを共有しましょう。",
    login_tab: "ログイン",
    register_tab: "新規登録",
    login_btn: "アカウントにログイン",
    register_btn: "今すぐ登録",
    processing: "処理中...",
    or_continue: "または次で続ける",
    remember_me: "ログイン状態を保持"
  },
  zh: {
    welcome: "欢迎回来",
    welcome_desc: "登录以继续访问Ba-Yu。",
    start_journey: "开启您的旅程",
    start_journey_desc: "注册并分享您的第一篇笔记。",
    login_tab: "登录",
    register_tab: "注册新账号",
    login_btn: "登录账号",
    register_btn: "立即注册",
    processing: "处理中...",
    or_continue: "或继续使用",
    remember_me: "记住我"
  },
  de: {
    welcome: "Willkommen",
    welcome_desc: "Melden Sie sich an, um zu Ba-Yu fortzufahren.",
    start_journey: "Beginnen Sie Ihre Reise",
    start_journey_desc: "Registrieren Sie sich und teilen Sie Ihre erste Notiz.",
    login_tab: "Anmelden",
    register_tab: "Neues Konto",
    login_btn: "Beim Konto anmelden",
    register_btn: "Jetzt registrieren",
    processing: "Wird bearbeitet...",
    or_continue: "oder weiter mit",
    remember_me: "Erinnere dich an mich"
  },
  fr: {
    welcome: "Bienvenue",
    welcome_desc: "Connectez-vous pour continuer vers Ba-Yu.",
    start_journey: "Commencez votre voyage",
    start_journey_desc: "Inscrivez-vous et partagez votre première note.",
    login_tab: "Connexion",
    register_tab: "Nouveau compte",
    login_btn: "Se connecter",
    register_btn: "S'inscrire maintenant",
    processing: "Traitement...",
    or_continue: "ou continuer avec",
    remember_me: "Se souvenir de moi"
  },
  es: {
    welcome: "Bienvenido",
    welcome_desc: "Inicie sesión para continuar en Ba-Yu.",
    start_journey: "Comience su viaje",
    start_journey_desc: "Regístrate y comparte tu primera nota.",
    login_tab: "Acceso",
    register_tab: "Nueva cuenta",
    login_btn: "Iniciar sesión",
    register_btn: "Regístrate ahora",
    processing: "Procesando...",
    or_continue: "o continuar con",
    remember_me: "Recuérdame"
  },
  pt: {
    welcome: "Bem-vindo",
    welcome_desc: "Faça login para continuar no Ba-Yu.",
    start_journey: "Comece sua jornada",
    start_journey_desc: "Registre-se e compartilhe sua primeira nota.",
    login_tab: "Entrar",
    register_tab: "Nova conta",
    login_btn: "Entrar na conta",
    register_btn: "Registre-se agora",
    processing: "Processando...",
    or_continue: "ou continuar com",
    remember_me: "Lembre-me"
  },
  ru: {
    welcome: "Добро пожаловать",
    welcome_desc: "Войдите, чтобы продолжить работу с Ba-Yu.",
    start_journey: "Начните свое путешествие",
    start_journey_desc: "Зарегистрируйтесь и поделитесь своей первой заметкой.",
    login_tab: "Войти",
    register_tab: "Новый аккаунт",
    login_btn: "Войти в аккаунт",
    register_btn: "Зарегистрироваться сейчас",
    processing: "Обработка...",
    or_continue: "или продолжить с",
    remember_me: "Запомнить меня"
  }
};

Object.entries(locales).forEach(([lang, texts]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.auth) {
      data.auth = {};
    }
    
    // Merge new texts into auth
    Object.assign(data.auth, texts);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated auth locales in ${lang}.json`);
  }
});
