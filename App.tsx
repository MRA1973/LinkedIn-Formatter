import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HOOKS, CTAS, EMOJI_GROUPS, STRUCTURE_TEMPLATES, QUICK_ITEMS } from './data/templates';
import { UI_TRANSLATIONS } from './data/translations';
import { LEGAL_CONTENT } from './data/legal';
import { toUnicodeBold, getStats, insertAtCursor } from './utils/formatter';
import { PostStyle, Language } from './types';

const MAX_CHARS = 3000;
const AVAILABLE_LANGUAGES: {code: Language, label: string, flag: string}[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
  { code: 'hy', label: 'Հայերեն', flag: '🇦🇲' },
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹' }
];

// --- Composant Publicitaire ---
const AdUnit = ({ slotId, format = "auto", className = "" }: { slotId: string, format?: string, className?: string }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className={`bg-slate-200/50 rounded-lg overflow-hidden flex flex-col items-center justify-center text-xs text-slate-400 border border-slate-200 ${className}`}>
      <span className="w-full text-center py-1 bg-slate-100/50 text-[10px] uppercase tracking-wider">Publicité</span>
      <div className="w-full min-h-[100px] flex items-center justify-center bg-white/50">
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-VOTRE_ID_ICI" // À REMPLACER
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [text, setText] = useState<string>('');
  const [lastCopied, setLastCopied] = useState<boolean>(false);
  const [showAllIcons, setShowAllIcons] = useState<boolean>(false);
  const [legalPage, setLegalPage] = useState<keyof typeof LEGAL_CONTENT | null>(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState<boolean>(false);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ui = UI_TRANSLATIONS[currentLang];

  // --- I18N Routing & SEO Logic ---
  useEffect(() => {
    // 1. Determine language from URL (Basic Client Side Routing)
    // Supports: domain.com/ka/ or domain.com/?lang=ka
    const pathLang = window.location.pathname.split('/')[1] as Language;
    const queryLang = new URLSearchParams(window.location.search).get('lang') as Language;
    
    let targetLang: Language = 'fr';
    if (pathLang && UI_TRANSLATIONS[pathLang]) targetLang = pathLang;
    else if (queryLang && UI_TRANSLATIONS[queryLang]) targetLang = queryLang;

    setCurrentLang(targetLang);

    // 2. Update Document Title & Description for SEO
    document.title = UI_TRANSLATIONS[targetLang].meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', UI_TRANSLATIONS[targetLang].meta.description);
    
    // 3. Update HTML lang attribute
    document.documentElement.lang = targetLang;

  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    // Push state to URL without reload
    window.history.pushState({}, '', `/${lang === 'fr' ? '' : lang}`); // Default 'fr' is root
    // Update SEO immediately
    document.title = UI_TRANSLATIONS[lang].meta.title;
    document.documentElement.lang = lang;
  };

  // --- Formatting Logic ---
  const stats = getStats(text);
  const isOverLimit = stats.chars > MAX_CHARS;

  const handleInsert = useCallback((textToInsert: string) => {
    if (!textareaRef.current) return;
    const { selectionStart, selectionEnd } = textareaRef.current;
    const { newText, newCursorPos } = insertAtCursor(text, textToInsert, selectionStart, selectionEnd);
    setText(newText);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }, [text]);

  const applyFormat = (formatter: (s: string) => string) => {
    if (!textareaRef.current) return;
    const { selectionStart, selectionEnd, value } = textareaRef.current;
    if (selectionStart === selectionEnd) return;
    const selectedText = value.substring(selectionStart, selectionEnd);
    const formattedText = formatter(selectedText);
    const before = value.substring(0, selectionStart);
    const after = value.substring(selectionEnd);
    setText(before + formattedText + after);
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(selectionStart, selectionStart + formattedText.length);
        }
    }, 0);
  };

  const handleApplyTemplate = (type: PostStyle) => {
    if (text.length > 20 && !window.confirm("Cela va remplacer votre texte actuel. Continuer ?")) return;
    const templateText = STRUCTURE_TEMPLATES[currentLang][type] || STRUCTURE_TEMPLATES['fr'][type]; // Fallback to FR
    if (templateText && type !== PostStyle.DEFAULT) {
      setText(templateText);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setLastCopied(true);
      setTimeout(() => setLastCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const renderMobilePreviewContent = () => {
    if (!text) {
      return <span className="text-slate-400 italic">{ui.preview_placeholder}</span>;
    }
    const CHAR_LIMIT = 210;
    const MAX_NEWLINES = 5;
    const newlinesCount = (text.match(/\n/g) || []).length;
    const shouldTruncate = text.length > CHAR_LIMIT || newlinesCount >= MAX_NEWLINES;

    if (!shouldTruncate) return text;

    if (isPreviewExpanded) {
      return (
        <>
          {text}
          <button onClick={() => setIsPreviewExpanded(false)} className="ml-1 text-slate-500 font-semibold hover:text-blue-600 hover:underline text-xs cursor-pointer align-baseline">{ui.preview_read_less}</button>
        </>
      );
    }

    let cutIndex = text.length;
    if (text.length > CHAR_LIMIT) cutIndex = CHAR_LIMIT;
    let currentNewline = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            currentNewline++;
            if (currentNewline >= MAX_NEWLINES) {
                if (i < cutIndex) cutIndex = i;
                break;
            }
        }
    }

    return (
      <>
        {text.substring(0, cutIndex).trim()}
        <span className="text-slate-800">... </span>
        <button onClick={() => setIsPreviewExpanded(true)} className="text-slate-500 font-semibold hover:text-blue-600 hover:underline text-xs cursor-pointer align-baseline">{ui.preview_read_more}</button>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans relative">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Header - Mobile */}
        <div className="lg:col-span-12 lg:hidden mb-4 flex justify-between items-center">
           <h1 className="text-xl font-bold text-slate-800 tracking-tight">{ui.title}<span className="text-blue-600">Formatter</span></h1>
           {/* Mobile language selector removed */}
        </div>

        {/* Left Column: Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          <div className="hidden lg:block mb-8 max-w-[240px]">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">{ui.title}<span className="text-blue-600">Formatter</span></h1>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">{ui.subtitle}</p>
            {/* Desktop language selector removed */}
          </div>

          <div className="flex flex-col gap-8 max-w-[240px]">
            {/* PUB Sidebar */}
            <AdUnit slotId="SLOT_ID_SIDEBAR" className="min-h-[250px] shadow-sm bg-white border-0" />

            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-400 mb-3 text-[10px] uppercase tracking-widest">{ui.templates_title}</h3>
              <div className="flex flex-col gap-1">
                <button onClick={() => handleApplyTemplate(PostStyle.STORY)} className="text-left px-2 py-1.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors">{ui.templates_labels.story}</button>
                <button onClick={() => handleApplyTemplate(PostStyle.EDUCATIONAL)} className="text-left px-2 py-1.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors">{ui.templates_labels.educational}</button>
                <button onClick={() => handleApplyTemplate(PostStyle.FEEDBACK)} className="text-left px-2 py-1.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors">{ui.templates_labels.feedback}</button>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-400 mb-3 text-[10px] uppercase tracking-widest">{ui.hooks_title}</h3>
              <div className="flex flex-col gap-2">
                {(HOOKS[currentLang] || HOOKS['fr']).map(hook => (
                  <button 
                    key={hook.id} 
                    onClick={() => handleInsert(hook.text)}
                    className="text-left text-[11px] leading-snug bg-slate-50 p-2 rounded hover:bg-slate-100 border border-transparent hover:border-slate-300 transition-all truncate text-slate-600"
                    title={hook.text}
                  >
                    {hook.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-400 mb-3 text-[10px] uppercase tracking-widest">{ui.cta_title}</h3>
              <div className="flex flex-col gap-2">
                {(CTAS[currentLang] || CTAS['fr']).map(cta => (
                  <button 
                    key={cta.id} 
                    onClick={() => handleInsert('\n\n' + cta.text)}
                    className="text-left text-[11px] leading-snug bg-slate-50 p-2 rounded hover:bg-slate-100 border border-transparent hover:border-slate-300 transition-all truncate text-slate-600"
                    title={cta.text}
                  >
                    {cta.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Editor */}
        <div className="lg:col-span-7 flex flex-col min-h-[85vh]">
          
          <div className="bg-white border border-slate-200 border-b-slate-100 p-3 rounded-t-xl sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <button onClick={() => applyFormat(toUnicodeBold)} className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 transition-colors" title={ui.toolbar_bold}>B</button>
                    </div>
                    <div className="w-px h-5 bg-slate-300"></div>
                    <div className="flex items-center gap-1">
                        {QUICK_ITEMS.map(item => (
                            <button key={item} onClick={() => handleInsert(item)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-lg transition-colors">{item}</button>
                        ))}
                    </div>
                </div>
                <button onClick={() => setShowAllIcons(!showAllIcons)} className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${showAllIcons ? 'bg-slate-100 text-slate-800' : 'text-blue-600 hover:bg-blue-50'}`}>
                    {showAllIcons ? ui.toolbar_hide : ui.toolbar_more}
                    <svg className={`w-3 h-3 transform transition-transform ${showAllIcons ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            {showAllIcons && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    {EMOJI_GROUPS.map((group) => (
                        <div key={group.id}>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 pl-1">{ui.emoji_groups[group.id]}</div>
                            <div className="flex flex-wrap gap-1">
                                {group.items.map(item => (
                                    <button key={item} onClick={() => handleInsert(item)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded text-lg transition-colors" title={ui.emoji_groups[group.id]}>{item}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow w-full p-8 bg-white text-slate-800 resize-none outline-none text-base leading-[1.8] rounded-b-xl shadow-sm border border-t-0 border-slate-200 font-sans placeholder:text-slate-400/80 transition-colors focus:border-blue-200 focus:bg-white"
            placeholder={ui.placeholder}
            style={{ minHeight: '500px' }}
          />

          <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex gap-4 text-xs text-slate-500 font-medium">
              <span className={isOverLimit ? "text-red-500" : ""}>{stats.chars} / {MAX_CHARS} {ui.stats_chars}</span>
              <span>~{stats.readTime} {ui.stats_read_time}</span>
            </div>
            <button 
              onClick={handleCopy}
              disabled={!text}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md
                ${!text 
                  ? 'opacity-50 cursor-not-allowed bg-slate-400 shadow-none' 
                  : lastCopied 
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300'
                }
              `}
            >
              {lastCopied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  <span>{ui.btn_copied}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  <span>{ui.btn_copy}</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6">
             <AdUnit slotId="SLOT_ID_BANNER" format="horizontal" />
          </div>

        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-3 hidden lg:block">
          <h3 className="font-bold text-slate-400 mb-3 text-[10px] uppercase tracking-widest">{ui.preview_title}</h3>
          <div className="bg-white border border-slate-300 rounded-[2.5rem] p-3 shadow-2xl overflow-hidden relative" style={{ height: '85vh', maxHeight: '920px', minHeight: '700px' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>
            <div className="h-full overflow-y-auto bg-slate-50 pt-8 pb-8 scrollbar-hide rounded-[2rem]">
              <div className="bg-white px-4 py-3 mb-2 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-sm text-slate-900 leading-tight truncate">{ui.preview_user}</div>
                        <div className="text-xs text-slate-500 truncate mt-0.5">{ui.preview_headline}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <span>{ui.preview_time}</span>
                          <span>•</span>
                          <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM8 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8z"/><path d="M8 3a5 5 0 0 0-5 5v1h10V8a5 5 0 0 0-5-5z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words font-sans">
                  {renderMobilePreviewContent()}
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                             <div className="w-4 h-4 rounded-full bg-[#1485BD] border border-white relative z-10"></div>
                             <div className="w-4 h-4 rounded-full bg-[#E7A33E] border border-white relative z-0"></div>
                             <div className="w-4 h-4 rounded-full bg-[#6EA95C] border border-white relative z-0"></div>
                        </div>
                        <span className="ml-1">128</span>
                    </div>
                    <div>42 {ui.preview_comments} • 12 {ui.preview_reposts}</div>
                </div>
                <div className="border-t border-slate-200 mt-2 mb-1"></div>
                <div className="flex justify-between items-center px-1">
                     <button className="flex flex-col items-center py-2 px-2 hover:bg-slate-100 rounded-lg group transition-colors flex-1">
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1 group-hover:text-slate-700">{ui.preview_action_like}</span>
                     </button>
                     <button className="flex flex-col items-center py-2 px-2 hover:bg-slate-100 rounded-lg group transition-colors flex-1">
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1 group-hover:text-slate-700">{ui.preview_action_comment}</span>
                     </button>
                     <button className="flex flex-col items-center py-2 px-2 hover:bg-slate-100 rounded-lg group transition-colors flex-1">
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1 group-hover:text-slate-700">{ui.preview_action_repost}</span>
                     </button>
                     <button className="flex flex-col items-center py-2 px-2 hover:bg-slate-100 rounded-lg group transition-colors flex-1">
                        <svg className="w-5 h-5 text-slate-500 group-hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1 group-hover:text-slate-700">{ui.preview_action_send}</span>
                     </button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-slate-900/20 rounded-full z-20 pointer-events-none"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="lg:col-span-12 mt-4 pt-10 border-t border-slate-200 pb-10 text-center relative">
            <div className="flex flex-wrap justify-center gap-6 mb-4 text-xs font-medium text-slate-500">
                <button onClick={() => setLegalPage('mentions')} className="hover:text-blue-600 transition-colors">{ui.legal_links.mentions}</button>
                <button onClick={() => setLegalPage('privacy')} className="hover:text-blue-600 transition-colors">{ui.legal_links.privacy}</button>
                <button onClick={() => setLegalPage('cgu')} className="hover:text-blue-600 transition-colors">{ui.legal_links.cgu}</button>
            </div>
            
            {/* Nouveau Sélecteur de langue Discret */}
            <div className="relative inline-block mb-4">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)} 
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
                  title="Changer de langue"
                >
                   <span className="text-lg leading-none">🌐</span>
                </button>

                {showLangMenu && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20">
                    {AVAILABLE_LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 flex items-center gap-2 ${currentLang === lang.code ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
                {/* Backdrop invisible pour fermer le menu au clic extérieur */}
                {showLangMenu && (
                   <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)}></div>
                )}
            </div>

            <p className="text-[10px] text-slate-400">&copy; {new Date().getFullYear()} {ui.title} Formatter. All rights reserved.</p>
        </div>

      </div>

      {/* Legal Modal */}
      {legalPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setLegalPage(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden transform animate-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">{LEGAL_CONTENT[legalPage].title}</h2>
                    <button onClick={() => setLegalPage(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                        {LEGAL_CONTENT[legalPage].content.split('\n').map((line, i) => (
                             line.trim() === '' ? <br key={i}/> : <p key={i} className="mb-3 leading-relaxed">{line}</p>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button onClick={() => setLegalPage(null)} className="px-5 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors">Fermer</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}