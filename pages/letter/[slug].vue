<template>
  <div class="letter">
    <p class="u-font-normal">
      {{ letter.title }}&nbsp;
      <!-- <span class="u-font-style-normal">🌺️</span> -->
    </p>
    <textarea
      ref="textArea"
      class="letter__body u-font-md"
      readonly
      v-model="letter.body"
    />
  </div>
</template>

<script setup>
import { useAsyncData, useRoute, useSeoMeta } from "#app";
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/api";
import cryptography from "~/utils/cryptography";

const api = useApi();
const route = useRoute();
const textArea = ref(null);

const autoResize = (textarea) => {
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const {
  data: letter,
  pending,
  error,
} = await useAsyncData("letterData", async () => {
  const slug = route.params.slug;
  const response = await api.fetchLetter(slug);

  const letterData = response.data;
  // const decryptedBody = await cryptography.decrypt(letterData.body);
  // letterData.body = decryptedBody.replace(/\\n/g, "\n");
  return letterData;
});

useSeoMeta({
  title: () => letter.value?.title || "Letters of Love",
  description: () => {
    const body = letter.value?.body || "";
    return body.length > 120 ? body.slice(0, 120) + "..." : body;
  },
});

onMounted(() => {
  if (textArea.value) autoResize(textArea.value);
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/pages/letter.scss";
</style>
