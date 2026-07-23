import { create } from 'zustand';

const initialAnswers = {
  recipient: '',      // Step 1
  celebration: '',    // Step 2
  projectName: '',    // Step 3
  theme: 'Classic',   // Step 4 (default)
  photos: [],         // Step 5
  musicOption: 'Choose Later', // Step 6
  aiLetter: false,    // Step 7
};

export const useWizardStore = create((set, get) => ({
  currentStep: 1,
  answers: initialAnswers,
  isSaving: false,

  setAnswer: (key, value) => {
    set((state) => ({
      answers: { ...state.answers, [key]: value }
    }));
    
    // Tự động Autosave chạy ngầm sau mỗi thay đổi
    get().autosaveProgress();
  },

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 8) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  resetWizard: () => set({ currentStep: 1, answers: initialAnswers }),

  autosaveProgress: () => {
    set({ isSaving: true });
    // Giả lập lưu cục bộ vào LocalStorage để người dùng không bao giờ mất tiến trình
    if (typeof window !== 'undefined') {
      localStorage.setItem('dmc_wizard_draft', JSON.stringify(get().answers));
      localStorage.setItem('dmc_wizard_step', get().currentStep.toString());
    }
    setTimeout(() => {
      set({ isSaving: false });
    }, 500);
  },

  loadSavedProgress: () => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem('dmc_wizard_draft');
      const savedStep = localStorage.getItem('dmc_wizard_step');
      if (savedAnswers) {
        set({ answers: JSON.parse(savedAnswers) });
      }
      if (savedStep) {
        set({ currentStep: parseInt(savedStep, 10) });
      }
    }
  }
}));
