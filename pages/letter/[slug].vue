<template>
	<div class="letter">
		<p class="u-font-normal">
			A love letter from John Doe&nbsp;
			<span class="u-font-style-normal">🌺️</span>
		</p>
		<textarea ref="textArea" class="letter__body u-font-md" readonly>Jane Doe,

I’ll love you to the end of time and till my dying breath. When I’m with you, life is perfect and time ceases to exist. 

Love from,
John Doe
		</textarea>
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
</style>