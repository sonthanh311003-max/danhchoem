import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { projectService } from '@/services/project.service';

export const useProjectStore = create((set, get) => {
  
  // Lắng nghe sự thay đổi trạng thái đăng nhập để tự động đồng bộ hóa dự án kỷ niệm
  if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          set({ loading: true });
          const userProjects = await projectService.getProjectsByUser(session.user.id);
          set({ projects: userProjects, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      } else {
        set({ projects: [], currentProject: null });
      }
    });
  }

  return {
    projects: [],
    currentProject: null,
    loading: false,
    error: null,

    /**
     * Load all projects from Supabase database for a specific user.
     */
    loadProjects: async (userId) => {
      set({ loading: true, error: null });
      try {
        const userProjects = await projectService.getProjectsByUser(userId);
        set({ projects: userProjects, loading: false });
      } catch (err) {
        set({ error: err.message, loading: false });
        throw err;
      }
    },

    /**
     * Create a project, save it to the DB, and update the store projects list.
     */
    createProject: async (projectData) => {
      set({ loading: true, error: null });
      try {
        if (!projectData.name || projectData.name.trim() === '') {
          throw new Error('Tên dự án là bắt buộc.');
        }

        const project = await projectService.createProject(projectData);
        
        // Fetch lại toàn bộ danh sách để bảo đảm tính đúng đắn của cấu trúc dữ liệu join
        const userProjects = await projectService.getProjectsByUser(project.user_id);
        
        set({
          projects: userProjects,
          currentProject: userProjects.find(p => p.id === project.id) || project,
          loading: false
        });

        return project.id;
      } catch (err) {
        set({ error: err.message, loading: false });
        throw err;
      }
    },

    setCurrentProject: (project) => set({ currentProject: project }),

    /**
     * Get the 5 most recently updated projects.
     */
    getRecentProjects: () => {
      const { projects } = get();
      return [...projects]
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 5);
    }
  };
});
