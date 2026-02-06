/**
 * useCloudStorage BDD 测试
 * 测试云存储同步 Composable 的核心功能
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
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

// Mock useProjects
vi.mock("../useProjects", () => ({
  useProjects: vi.fn(() => ({
    currentProject: { value: { id: "test-project-id" } },
  })),
}));

// 导入被测模块（需在 mock 之后）
import { useCloudStorage } from "../useCloudStorage";

describe("useCloudStorage", () => {
  let cloudStorage: ReturnType<typeof useCloudStorage>;

  beforeEach(() => {
    cloudStorage = useCloudStorage();
    // 重置同步状态
    cloudStorage.resetSyncState();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================
  // Feature: 脏数据标记
  // ============================================================
  describe("markNodeDirty", () => {
    it("should add node ID to dirty set", () => {
      // Given: 脏数据集为空
      cloudStorage.resetSyncState();

      // When: 标记节点为脏
      cloudStorage.markNodeDirty("node-1");

      // Then: 待同步数量应增加
      const pending = cloudStorage.getPendingChanges();
      expect(pending.dirtyNodes).toBeGreaterThan(0);
    });
  });

  describe("markEdgeDirty", () => {
    it("should add edge ID to dirty set", () => {
      // Given: 脏数据集为空
      cloudStorage.resetSyncState();

      // When: 标记边为脏
      cloudStorage.markEdgeDirty("edge-1");

      // Then: 待同步数量应增加
      const pending = cloudStorage.getPendingChanges();
      expect(pending.dirtyEdges).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // Feature: 删除标记
  // ============================================================
  describe("markNodeDeleted", () => {
    it("should add node ID to deleted set and remove from dirty", () => {
      // Given: 节点已被标记为脏
      cloudStorage.markNodeDirty("node-to-delete");

      // When: 标记节点为已删除
      cloudStorage.markNodeDeleted("node-to-delete");

      // Then: 应从脏数据集移至删除集
      const pending = cloudStorage.getPendingChanges();
      expect(pending.deletedNodes).toBeGreaterThan(0);
    });
  });

  describe("markEdgeDeleted", () => {
    it("should add edge ID to deleted set and remove from dirty", () => {
      // Given: 边已被标记为脏
      cloudStorage.markEdgeDirty("edge-to-delete");

      // When: 标记边为已删除
      cloudStorage.markEdgeDeleted("edge-to-delete");

      // Then: 应从脏数据集移至删除集
      const pending = cloudStorage.getPendingChanges();
      expect(pending.deletedEdges).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // Feature: 状态重置
  // ============================================================
  describe("resetSyncState", () => {
    it("should clear all dirty and deleted sets", () => {
      // Given: 存在脏数据和删除标记
      cloudStorage.markNodeDirty("node-1");
      cloudStorage.markEdgeDirty("edge-1");
      cloudStorage.markNodeDeleted("node-2");

      // When: 重置同步状态
      cloudStorage.resetSyncState();

      // Then: 所有待同步数据应清空
      const pending = cloudStorage.getPendingChanges();
      expect(pending.dirtyNodes).toBe(0);
      expect(pending.dirtyEdges).toBe(0);
      expect(pending.deletedNodes).toBe(0);
      expect(pending.deletedEdges).toBe(0);
    });
  });

  // ============================================================
  // Feature: 获取待同步数量
  // ============================================================
  describe("getPendingChanges", () => {
    it("should return correct counts for all categories", () => {
      // Given: 添加多种类型的待同步数据
      cloudStorage.resetSyncState();
      cloudStorage.markNodeDirty("node-1");
      cloudStorage.markNodeDirty("node-2");
      cloudStorage.markEdgeDirty("edge-1");
      cloudStorage.markNodeDeleted("node-3");

      // When: 获取待同步数量
      const pending = cloudStorage.getPendingChanges();

      // Then: 各类别数量正确
      expect(pending.dirtyNodes).toBe(2);
      expect(pending.dirtyEdges).toBe(1);
      expect(pending.deletedNodes).toBe(1);
    });
  });
});
