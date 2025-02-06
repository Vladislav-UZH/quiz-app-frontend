export function useQuizFeatures() {
  const { $api } = useNuxtApp();
  const quizStore = useQuizStore();

  const quizApi = $api.quiz;

  const quiz = {
    getAll: async () => {
      const quizzes = await quizApi.getAllQuizzes();

      quizStore.quizzes = quizzes;
      console.log(quizStore.quizzes);
    },
    create: async ({ title }) => {
      const newQuiz = await quizApi.createQuiz({ title });

      quizStore.quiz.addQuiz(newQuiz);

      return newQuiz;
    },
    update: async () => {},
    delete: async () => {},
  };

  const question = {
    getAll: async (quizStackId: number) => {
      const questions = await quizApi.getAllQuestionsByQuizId({ quizStackId });

      const quiz = quizStore.quiz.getQuiz(quizStackId);
    },

    create: async ({ quizStackId, text }) => {
      const newQuestion = await quizApi.createQuestion({ quizStackId, text });

      quizStore.question.addQuestion(newQuestion);
    },

    update: async () => {},
    delete: async () => {},
  };

  const option = {
    getAll: async () => {},
    create: async ({ quizStackId, questionId, text, correct = false }) => {
      const option = await quizApi.createOption({
        questionId,
        text,
        correct,
      });

      if (quizStore.currentQuestion.id === questionId) {
        quizStore.currentQuestion.options.push(option);
      }
      quizStore.option.addOption(quizStackId, option);
    },
    update: async () => {},
    delete: async () => {},
  };

  return {
    option,
    question,
    quiz,
  };
}
