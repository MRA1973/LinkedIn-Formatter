import { FormatterStats } from '../types';

/**
 * Converts standard text to Unicode Bold (Sans-Serif) for LinkedIn.
 * Note: Uses Mathematical Alphanumeric Symbols block.
 */
export const toUnicodeBold = (text: string): string => {
  const UPPER_START = 0x1D5D4; // 𝗔
  const LOWER_START = 0x1D5EE; // 𝗮
  const DIGIT_START = 0x1D7EC; // 𝟬
  
  return text.split('').map(char => {
    const code = char.codePointAt(0);
    if (!code) return char;

    // A-Z
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(UPPER_START + (code - 65));
    }
    // a-z
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(LOWER_START + (code - 97));
    }
    // 0-9
    if (code >= 48 && code <= 57) {
      return String.fromCodePoint(DIGIT_START + (code - 48));
    }
    return char;
  }).join('');
};

/**
 * Converts standard text to Unicode Italic (Sans-Serif).
 */
export const toUnicodeItalic = (text: string): string => {
  const UPPER_START = 0x1D608; // 𝘈
  const LOWER_START = 0x1D622; // 𝘢
  
  return text.split('').map(char => {
    const code = char.codePointAt(0);
    if (!code) return char;

    // A-Z
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(UPPER_START + (code - 65));
    }
    // a-z
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(LOWER_START + (code - 97));
    }
    return char;
  }).join('');
};

/**
 * Converts standard text to Unicode Bold Serif (often perceived as "Bigger" or Headlines).
 */
export const toUnicodeSerifBold = (text: string): string => {
  const UPPER_START = 0x1D400; // 𝐀
  const LOWER_START = 0x1D41A; // 𝐚
  const DIGIT_START = 0x1D7CE; // 𝟎
  
  return text.split('').map(char => {
    const code = char.codePointAt(0);
    if (!code) return char;

    // A-Z
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(UPPER_START + (code - 65));
    }
    // a-z
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(LOWER_START + (code - 97));
    }
    // 0-9
    if (code >= 48 && code <= 57) {
      return String.fromCodePoint(DIGIT_START + (code - 48));
    }
    return char;
  }).join('');
};

/**
 * Converts standard text to Small Caps (perceived as "Smaller").
 */
export const toSmallCaps = (text: string): string => {
  const MAP: Record<string, string> = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ', 'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ', 'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
  };

  return text.split('').map(char => MAP[char] || char).join('');
};

/**
 * Cleans text: removes excessive newlines, trims trailing spaces.
 * Ensures max 1 empty line between paragraphs for readability on mobile.
 */
export const cleanText = (text: string): string => {
  // Split by newline
  const lines = text.split('\n');
  
  // Trim every line
  const trimmedLines = lines.map(line => line.trim());
  
  // Reduce multiple empty lines to a single empty line
  const result: string[] = [];
  let emptyLineCount = 0;

  for (const line of trimmedLines) {
    if (line === '') {
      emptyLineCount++;
      if (emptyLineCount <= 1) {
        result.push(line);
      }
    } else {
      emptyLineCount = 0;
      result.push(line);
    }
  }

  return result.join('\n');
};

/**
 * Calculates text statistics.
 */
export const getStats = (text: string): FormatterStats => {
  const chars = text.length;
  // Simple word count regex
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lines = text.split('\n').length;
  // Avg reading speed: 200-250 wpm. Let's use 225.
  const readTime = Math.ceil((words / 225) * 60);

  return { chars, words, lines, readTime };
};

/**
 * Inserts text at the cursor position of a textarea.
 */
export const insertAtCursor = (
  currentText: string, 
  textToInsert: string, 
  selectionStart: number, 
  selectionEnd: number
): { newText: string, newCursorPos: number } => {
  const before = currentText.substring(0, selectionStart);
  const after = currentText.substring(selectionEnd);
  const newText = before + textToInsert + after;
  const newCursorPos = selectionStart + textToInsert.length;
  return { newText, newCursorPos };
};