<template>
	<div class="letter">
		<form action="" class="letter__form">
			<input 
				type="text" 
				placeholder="Letter & Email title – A love letter from John Doe"
				class="letter__title u-font-normal"
				autofocus
				required
				/>
			<textarea 
				ref="textArea" 
				class="letter__body u-font-md" 
				:placeholder="textAreaPlaceholder"
				v-model="textAreaContent"
				@input="autoResizeTextArea()"
				required
			/>
			<button class="c-button c-button--next">
				<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.0279 9.20779C16.0279 9.16398 16.0279 9.14208 16.0065 9.09827C15.9851 8.7259 15.8351 8.35352 15.5566 8.09067L8.74365 1.10323C8.57225 0.927993 8.31516 0.927993 8.14377 1.10323C7.97237 1.27846 7.97237 1.54131 8.14377 1.71655L14.9567 8.70399C14.9781 8.7259 14.9781 8.7478 14.9996 8.7697H1.24514C1.00947 8.7697 0.81665 8.96684 0.81665 9.20779C0.81665 9.44874 1.00947 9.64587 1.24514 9.64587H14.9996C14.9781 9.66778 14.9781 9.68968 14.9567 9.71159L8.12234 16.6771C7.95095 16.8524 7.95095 17.1152 8.12234 17.2904C8.20804 17.3781 8.31516 17.4219 8.42228 17.4219C8.52941 17.4219 8.63653 17.3781 8.72223 17.2904L15.5566 10.303C15.8137 10.0401 15.9851 9.66778 16.0065 9.29541C16.0279 9.2735 16.0279 9.2516 16.0279 9.20779Z" fill="white"/>
				</svg>
			</button>
		</form>
	</div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';

const textArea = ref(null);
const textAreaPlaceholder = "Jane Doe,\n\nI’ll love you to the end of time and till my dying breath. When I’m with you, life is perfect and time ceases to exist.\n\nLove from,\nJohn Doe";
const textAreaContent = ref("");

const autoResizeTextArea = () => {
	if(textArea.value) {
		const textarea = textArea.value;
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
}

onMounted(() => {
	autoResizeTextArea();
});
</script>
  
<style lang="scss" scoped>
@use "@/assets/scss/pages/letter.scss";
</style>