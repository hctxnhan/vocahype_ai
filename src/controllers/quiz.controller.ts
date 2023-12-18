import openAI from '@/config/openAI';
import z from 'zod';

const singleSelectQuiz = z.object({
  typeOfQuiz: z.enum(['Definition', 'Synonym/Antonym', 'Word usage in context', 'Word meaning in sentence']),
  level: z.enum(['easy', 'medium', 'hard', 'extreme']),
  word: z.string(),
  question: z.string().optional(),
});
export async function createSingleSelect(req, res) {
  const reqBody = req.body;
  const result = singleSelectQuiz.safeParse(reqBody);

  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid request body',
      details: (result as any).error.issues,
    });
  }

  const { word, typeOfQuiz, question, level } = result.data;

  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'system',
        content: `You are helpful assistant that generates quiz based for a English words in Vocabulary learning app. Provide your answer in JSON structure like this {"question":"<Auto generate the question title of the quiz>","options":["<option 1>","<option 2>","<option 3>","<option 4>"],"answer":"<the index number of the correct answer>"}. Each option is answer based on the quiz type with the chosen difficulty to challenge user without indicate A, B, C, D.`,
      },
      {
        role: 'user',
        content: `{"question":"${question}"?", "difficulty_of_answer":"${level}", correctAnswer: "${word}", "typeOfQuiz": "${typeOfQuiz}`,
      },
    ],
  });

  const responseText = completion.choices[0].message.content;

  const response = JSON.parse(responseText);

  return res.json(response);
}
