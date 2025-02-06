import type { BaseApi } from ".";

export class QuizApi {
  constructor(private baseApi: BaseApi) {}

  async createQuiz({ title }) {
    return this.baseApi.POST<{ id: number }>({
      path: "/api/quizzes",
      data: { title },
    });
  }
  async getAllQuizzes() {
    return this.baseApi.GET<{ id: number; title: string; questions: [] }[]>({
      path: "/api/quizzes ",
    });
  }
  async getOneQuiz(id: number) {
    return this.baseApi.GET<{ id: number; title: string; questions: [] }>({
      path: `/api/quizzes/${id}`,
    });
  }
  //   async deleteQuiz() {}

  async createQuestion({ quizStackId, text }) {
    return this.baseApi.POST<{
      id: number;
      quizStackId: number;
      text: string;
      options: [];
    }>({
      path: "/api/questions",
      data: { quizStackId, text },
    });
  }
  async getAllQuestionsByQuizId({ quizStackId }) {
    return this.baseApi.GET({ path: `/api/questions/by-quiz/${quizStackId}` });
  }

  //   async getQuestion() {}
  //   async deleteQuestion() {}

  async createOption({ questionId, text, correct }) {
    return this.baseApi.POST<{
      id: number;
      text: string;
      correct: boolean;
      questionId: number;
    }>({
      path: "/api/options",
      data: { questionId, text, correct },
    });
  }
  async getAllOptionsByQuestionId({ questionId }) {
    return this.baseApi.GET<
      {
        id: number;
        text: string;
        correct: boolean;
        questionId: number;
      }[]
    >({ path: `/api/options/by-question/${questionId}` });
  }

  //   async getOption() {}
  //   async deleteOption() {}
}
