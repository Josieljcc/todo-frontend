import { z } from 'zod';

/**
 * Create tag form validation schema
 */
export const createTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be at most 50 characters'),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format')
    .optional(),
});

export type CreateTagFormData = z.infer<typeof createTagSchema>;

/**
 * Update tag form validation schema
 */
export const updateTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be at most 50 characters'),
  color: z.string().optional(),
});

export type UpdateTagFormData = z.infer<typeof updateTagSchema>;
