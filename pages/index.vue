<template>
  <div class="home">
    <h1 class="u-font-normal">
      Send beautiful letters to loved ones&nbsp;
      <span class="u-font-style-normal">💌 🌺️</span>
    </h1>
    <section class="home__letters">
      <h2 class="home__letters-title">Featured Letters</h2>
      <ul class="home__letters-list">
        <li
          class="home__letter"
          v-for="(letter, index) in featuredLetters"
          :key="index"
        >
          <nuxt-link
            :to="{ name: 'letter-slug', params: { slug: letter.slug } }"
            class="u-font-normal"
            >{{ letter.title }}</nuxt-link
          >
          <span class="home__letter-date">
            {{ useTimeAgo(letter.createdAt._seconds) }}
          </span>
        </li>
      </ul>
    </section>
    <nuxt-link :to="{ name: 'new-letter' }" class="c-button c-button--add">
      +
    </nuxt-link>
  </div>
</template>

<script setup>
import { useAsyncData } from "#app";
import { useApi } from "~/composables/api";

const api = useApi();

const {
  data: featuredLetters,
  pending,
  error,
  refresh,
} = await useAsyncData("lettersData", async () => {
  const response = await api.fetchFeaturedLetters();
  const featuredLetters = response.data.data;

  return featuredLetters.sort(
    (a, b) => b.createdAt._seconds - a.createdAt._seconds
  );
});

const formatDate = (seconds) => {
  const date = new Date(seconds * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const useTimeAgo = (timestamp) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const time = Number(timestamp); // Ensure it's a number

  if (time > 10000000000) {
    // If the timestamp looks like milliseconds (13+ digits), convert to seconds
    timestamp = Math.floor(time / 1000);
  }

  const seconds = now - timestamp; // Difference in seconds

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
</script>

<style lang="scss" scoped>
.home {
  &__letters {
    margin-top: 80px;

    @media screen and (max-width: 480px) {
      margin-top: 50px;
    }

    &-title {
      text-transform: uppercase;
      // text-decoration: underline;
      color: var(--color-gray);
    }

    &-list {
      display: grid;
      gap: 44px;
      margin-top: 26px;
    }
  }

  &__letter {
    display: grid;
    gap: 12px;

    @media screen and (max-width: 480px) {
      gap: 12px;
    }

    a {
      transition: 0.3s color linear;
      text-decoration: none;
      color: inherit;
      width: fit-content;

      &:hover {
        color: white;
      }
    }

    &-date {
      color: var(--color-gray);
    }
  }
}
</style>
