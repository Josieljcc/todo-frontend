import { z } from 'zod';

/**
 * Create comment form validation schema
 */
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment is required')
    .max(1000, 'Comment must be at most 1000 characters'),
  task_id: z.number().min(1, 'Task ID is required'),
});

export type CreateCommentFormData = z.infer<typeof createCommentSchema>;

/**
 * Update comment form validation schema
 */
export const updateCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment is required')
    .max(1000, 'Comment must be at most 1000 characters'),
});

export type UpdateCommentFormData = z.infer<typeof updateCommentSchema>;
