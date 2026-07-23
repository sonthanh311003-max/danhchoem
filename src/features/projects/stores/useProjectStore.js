import { create } from 'zustand';

export const useProjectStore = create((set, get) => ({
  projects: [
    // Tạm thời để Mock 2 dự án ban đầu để giao diện Welcome Screen sinh động ngay
    {
      id: 'project-1',
      name: 'Kỷ niệm Ngày bên nhau',
      recipient: 'My Partner',
      theme: 'Classic',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 giờ trước
    },
    {
      id: 'project-2',
      name: 'Mùa thu Hà Nội cùng gia đình',
      recipient: 'Family',
      theme: 'Autumn',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 ngày trước
    }
  ],
  currentProject: null,
  loading: false,
  error: null,

  createProject: async (projectData) => {
    set({ loading: true });
    try {
      // Logic Zod Validation theo Task 04 Project Creation Service
      if (!projectData.name || projectData.name.trim() === '') {
        throw new Error('Tên dự án là bắt buộc.');
      }

      const newProject = {
        id: `project-${Math.random().toString(36).substr(2, 9)}`,
        name: projectData.name,
        recipient: projectData.recipient || 'Myself',
        celebration: projectData.celebration || 'Birthday',
        theme: projectData.theme || 'Classic',
        music: projectData.music || null,
        images: projectData.images || [],
        letterContent: '',
        updatedAt: new Date().toISOString(),
      };

      set((state) => ({
        projects: [newProject, ...state.projects],
        currentProject: newProject,
        loading: false
      }));

      return newProject.id;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  setCurrentProject: (project) => set({ currentProject: project }),

  getRecentProjects: () => {
    const { projects } = get();
    // Trả về tối đa 5 dự án xếp theo thời gian cập nhật mới nhất
    return [...projects]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }
}));
