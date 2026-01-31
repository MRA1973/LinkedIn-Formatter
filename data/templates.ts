import { TemplateItem, EmojiGroup, Language } from '../types';

// Dictionnaire des contenus par langue
export const HOOKS: Record<Language, TemplateItem[]> = {
  fr: [
    { id: 'h1', category: 'hook', label: 'Contre-intuitif', text: "On ne vous dit pas tout sur [Sujet]..." },
    { id: 'h2', category: 'hook', label: 'Erreur', text: "L'erreur que font 90% des gens quand ils débutent :" },
    { id: 'h3', category: 'hook', label: 'Histoire', text: "J'ai failli tout abandonner hier. Voici pourquoi :" },
    { id: 'h4', category: 'hook', label: 'Chiffre', text: "3 astuces simples pour doubler vos résultats en [Temps] :" },
    { id: 'h5', category: 'hook', label: 'Opinion', text: "Arrêtez de croire que [Croyance] est la solution." },
  ],
  ka: [
    { id: 'h1_ka', category: 'hook', label: 'ინტრიგა', text: "რაც არ იცით [თემა]-ს შესახებ..." },
    { id: 'h2_ka', category: 'hook', label: 'შეცდომა', text: "შეცდომა, რომელსაც 90% უშვებს:" },
  ],
  hy: [
    { id: 'h1_hy', category: 'hook', label: 'Ինտրիգ', text: "Այն, ինչ ձեզ չեն ասում [Թեմայի] մասին..." },
  ],
  am: [
    { id: 'h1_am', category: 'hook', label: 'መግቢያ', text: "ስለ [ርዕስ] ማወቅ ያለብዎት..." },
  ]
};

export const CTAS: Record<Language, TemplateItem[]> = {
  fr: [
    { id: 'c1', category: 'cta', label: 'Débat', text: "Et vous, qu'en pensez-vous ? Dites-le-moi en commentaire 👇" },
    { id: 'c2', category: 'cta', label: 'Contact', text: "Envoyez-moi un DM pour en discuter de vive voix 📩" },
    { id: 'c3', category: 'cta', label: 'Newsletter', text: "Pour plus de conseils comme celui-ci, le lien est dans ma bio 🔗" },
    { id: 'c4', category: 'cta', label: 'Partage', text: "♻️ Repostez si vous pensez que ça peut aider votre réseau." },
  ],
  ka: [
    { id: 'c1_ka', category: 'cta', label: 'დისკუსია', text: "რას ფიქრობთ? დაწერეთ კომენტარებში 👇" },
    { id: 'c4_ka', category: 'cta', label: 'გაზიარება', text: "♻️ გააზიარეთ, თუ თვლით რომ სასარგებლოა." },
  ],
  hy: [
    { id: 'c1_hy', category: 'cta', label: 'Քննարկում', text: "Իսկ դուք ի՞նչ եք կարծում: Գրեք մեկնաբանություններում 👇" },
  ],
  am: [
    { id: 'c1_am', category: 'cta', label: 'ውይይት', text: "እርስዎስ ምን ያስባሉ? በአስተያየት ይንገሩኝ 👇" },
  ]
};

// Sélection pour la barre d'outils rapide (mode compact) - Universel
export const QUICK_ITEMS = ["•", "—", "➤", "1️⃣", "✅", "💡", "🔥", "👇"];

// Utilisation des IDs pour la traduction au lieu des textes en dur
export const EMOJI_GROUPS: EmojiGroup[] = [
  { id: "structure", items: ["•", "·", "—", "➤", "➔", "→", "📍"] },
  { id: "attention", items: ["⚠️", "❗", "❓", "🚨", "❌", "🛑"] },
  { id: "positive", items: ["✅", "✔️", "👍", "👏", "🤝", "🏆", "🌟"] },
  { id: "signals", items: ["👉", "📌", "🔹", "💡", "🧠", "🤔", "🔍", "📝", "🔥"] },
  { id: "business", items: ["📈", "📊", "🎯", "💼", "💰", "🚀", "📅"] },
  { id: "numbers", items: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"] }
];

export const STRUCTURE_TEMPLATES: Record<Language, any> = {
  fr: {
    story: `[Accroche percutante]

Il y a quelque temps, je me suis retrouvé face à [Problème].

Je pensais que [Fausse croyance].
Mais j'ai réalisé que [Révélation].

Voici ce que j'ai appris :
1. [Leçon 1]
2. [Leçon 2]
3. [Leçon 3]

Aujourd'hui, [Résultat actuel].

[Appel à l'action]`,

    educational: `[Titre : Comment faire X en Y étapes]

Beaucoup de gens galèrent avec [Problème].
Pourtant, la solution est simple si on a la bonne méthode.

Voici les X étapes à suivre :

1️⃣ [Étape 1]
Explication...

2️⃣ [Étape 2]
Explication...

3️⃣ [Étape 3]
Explication...

💡 Résultat : [Bénéfice final]

[Appel à l'action]`,

    feedback: `On m'a souvent posé la question : "[Question fréquente ?]"

Ma réponse est toujours la même : [Réponse courte].

Pourquoi ?
• [Argument 1]
• [Argument 2]
• [Argument 3]

En résumé : ne cherchez pas à [Erreur], cherchez plutôt à [Conseil].

D'accord avec moi ? 👇`
  },
  ka: {
    story: `[ძლიერი სათაური]

ცოტა ხნის წინ, მე შევეჯახე [პრობლემა].

მეგონა, რომ [მცდარი მოსაზრება].
მაგრამ მივხვდი, რომ [აღმოჩენა].

აი რა ვისწავლე:
1. [გაკვეთილი 1]
2. [გაკვეთილი 2]
3. [გაკვეთილი 3]

დღეს, [შედეგი].

[მოწოდება]`,
    educational: "",
    feedback: ""
  },
  hy: {
    story: "",
    educational: "",
    feedback: ""
  },
  am: {
    story: "",
    educational: "",
    feedback: ""
  }
};