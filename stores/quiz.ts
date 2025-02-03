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

  function synchronize(context, value) {
    context = value;
  }

  function addQuiz(quiz: Quiz) {}
  function updateQuiz(id: number, data) {}
  function getQuiz(id: number) {}
  function deleteQuiz(id: number) {}
  function updateCurrentQuiz(data) {}

  function addQuestion(question: Question) {}
  function updateQuestion(quizStackId: number, data) {}
  function updateCurrentQuestion(data) {}

  return {
    quizzes,
    currentQuiz,
    currentQuestion,

    quiz: {},
    question: {},
    option: {},
  };
});
