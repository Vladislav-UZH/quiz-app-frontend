type Option = {
  id: number;
  questionId: number;
  text: string;
  correct: boolean;
};
type Question = {
  id: number;
  quizStackId: number;
  text: string;
  options: Option[];
};
type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

export const useQuizStore = defineStore("quiz", () => {
  const currentQuiz = ref<Quiz>({
    id: 0,
    title: "",
    questions: [],
  });

  const currentQuestion = ref<Question>({
    id: 0,
    quizStackId: 0,
    text: "",
    options: [],
  });

  const quizzes = ref<Quiz[]>([]);

  function _synchronize(
    context: object | object[],
    value: object,
    id?: number
  ) {
    if (!id) {
      context = value;
      return;
    }

    if (id) {
      context = (context as object[]).map((el) => {
        if (el.id === id) {
          el = value;
        }
        return el;
      });
    }
  }

  function addQuiz(quiz: Quiz) {
    quizzes.value.push(quiz);
  }

  function getQuiz(id: number) {
    return quizzes.value.find((el) => el.id === id);
  }
  function deleteQuiz(id: number) {
    quizzes.value = quizzes.value.filter((el) => el.id !== id);
  }

  function updateCurrentQuiz(id: number, data: Partial<Quiz>) {
    currentQuiz.value = { ...currentQuiz.value, ...data };

    _synchronize(quizzes, data, id);
  }

  function addQuestion(question: Question) {
    quizzes.value = quizzes.value.map((el) => {
      if (el.id === question.quizStackId) {
        el.questions.push(question);

        if (question.quizStackId === currentQuiz.value.id) {
          _synchronize(currentQuiz.value.questions, el.questions);
        }
      }
      return el;
    });
  }

  function updateCurrentQuestion(quizStackId: number, data: Partial<Question>) {
    currentQuestion.value = { ...currentQuestion.value, ...data };

    _synchronize(quizzes.value, data, quizStackId);
  }

  return {
    quizzes,
    currentQuiz,
    currentQuestion,

    quiz: { addQuiz, getQuiz, deleteQuiz, updateCurrentQuiz },
    question: { addQuestion, updateCurrentQuestion },
    option: {},
  };
});
