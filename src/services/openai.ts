import OpenAI from 'openai';

let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!openai) {
    throw new Error('OpenAI client not initialized');
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};