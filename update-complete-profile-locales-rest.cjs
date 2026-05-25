const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'resources', 'frontend', 'app', 'locales');
const locales = ['es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh'];

const newData = {
    es: {
        complete_profile: {
            title: "Completa tu perfil",
            subtitle: "Un paso más para comenzar a compartir tus notas de estudio.",
            full_name_label: "Nombre completo",
            username_label: "Nombre de usuario",
            username_hint: "(Sin espacios)",
            education_label: "Nivel de educación",
            profession_label: "Profesión / Rol",
            school_label: "Institución / Escuela",
            school_placeholder: "Ejemplo: Universidad de Madrid",
            submit_button: "Guardar y continuar",
            submitting: "Guardando...",
            username_error: "El nombre de usuario solo puede contener letras, números y guiones bajos (_)",
            success_msg: "¡Perfil completado con éxito! Bienvenido a Ba-Yu",
            error_msg: "Ocurrió un error al guardar el perfil"
        }
    },
    fr: {
        complete_profile: {
            title: "Complétez votre profil",
            subtitle: "Encore une étape pour commencer à partager vos notes d'étude.",
            full_name_label: "Nom complet",
            username_label: "Nom d'utilisateur",
            username_hint: "(Sans espaces)",
            education_label: "Niveau d'études",
            profession_label: "Profession / Rôle",
            school_label: "Institution / École",
            school_placeholder: "Exemple : Université de Paris",
            submit_button: "Enregistrer et continuer",
            submitting: "Enregistrement...",
            username_error: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des traits de soulignement (_)",
            success_msg: "Profil complété avec succès ! Bienvenue sur Ba-Yu",
            error_msg: "Une erreur est survenue lors de l'enregistrement du profil"
        }
    },
    ja: {
        complete_profile: {
            title: "プロフィールを完成させる",
            subtitle: "学習ノートを共有し始めるまであと一歩です。",
            full_name_label: "氏名",
            username_label: "ユーザーネーム",
            username_hint: "(スペースなし)",
            education_label: "教育レベル",
            profession_label: "職業 / 役割",
            school_label: "機関 / 学校",
            school_placeholder: "例：東京大学",
            submit_button: "保存して続行",
            submitting: "保存中...",
            username_error: "ユーザーネームには文字、数字、アンダースコア (_) のみを使用できます",
            success_msg: "プロフィールが正常に完成しました！Ba-Yuへようこそ",
            error_msg: "プロフィールの保存中にエラーが発生しました"
        }
    },
    ko: {
        complete_profile: {
            title: "프로필 완성하기",
            subtitle: "학습 노트를 공유하기까지 한 단계 남았습니다.",
            full_name_label: "성명",
            username_label: "사용자 이름",
            username_hint: "(공백 없음)",
            education_label: "학력",
            profession_label: "직업 / 역할",
            school_label: "기관 / 학교",
            school_placeholder: "예: 서울대학교",
            submit_button: "저장 및 계속",
            submitting: "저장 중...",
            username_error: "사용자 이름에는 문자, 숫자 및 밑줄(_)만 포함될 수 있습니다.",
            success_msg: "프로필이 성공적으로 완성되었습니다! Ba-Yu에 오신 것을 환영합니다",
            error_msg: "프로필을 저장하는 동안 오류가 발생했습니다"
        }
    },
    pt: {
        complete_profile: {
            title: "Complete seu perfil",
            subtitle: "Mais um passo para começar a compartilhar suas notas de estudo.",
            full_name_label: "Nome Completo",
            username_label: "Nome de usuário",
            username_hint: "(Sem espaços)",
            education_label: "Nível de Educação",
            profession_label: "Profissão / Função",
            school_label: "Instituição / Escola",
            school_placeholder: "Exemplo: Universidade de São Paulo",
            submit_button: "Salvar e Continuar",
            submitting: "Salvando...",
            username_error: "O nome de usuário pode conter apenas letras, números e sublinhados (_)",
            success_msg: "Perfil completado com sucesso! Bem-vindo ao Ba-Yu",
            error_msg: "Ocorreu um erro ao salvar o perfil"
        }
    },
    ru: {
        complete_profile: {
            title: "Заполните свой профиль",
            subtitle: "Еще один шаг, чтобы начать делиться своими учебными конспектами.",
            full_name_label: "Полное имя",
            username_label: "Имя пользователя",
            username_hint: "(Без пробелов)",
            education_label: "Уровень образования",
            profession_label: "Профессия / Роль",
            school_label: "Учреждение / Школа",
            school_placeholder: "Пример: МГУ",
            submit_button: "Сохранить и продолжить",
            submitting: "Сохранение...",
            username_error: "Имя пользователя может содержать только буквы, цифры и подчеркивания (_)",
            success_msg: "Профиль успешно заполнен! Добро пожаловать в Ba-Yu",
            error_msg: "Произошла ошибка при сохранении профиля"
        }
    },
    zh: {
        complete_profile: {
            title: "完善您的个人资料",
            subtitle: "距离分享您的学习笔记仅差一步之遥。",
            full_name_label: "全名",
            username_label: "用户名",
            username_hint: "(无空格)",
            education_label: "教育程度",
            profession_label: "职业 / 角色",
            school_label: "机构 / 学校",
            school_placeholder: "例如：北京大学",
            submit_button: "保存并继续",
            submitting: "保存中...",
            username_error: "用户名只能包含字母、数字和下划线 (_)",
            success_msg: "个人资料已成功完善！欢迎来到 Ba-Yu",
            error_msg: "保存个人资料时发生错误"
        }
    }
};

for (const lang of locales) {
    const filePath = path.join(localesPath, `${lang}.json`);
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let json = JSON.parse(fileContent);
        
        json.complete_profile = newData[lang].complete_profile;
        
        fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf8');
        console.log(`Updated ${lang}.json`);
    }
}
