
export type Category = 'hook' | 'cta' | 'emoji';
export type Language = 'fr' | 'ka' | 'hy' | 'am';

export interface TemplateItem {
  id: string;
  text: string;
  category: Category;
  label?: string; // Short label for UI
}

export interface EmojiGroup {
  id: keyof UIContent['emoji_groups']; // Link strictly to translation keys
  items: string[];
}

export enum PostStyle {
  STORY = 'story',
  EDUCATIONAL = 'educational',
  FEEDBACK = 'feedback',
  DEFAULT = 'default'
}

export interface FormatterStats {
  chars: number;
  words: number;
  lines: number;
  readTime: number; // in seconds
}

export interface UIContent {
  title: string;
  subtitle: string;
  templates_title: string;
  hooks_title: string;
  cta_title: string;
  templates_labels: {
    story: string;
    educational: string;
    feedback: string;
  };
  // Nouvelles clés pour les groupes d'emojis
  emoji_groups: {
    structure: string;
    attention: string;
    positive: string;
    signals: string;
    business: string;
    numbers: string;
  };
  toolbar_bold: string;
  toolbar_more: string;
  toolbar_hide: string;
  placeholder: string;
  stats_chars: string;
  stats_read_time: string;
  btn_copy: string;
  btn_copied: string;
  preview_title: string;
  preview_user: string;
  preview_headline: string;
  preview_time: string;
  preview_placeholder: string;
  preview_read_more: string;
  preview_read_less: string;
  preview_likes: string;
  preview_comments: string;
  preview_reposts: string;
  preview_action_like: string;
  preview_action_comment: string;
  preview_action_repost: string;
  preview_action_send: string;
  legal_links: {
    mentions: string;
    privacy: string;
    cgu: string;
  };
  meta: {
    title: string;
    description: string;
  };
}