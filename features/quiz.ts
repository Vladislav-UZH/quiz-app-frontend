export function useQuizFeatures() {
  const { $api } = useNuxtApp();
  const quizStore = useQuizStore();

  const quizApi = $api.quiz;

  const quiz = {
    getAll: async () => {
      const quizzes = await quizApi.getAllQuizzes();

      quizStore.quizzes = quizzes;
    },
    create: async ({ title }) => {
      const newQuiz = await quizApi.createQuiz({ title });

      quizStore.addQuiz(newQuiz);

      return newQuiz;
    },
    update: async () => {},
    delete: async () => {},
  };

  const question = {
    getAll: async (quizStackId: number) => {
      const questions = await quizApi.getAllQuestionsByQuizId({ quizStackId });

      const quiz = quizStore.getQuiz(quizStackId);
    },

    create: async ({ quizStackId, text }) => {
      const newQuestion = await quizApi.createQuestion({ quizStackId, text });
      quizStore.addQuestion(quizStackId, newQuestion);
    },

    update: async () => {},
    delete: async () => {},
  };

  const option = {
    getAll: async () => {},
    create: async ({ questionId, text, correct = false }) => {},
    update: async () => {},
    delete: async () => {},
  };

  return {
    option,
    question,
    quiz,
  };
}
