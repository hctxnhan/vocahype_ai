import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { QuizRoute } from './routes/quiz.route';

ValidateEnv();

const app = new App([new QuizRoute()]);

app.listen();
