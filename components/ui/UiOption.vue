<script lang="ts" setup>
import IconTrue from "../../../../public/svg/icon_true.svg";
import IconFalse from "../../../../public/svg/icon_false.svg";

const props = defineProps<{
  data: object;
  id: number;
  text: string;
  isTrue: boolean;
}>();

const { $api } = useNuxtApp();
const quizStore = useQuizStore();
const quizApi = $api.quiz;
async function handleDelete() {
  try {
    await quizApi.deleteOption(props.id);

    const options = await quizApi.getAllOptionsByQuestionId(props.data);
    const idx = quizStore.currentQuiz.questions.findIndex(
      (q) => q.id === props.data.questionId
    );
    quizStore.currentQuiz.questions[idx].options = options;
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="point-item">
    <div class="point-info">
      <span class="point-circle"></span>
      <p class="point-text">{{ text }}</p>
    </div>
    <div style="display: flex; align-items: center; gap: 40px">
      <UiButton @click="handleDelete">Delete</UiButton>
      <span>
        <IconTrue v-if="isTrue" class="icon-true" viewBox="0 0 20 20" />
        <IconFalse v-else class="icon-false" width="20" height="20" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.point-item {
  display: flex;
  justify-content: space-between;
  padding: var(--indent__xl);
  border-radius: 8px;
  background-color: var(--color__dark--light);
}
.point-info {
  display: flex;
  align-items: center;
  gap: var(--indent__l);
}
.point-text {
}

.point-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: pink;
}

.icon-true {
  /* fill: green; */
  stroke: green;
}
.icon-false {
  fill: rgb(151, 21, 21);
}
</style>
