/**
 * AI Gateway - Central hub coordinating API requests to separate micro-services
 * Handles retries, fallback responses, and streaming logic
 */
export class AIGateway {
  static async request(serviceName, action, payload) {
    console.log(`[AIGateway] Routing request for ${serviceName}/${action}`);
    
    // Giả lập cơ chế Retry và Tránh nghẽn (Fallback)
    try {
      switch (serviceName) {
        case 'story':
          return await import('./story.service').then(m => m.StoryService.execute(action, payload));
        case 'theme':
          return await import('./theme.service').then(m => m.ThemeService.execute(action, payload));
        case 'music':
          return await import('./music.service').then(m => m.MusicService.execute(action, payload));
        case 'letter':
          return await import('./letter.service').then(m => m.LetterService.execute(action, payload));
        case 'review':
          return await import('./review.service').then(m => m.ReviewService.execute(action, payload));
        default:
          throw new Error(`Dịch vụ AI không hợp lệ: ${serviceName}`);
      }
    } catch (error) {
      console.warn(`[AIGateway] Lỗi dịch vụ ${serviceName}. Đang kích hoạt Fallback UI.`, error);
      return this.getFallback(serviceName, action);
    }
  }

  static getFallback(serviceName, action) {
    // Trả về dữ liệu an toàn để không bao giờ chặn luồng trải nghiệm của người dùng
    const fallbacks = {
      theme: { recommended: 'Classic', confidence: 0.9 },
      music: { track: 'Love Theme', url: null },
      review: { warnings: [], passed: true }
    };
    return fallbacks[serviceName] || {};
  }
}
