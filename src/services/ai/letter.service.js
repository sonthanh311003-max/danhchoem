/**
 * Letter Service - Implements gentle letter adjustments (Grammar, Romantic, Short/Long)
 * Note: Never rewrite the user's authentic voice, only polish.
 */
export class LetterService {
  static async execute(action, payload) {
    const { text, mode } = payload;
    if (action === 'polish') {
      let polishedText = text;
      switch (mode) {
        case 'romantic':
          polishedText = `❤️ ${text} \n(Mỗi nhịp đập trái tim anh đều trân trọng từng phút giây bên em...)`;
          break;
        case 'elegant':
          polishedText = `✨ Thân gửi, \n${text} \nChúc cho tình cảm chúng ta mãi mãi đong đầy tựa những vì sao tinh tú...`;
          break;
        case 'shorter':
          polishedText = text.substring(0, Math.min(100, text.length)) + '...';
          break;
        default:
          polishedText = text;
      }
      return { text: polishedText };
    }
    return { text };
  }
}
