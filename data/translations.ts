import { UIContent, Language } from '../types';

export const UI_TRANSLATIONS: Record<Language, UIContent> = {
  fr: {
    title: "LinkedIn",
    subtitle: "Structurez vos posts LinkedIn pour plus de lisibilité et d’engagement.",
    templates_title: "MODÈLES",
    hooks_title: "ACCROCHES",
    cta_title: "APPEL À L'ACTION",
    templates_labels: {
      story: "📖 Storytelling",
      educational: "🎓 Éducatif",
      feedback: "💬 Retour d'expérience"
    },
    // NOUVEAU : Traductions des groupes d'emojis
    emoji_groups: {
      structure: "Structure",
      attention: "Attention",
      positive: "Positif",
      signals: "Signaux",
      business: "Business",
      numbers: "Chiffres"
    },
    toolbar_bold: "Mettre en gras",
    toolbar_more: "Plus d'icônes",
    toolbar_hide: "Masquer",
    placeholder: `Bienvenue dans l'éditeur !

Commencez à rédiger votre post ici ou choisissez un modèle sur la gauche pour démarrer rapidement.

✍️ Fonctionnalités clés :
• Mettez en valeur : Sélectionnez du texte et cliquez sur "B" pour le gras.
• Ajoutez des emojis : Ouvrez le menu "Plus d'icônes" en haut à droite.
• Prévisualisez : Vérifiez le rendu mobile instantanément sur la droite.

Votre texte est 100% privé et reste dans votre navigateur.`,
    stats_chars: "car.",
    stats_read_time: "sec de lecture",
    btn_copy: "Copier le texte",
    btn_copied: "Copié",
    preview_title: "APERÇU MOBILE",
    preview_user: "Votre Nom",
    preview_headline: "Titre • Entreprise",
    preview_time: "1 sem",
    preview_placeholder: "L'aperçu de votre post apparaîtra ici... Commencez à écrire pour voir le résultat.",
    preview_read_more: "plus",
    preview_read_less: "Réduire",
    preview_likes: "J'aime",
    preview_comments: "commentaires",
    preview_reposts: "republications",
    preview_action_like: "J'aime",
    preview_action_comment: "Commenter",
    preview_action_repost: "Republier",
    preview_action_send: "Envoyer",
    legal_links: {
      mentions: "Mentions Légales",
      privacy: "Politique de Confidentialité",
      cgu: "CGU"
    },
    meta: {
      title: "LinkedIn Formatter - Mettez en forme vos posts",
      description: "Outil gratuit pour formater vos posts LinkedIn : gras, italique, emojis et structure."
    }
  },
  ka: { // Georgian
    title: "LinkedIn",
    subtitle: "დააფორმატეთ თქვენი LinkedIn პოსტები უკეთესი ჩართულობისთვის.",
    templates_title: "შაბლონები",
    hooks_title: "სათაურები",
    cta_title: "მოწოდება",
    templates_labels: {
      story: "📖 ისტორია",
      educational: "🎓 საგანმანათლებლო",
      feedback: "💬 გამოხმაურება"
    },
    emoji_groups: {
      structure: "სტრუქტურა",
      attention: "ყურადღება",
      positive: "დადებითი",
      signals: "ნიშნები",
      business: "ბიზნესი",
      numbers: "ციფრები"
    },
    toolbar_bold: "გამუქება",
    toolbar_more: "მეტი",
    toolbar_hide: "დამალვა",
    placeholder: `დაიწყეთ წერა აქ...

გამოიყენეთ მარცხენა მენიუ შაბლონებისთვის.
მონიშნეთ ტექსტი და დააჭირეთ "B"-ს გასამუქებლად.`,
    stats_chars: "სიმბ.",
    stats_read_time: "წამი",
    btn_copy: "კოპირება",
    btn_copied: "კოპირებულია",
    preview_title: "მობილური ხედი",
    preview_user: "თქვენი სახელი",
    preview_headline: "პოზიცია • კომპანია",
    preview_time: "1 კვირა",
    preview_placeholder: "თქვენი პოსტის ესკიზი გამოჩნდება აქ...",
    preview_read_more: "მეტის ნახვა",
    preview_read_less: "შეკვეცა",
    preview_likes: "მოწონება",
    preview_comments: "კომენტარი",
    preview_reposts: "გაზიარება",
    preview_action_like: "მოწონება",
    preview_action_comment: "კომენტარი",
    preview_action_repost: "გაზიარება",
    preview_action_send: "გაგზავნა",
    legal_links: {
      mentions: "პირობები",
      privacy: "კონფიდენციალურობა",
      cgu: "წესები"
    },
    meta: {
      title: "LinkedIn Formatter - ქართული",
      description: "უფასო ინსტრუმენტი LinkedIn პოსტების დასაფორმატებლად."
    }
  },
  hy: { // Armenian
    title: "LinkedIn",
    subtitle: "Ձևավորեք ձեր LinkedIn գրառումները ավելի մեծ ներգրավվածության համար:",
    templates_title: "ՁԵՎԱՆՄՈՒՇՆԵՐ",
    hooks_title: "ՎԵՐՆԱԳՐԵՐ",
    cta_title: "ԳՈՐԾՈՂՈՒԹՅՈՒՆ",
    templates_labels: {
      story: "📖 Պատմություն",
      educational: "🎓 Կրթական",
      feedback: "💬 Կարծիք"
    },
    emoji_groups: {
      structure: "Կառուցվածք",
      attention: "Ուշադրություն",
      positive: "Դրական",
      signals: "Նշաններ",
      business: "Բիզնես",
      numbers: "Թվեր"
    },
    toolbar_bold: "Թավատառ",
    toolbar_more: "Ավելին",
    toolbar_hide: "Թաքցնել",
    placeholder: `Գրեք ձեր տեքստը այստեղ...`,
    stats_chars: "նիշ",
    stats_read_time: "վրկ",
    btn_copy: "Պատճենել",
    btn_copied: "Պատճենված է",
    preview_title: "ԲՋՋԱՅԻՆ ԴԻՏՈՒՄ",
    preview_user: "Ձեր Անունը",
    preview_headline: "Պաշտոն • Ընկերություն",
    preview_time: "1 շաբ.",
    preview_placeholder: "Ձեր գրառման նախադիտումը կհայտնվի այստեղ...",
    preview_read_more: "ավելին",
    preview_read_less: "փակել",
    preview_likes: "հավանում",
    preview_comments: "մեկնաբանություն",
    preview_reposts: "տարածում",
    preview_action_like: "Հավանել",
    preview_action_comment: "Մեկնաբանել",
    preview_action_repost: "Տարածել",
    preview_action_send: "Ուղարկել",
    legal_links: {
      mentions: "Պայմաններ",
      privacy: "Գաղտնիություն",
      cgu: "Կանոններ"
    },
    meta: {
      title: "LinkedIn Formatter - Հայերեն",
      description: "Անվճար գործիք LinkedIn գրառումները ձևավորելու համար:"
    }
  },
  am: { // Amharic
    title: "LinkedIn",
    subtitle: "ለተሻለ ተነባቢነት የእርስዎን የLinkedIn ልጥፎች ያስውቡ።",
    templates_title: "ቅጦች",
    hooks_title: "መግቢያዎች",
    cta_title: "ጥሪዎች",
    templates_labels: {
      story: "📖 ታሪክ",
      educational: "🎓 ትምህርታዊ",
      feedback: "💬 አስተያየት"
    },
    emoji_groups: {
      structure: "መዋቅር",
      attention: "ትኩረት",
      positive: "አዎንታዊ",
      signals: "ምልክቶች",
      business: "ቢዝነስ",
      numbers: "ቁጥሮች"
    },
    toolbar_bold: "ማድመቂያ",
    toolbar_more: "ተጨማሪ",
    toolbar_hide: "ደብቅ",
    placeholder: `ጽሁፍዎን እዚህ ይጻፉ...`,
    stats_chars: "ፊደላት",
    stats_read_time: "ሴኮንድ",
    btn_copy: "ቅዳ",
    btn_copied: "ተቀድቷል",
    preview_title: "የሞባይል እይታ",
    preview_user: "የእርስዎ ስም",
    preview_headline: "የስራ መደብ • ድርጅት",
    preview_time: "1 ሳምንት",
    preview_placeholder: "የልጥፍዎ ቅድመ እይታ እዚህ ይታያል...",
    preview_read_more: "ተጨማሪ",
    preview_read_less: "ቀንስ",
    preview_likes: "መውደዶች",
    preview_comments: "አስተያየቶች",
    preview_reposts: "ማጋራቶች",
    preview_action_like: "ውደድ",
    preview_action_comment: "አስተያየት",
    preview_action_repost: "አጋራ",
    preview_action_send: "ላክ",
    legal_links: {
      mentions: "ህጋዊ መረጃ",
      privacy: "የግላዊነት መመሪያ",
      cgu: "የአጠቃቀም ውል"
    },
    meta: {
      title: "LinkedIn Formatter - አማርኛ",
      description: "የLinkedIn ልጥፎችን ለማስተካከል ነፃ መሳሪያ።"
    }
  }
};