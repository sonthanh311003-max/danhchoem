import { supabase } from '@/lib/supabase';

export const projectService = {
  /**
   * Create a new project along with its associated images.
   * Auto-falls back to anonymous sign-in or session checks to guarantee smooth creation flow.
   */
  async createProject(data) {
    try {
      let user = null;

      // 1. Kiểm tra user hiện hành từ Supabase auth
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (!userError && userData?.user) {
        user = userData.user;
      } else {
        // 2. Thử lấy từ session cache dự phòng
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          user = sessionData.session.user;
        } else {
          // 3. Tự động đăng nhập ẩn danh để đảm bảo người dùng chưa đăng nhập vẫn lưu được kỉ vật
          try {
            const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
            if (!anonError && anonData?.user) {
              user = anonData.user;
            }
          } catch (e) {
            console.warn('[ProjectService] Anonymous sign-in failed/not supported:', e);
          }
        }
      }

      if (!user) {
        throw new Error('Vui lòng đăng nhập tài khoản để thực hiện lưu trữ kỉ vật.');
      }

      // Insert project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: data.name,
          recipient: data.recipient,
          celebration: data.celebration,
          theme: data.theme || 'Classic',
          music: data.music || null,
          letter_content: data.letterContent || '',
          is_public: data.is_public || false
        })
        .select()
        .single();

      if (projectError) {
        throw new Error('Không thể khởi tạo kỷ niệm. Vui lòng thử lại sau.');
      }

      // Insert images if present
      if (data.images && data.images.length > 0) {
        const imagePayload = data.images.map((img, index) => ({
          project_id: project.id,
          url: img.url,
          caption: img.caption || '',
          sort_order: img.sort_order || index
        }));

        const { error: imagesError } = await supabase
          .from('project_images')
          .insert(imagePayload);

        if (imagesError) {
          throw new Error('Khởi tạo kỷ niệm thành công nhưng không thể lưu các hình ảnh đi kèm.');
        }
      }

      return project;
    } catch (error) {
      console.error('[ProjectService] createProject error:', error);
      throw new Error(error.message || 'Lỗi hệ thống khi lưu trữ kỷ niệm.');
    }
  },

  /**
   * Fetch all projects belonging to a user, including associated images.
   */
  async getProjectsByUser(userId) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_images(*)')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        throw new Error('Không thể tải danh sách kỷ niệm từ cơ sở dữ liệu.');
      }

      return data.map(project => ({
        ...project,
        letterContent: project.letter_content,
        images: project.project_images || []
      }));
    } catch (error) {
      console.error('[ProjectService] getProjectsByUser error:', error);
      throw new Error(error.message || 'Lỗi hệ thống khi tải danh sách kỷ niệm.');
    }
  },

  /**
   * Fetch a specific project by id with images.
   */
  async getProjectById(id) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_images(*)')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error('Không tìm thấy kỷ niệm yêu cầu.');
      }

      return {
        ...data,
        letterContent: data.letter_content,
        images: data.project_images || []
      };
    } catch (error) {
      console.error('[ProjectService] getProjectById error:', error);
      throw new Error(error.message || 'Lỗi hệ thống khi tải kỷ niệm.');
    }
  },

  /**
   * Update project fields and set updated_at.
   */
  async updateProject(id, patch) {
    try {
      const dbPatch = {};
      if (patch.name !== undefined) dbPatch.name = patch.name;
      if (patch.recipient !== undefined) dbPatch.recipient = patch.recipient;
      if (patch.celebration !== undefined) dbPatch.celebration = patch.celebration;
      if (patch.theme !== undefined) dbPatch.theme = patch.theme;
      if (patch.music !== undefined) dbPatch.music = patch.music;
      if (patch.letterContent !== undefined) dbPatch.letter_content = patch.letterContent;
      if (patch.is_public !== undefined) dbPatch.is_public = patch.is_public;
      
      dbPatch.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('projects')
        .update(dbPatch)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error('Không thể cập nhật kỷ niệm vào cơ sở dữ liệu.');
      }

      return {
        ...data,
        letterContent: data.letter_content
      };
    } catch (error) {
      console.error('[ProjectService] updateProject error:', error);
      throw new Error(error.message || 'Lỗi hệ thống khi cập nhật kỷ niệm.');
    }
  },

  /**
   * Delete a project.
   */
  async deleteProject(id) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Không thể xóa kỷ niệm yêu cầu.');
      }

      return true;
    } catch (error) {
      console.error('[ProjectService] deleteProject error:', error);
      throw new Error(error.message || 'Lỗi hệ thống khi xóa kỷ niệm.');
    }
  }
};
