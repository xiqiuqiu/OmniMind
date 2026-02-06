/**
 * useProjects BDD 测试
 * 测试项目管理 Composable 的核心功能
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useProjects } from "../useProjects";

// Mock Supabase 模块
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

// Mock useAuth
vi.mock("../useAuth", () => ({
  useAuth: vi.fn(() => ({
    userId: { value: "test-user-id" },
    isAuthenticated: { value: true },
  })),
}));

describe("useProjects", () => {
  let projectsComposable: ReturnType<typeof useProjects>;

  beforeEach(() => {
    projectsComposable = useProjects();
    // 重置状态
    projectsComposable.resetProject();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================
  // Feature: 项目选择
  // ============================================================
  describe("selectProject", () => {
    it("should update currentProject when selecting a project", () => {
      // Given: 存在一个项目对象
      const mockProject = {
        id: "project-1",
        name: "测试项目",
        user_id: "test-user-id",
        description: null,
        config: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // When: 选择该项目
      projectsComposable.selectProject(mockProject);

      // Then: currentProject 应更新为该项目
      expect(projectsComposable.currentProject.value).toEqual(mockProject);
    });
  });

  // ============================================================
  // Feature: 项目重置
  // ============================================================
  describe("resetProject", () => {
    it("should clear all projects when resetting", () => {
      // Given: 已选择一个项目
      const mockProject = {
        id: "project-1",
        name: "测试项目",
        user_id: "test-user-id",
        description: null,
        config: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      projectsComposable.selectProject(mockProject);

      // When: 调用重置
      projectsComposable.resetProject();

      // Then: 项目列表为空，当前项目为 null
      expect(projectsComposable.projects.value).toEqual([]);
      expect(projectsComposable.currentProject.value).toBeNull();
    });
  });

  // ============================================================
  // Feature: 计算属性
  // ============================================================
  describe("computed properties", () => {
    it("should return hasProjects as false when no projects", () => {
      // Given: 项目列表为空
      projectsComposable.resetProject();

      // When: 访问 hasProjects
      // Then: 应返回 false
      expect(projectsComposable.hasProjects.value).toBe(false);
    });

    it("should return correct projectCount", () => {
      // Given: 项目列表为空
      projectsComposable.resetProject();

      // When: 访问 projectCount
      // Then: 应返回 0
      expect(projectsComposable.projectCount.value).toBe(0);
    });
  });

  // ============================================================
  // Feature: 根据 ID 获取项目
  // ============================================================
  describe("getProjectById", () => {
    it("should return null when project not found", () => {
      // Given: 项目列表为空
      projectsComposable.resetProject();

      // When: 查询不存在的项目
      const result = projectsComposable.getProjectById("non-existent-id");

      // Then: 应返回 null
      expect(result).toBeNull();
    });
  });
});
