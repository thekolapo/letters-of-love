<template>
	<div class="letter">
		<p class="u-font-normal">
			Your letter has been successfully sent &nbsp;
			<span class="u-font-style-normal">🎉</span>
		</p>
		<p class="letter__body u-font-md">The link to your letter has been sent to your email and the recipient's email as well. Click 	<nuxt-link to="letter/mama">here</nuxt-link> to view and copy your letter link.
			<br/><span class="letter__closing">I hope it brings your warmth.</span>
		</p>
		<p class="u-font-sm letter__project-credit">This little project was made with love by <a href="https://twitter.com/kolapo_" target="_blank">Kolapo</a> & <a href="https://read.cv/dideoluwa" target="_blank">Darasimi</a>&nbsp; <span class="u-font-style-normal">♥️</span></p>
	</div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const textArea = ref(null);

const autoResize = (textarea) => {
	textarea.style.height = `${textarea.scrollHeight}px`;
}

onMounted(() => {
	if(textArea.value) autoResize(textArea.value);
});
</script>
  
<style lang="scss" scoped>
@use "@/assets/scss/pages/letter.scss";

.letter {
	a {
		color: inherit;
	}

	&__body {
		min-height: unset;
	}

	&__closing {
		display: inline-block;
		margin-top: 50px;
	}

	&__project-credit {
		margin-top: 150px;
	}
}
</style>