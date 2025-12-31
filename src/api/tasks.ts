import { apiClient } from "./apiClient";
import type { components, paths } from "./types";

/**
 * Tasks API Service
 * Handles task-related API calls
 */

// Type definitions
type Task = components["schemas"]["models.Task"];
type CreateTaskRequest = components["schemas"]["handlers.CreateTaskRequest"];
type UpdateTaskRequest = components["schemas"]["handlers.UpdateTaskRequest"];
type PaginatedTasksResponse =
  components["schemas"]["services.PaginatedTasksResponse"];

/**
 * Get all tasks with pagination and filters
 * @param params - Query parameters
 * @returns Paginated tasks response
 */
export const getTasks = async (params?: {
  page?: number;
  limit?: number;
  type?: "casa" | "trabalho" | "lazer" | "saude";
  completed?: boolean;
  search?: string;
  due_date_from?: string;
  due_date_to?: string;
  period?: "overdue" | "today" | "this_week" | "this_month";
  assigned_by?: number;
  sort_by?: "created_at" | "due_date" | "title";
  order?: "asc" | "desc";
}): Promise<PaginatedTasksResponse> => {
  const response = await apiClient.get<
    paths["/tasks"]["get"]["responses"]["200"]["content"]["application/json"]
  >("/tasks", { params });

  return response.data;
};

/**
 * Get a single task by ID
 * @param id - Task ID
 * @returns Task data
 */
export const getTask = async (id: number): Promise<Task> => {
  const response = await apiClient.get<
    paths["/tasks/{id}"]["get"]["responses"]["200"]["content"]["application/json"]
  >(`/tasks/${id}`);

  return response.data;
};

/**
 * Create a new task
 * @param taskData - Task creation data
 * @returns Created task
 */
export const createTask = async (
  taskData: CreateTaskRequest
): Promise<Task> => {
  const response = await apiClient.post<
    paths["/tasks"]["post"]["responses"]["201"]["content"]["application/json"]
  >("/tasks", taskData);

  return response.data;
};

/**
 * Update a task
 * @param id - Task ID
 * @param taskData - Task update data
 * @returns Updated task
 */
export const updateTask = async (
  id: number,
  taskData: UpdateTaskRequest
): Promise<Task> => {
  const response = await apiClient.put<
    paths["/tasks/{id}"]["put"]["responses"]["200"]["content"]["application/json"]
  >(`/tasks/${id}`, taskData);

  return response.data;
};

/**
 * Delete a task
 * @param id - Task ID
 * @returns Success response
 */
export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
