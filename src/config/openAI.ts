import OpenAI from 'openai';
import { OPENAI_SECRET_KEY } from '.';

const openAI = new OpenAI({
  apiKey: OPENAI_SECRET_KEY,
});

export default openAI;
