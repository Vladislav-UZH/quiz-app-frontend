import type { BaseApi } from "./base";

type GameQuestion = {};
type Game = {
  id: number;
  quizTime: number;
  quizStackId: number;
  currentQuestionId: number;
  currentQuestionStartTime: number;

  score: number;
};
export class GameApi {
  constructor(private readonly baseApi: BaseApi) {}

  async getGameById(id: number) {
    return this.baseApi.GET<Game>({ path: `/api/quiz-sessions/${id}` });
  }

  async createGame({ quizTime, quizStackId }) {
    const game = { quizTime, quizId: quizStackId };

    return this.baseApi.POST<Game>({
      path: "/api/quiz-sessions/create-room",
      data: game,
    });
  }

  async startQuestion({ roomId, currentQuestionId, currentQuestionStartTime }) {
    const question = {
      id: roomId,
      currentQuestionId,
      currentQuestionStartTime,
    };
    return this.baseApi.POST({
      path: "/api/quiz-sessions/question-start",
      data: question,
    });
  }
  async endQuestion({ roomId, currentQuestionId, finishTime, correct }) {
    const question = {
      id: roomId,
      currentQuestionId,
      finishTime,
      correct,
    };
    return this.baseApi.POST({
      path: "/api/quiz-sessions/question-end",
      data: question,
    });
  }
}
