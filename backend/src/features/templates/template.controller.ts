import type { Request, Response } from 'express';
import { templateService } from './template.service';
import { asyncHandler } from '@/utils/asyncHandler';
import type { CreateTemplateInput, UpdateTemplateInput, GetTemplatesQuery, CreateFromWorkoutInput } from './template.validation';

export const getTemplates = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const query = req.query as unknown as GetTemplatesQuery;

  const result = await templateService.getTemplates(userId, query);

  res.json({
    success: true,
    data: result.templates,
    pagination: {
      total: result.total,
      page: result.page,
      pages: result.pages,
    },
  });
});

export const getTemplateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const template = await templateService.getTemplateById(id, userId);

  res.json({
    success: true,
    data: template,
  });
});

export const createTemplate = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const data = req.body as CreateTemplateInput;

  const template = await templateService.createTemplate(userId, data);

  res.status(201).json({
    success: true,
    data: template,
  });
});

export const createFromWorkout = asyncHandler(async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  const userId = req.user!.id;
  const data = req.body as CreateFromWorkoutInput;

  const template = await templateService.createFromWorkout(workoutId, userId, data);

  res.status(201).json({
    success: true,
    data: template,
  });
});

export const updateTemplate = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const data = req.body as UpdateTemplateInput;

  const template = await templateService.updateTemplate(id, userId, data);

  res.json({
    success: true,
    data: template,
  });
});

export const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  await templateService.deleteTemplate(id, userId);

  res.json({
    success: true,
    data: { deleted: true },
  });
});

export const getPublicTemplates = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as GetTemplatesQuery;

  const result = await templateService.getPublicTemplates(query);

  res.json({
    success: true,
    data: result.templates,
    pagination: {
      total: result.total,
      page: result.page,
      pages: result.pages,
    },
  });
});
