import { createSingleSelect } from '@/controllers/quiz.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class QuizRoute implements Routes {
  public path = '/quiz';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/single-select', createSingleSelect);
  }
}
