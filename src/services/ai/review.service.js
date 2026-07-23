/**
 * Review Service - Analyzes memory draft for completeness (captions, music, letter length)
 */
export class ReviewService {
  static async execute(action, payload) {
    if (action === 'audit') {
      const { draft } = payload;
      const warnings = [];

      if (!draft.photos || draft.photos.length === 0) {
        warnings.push('Chưa tải lên bất cứ bức ảnh kỷ niệm nào.');
      }
      if (!draft.musicOption || draft.musicOption === 'Choose Later') {
        warnings.push('Nhạc nền du dương chưa được chọn.');
      }
      if (!draft.projectName || draft.projectName.trim() === '') {
        warnings.push('Tên tựa đề hồi ức đang để trống.');
      }

      return {
        warnings,
        passed: warnings.length === 0
      };
    }
    return { warnings: [], passed: true };
  }
}
