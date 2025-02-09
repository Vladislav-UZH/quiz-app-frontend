import type { BaseApi } from ".";
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

export class QuizApi {
  constructor(private baseApi: BaseApi) {}

  async createQuiz({ title }) {
    return this.baseApi.POST<Quiz>({
      path: "/api/quizzes",
      data: { title },
    });
  }
  async getAllQuizzes() {
    return this.baseApi.GET<Quiz[]>({
      path: "/api/quizzes ",
    });
  }
  async getOneQuiz(id: number) {
    return this.baseApi.GET<Quiz>({
      path: `/api/quizzes/${id}`,
    });
  }
  //   async deleteQuiz() {}

  async createQuestion({ quizStackId, text }) {
    return this.baseApi.POST<Question>({
      path: "/api/questions",
      data: { quizStackId, text },
    });
  }
  async getAllQuestionsByQuizId({ quizStackId }) {
    return this.baseApi.GET<Question[]>({
      path: `/api/questions/by-quiz/${quizStackId}`,
    });
  }

  async getQuestion(id: number) {
    return this.baseApi.GET<Question>({
      path: `/api/questions/${id}`,
    });
  }
  //   async deleteQuestion() {}

  async createOption({ questionId, text, correct }) {
    return this.baseApi.POST<Option>({
      path: "/api/options",
      data: { questionId, text, correct },
    });
  }
  async getAllOptionsByQuestionId({ questionId }) {
    return this.baseApi.GET<Option[]>({
      path: `/api/options/by-question/${questionId}`,
    });
  }

  //   async getOption() {}
  //   async deleteOption() {}
}
