<template>
	<div class="letter">
		<form
			v-if="activeView === View.LETTER"
			@submit.prevent="switchView(View.DELIVERY_DETAILS)" 
			class="letter__writeform"
		>
			<input 
				type="text" 
				placeholder="A love letter from John Doe"
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
			<button type="submit" class="c-button c-button--next">
				<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.0279 9.20779C16.0279 9.16398 16.0279 9.14208 16.0065 9.09827C15.9851 8.7259 15.8351 8.35352 15.5566 8.09067L8.74365 1.10323C8.57225 0.927993 8.31516 0.927993 8.14377 1.10323C7.97237 1.27846 7.97237 1.54131 8.14377 1.71655L14.9567 8.70399C14.9781 8.7259 14.9781 8.7478 14.9996 8.7697H1.24514C1.00947 8.7697 0.81665 8.96684 0.81665 9.20779C0.81665 9.44874 1.00947 9.64587 1.24514 9.64587H14.9996C14.9781 9.66778 14.9781 9.68968 14.9567 9.71159L8.12234 16.6771C7.95095 16.8524 7.95095 17.1152 8.12234 17.2904C8.20804 17.3781 8.31516 17.4219 8.42228 17.4219C8.52941 17.4219 8.63653 17.3781 8.72223 17.2904L15.5566 10.303C15.8137 10.0401 15.9851 9.66778 16.0065 9.29541C16.0279 9.2735 16.0279 9.2516 16.0279 9.20779Z" fill="white"/>
				</svg>
			</button>
		</form>
		<form
			v-if="activeView === View.DELIVERY_DETAILS"
			@submit.prevent="handleLetterSend()" 
			class="letter__sendform"
		>
			<button @click="switchView(View.LETTER)" type="button" class="letter__sendform-backbtn u-font-sm">
				<svg width="28" height="6" viewBox="0 0 28 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.752434 2.75251C0.615751 2.8892 0.615751 3.1108 0.752434 3.24749L2.97982 5.47487C3.1165 5.61156 3.33811 5.61156 3.4748 5.47487C3.61148 5.33819 3.61148 5.11658 3.4748 4.9799L1.4949 3L3.4748 1.0201C3.61148 0.883418 3.61148 0.66181 3.4748 0.525126C3.33811 0.388443 3.1165 0.388443 2.97982 0.525126L0.752434 2.75251ZM27.374 2.65L0.999922 2.65V3.35L27.374 3.35V2.65Z" fill="#B9B9B9"/>
				</svg>
				<span>Back</span>
			</button>
			<div class="letter__sendform-field">
				<p class="u-font-sm">Enter your email to get the letter link *</p>
				<input 
					type="email" 
					placeholder="janedoe@email.com"
					class="u-font-normal"
					required
				>
			</div>
			<div class="letter__sendform-field">
				<p class="u-font-sm">Enter recipient email (optional)</p>
				<input 
					v-model="recipientEmail"
					type="email" 
					placeholder="johndoe@email.com"
					class="u-font-normal"
				>
			</div>
			<div
				v-if="!isSenderNameFieldHidden"
				class="letter__sendform-field"
			>
				<p class="u-font-sm">Enter your name *</p>
				<input
					v-model="senderName"
					type="text" 
					placeholder="So recipient can know who it's coming from"
					class="u-font-normal"
					required
				>
			</div>
			<div class="letter__sendform-field letter__sendform-field--checkbox">
				<span class="u-font-sm">Feature letter on homepage</span>
				<input 
					type="checkbox" 
					class="u-font-normal"
				>
			</div>
			<button type="submit" class="c-button c-button--next">
				<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.0279 9.20779C16.0279 9.16398 16.0279 9.14208 16.0065 9.09827C15.9851 8.7259 15.8351 8.35352 15.5566 8.09067L8.74365 1.10323C8.57225 0.927993 8.31516 0.927993 8.14377 1.10323C7.97237 1.27846 7.97237 1.54131 8.14377 1.71655L14.9567 8.70399C14.9781 8.7259 14.9781 8.7478 14.9996 8.7697H1.24514C1.00947 8.7697 0.81665 8.96684 0.81665 9.20779C0.81665 9.44874 1.00947 9.64587 1.24514 9.64587H14.9996C14.9781 9.66778 14.9781 9.68968 14.9567 9.71159L8.12234 16.6771C7.95095 16.8524 7.95095 17.1152 8.12234 17.2904C8.20804 17.3781 8.31516 17.4219 8.42228 17.4219C8.52941 17.4219 8.63653 17.3781 8.72223 17.2904L15.5566 10.303C15.8137 10.0401 15.9851 9.66778 16.0065 9.29541C16.0279 9.2735 16.0279 9.2516 16.0279 9.20779Z" fill="white"/>
				</svg>
			</button>
		</form>
	</div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from 'vue';
import { navigateTo } from '#app';

const textArea = ref(null);
const textAreaPlaceholder = "Jane Doe,\n\nI’ll love you to the end of time and till my dying breath. When I’m with you, life is perfect and time ceases to exist.\n\nLove from,\nJohn Doe";
const textAreaContent = ref("");

const recipientEmail = ref('');
const senderName = ref('');

const View = {
	LETTER: 'letter',
	DELIVERY_DETAILS: 'delivery_details'
};

const activeView = ref(View.DELIVERY_DETAILS);

const switchView = (view) => {
	activeView.value = view;
};

const handleLetterSend = () => {
	navigateTo('/letter-success');
}

const autoResizeTextArea = () => {
	if(textArea.value) {
		const textarea = textArea.value;
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
}

const isSenderNameFieldHidden = computed(() => {
  return !recipientEmail.value.trim();
});

onMounted(() => {
	autoResizeTextArea();
});
</script>
  
<style lang="scss" scoped>
@use "@/assets/scss/pages/letter.scss";

.letter{
	&__writeform {
		display: flex;
		flex-direction: column;
	}

	&__sendform {
		&-backbtn {
			--svg-scale: 1;
			display: flex;
			align-items: center;
			gap: 10px;
			background: transparent;
			border: none;
			color: inherit;
			margin-bottom: 50px;

      @media screen and (max-width: 480px) {
        padding: 0;
      }

			&:hover {
				--svg-scale: 1.2
			}

			svg {
				width: 40px;
				height: auto;
				transform: scaleX(var(--svg-scale));
				transform-origin: right;
				transition: 0.8s var(--ease-out-expo);
			}
		}

		&-field {
			display: grid;
			gap: 12px;

			&:not(:last-child) {
				margin-bottom: 45px;
			}

			input {
				width: 100%;
				max-width: 370px;

        @media screen and (max-width: 480px) {
          padding: 0;
        }
			}

			select {
				width: fit-content;
				background: transparent;
				color: inherit;
				border: none;
			}

			&--checkbox {
				display: flex;
				align-items: center;
				gap: 12px;
				font-size: 40px;

				input {
					transform: scale(1.3);
					transform-origin: left;
					border: none;
					outline: none;
					background: transparent;
					width: fit-content;

          @media screen and (max-width: 480px) {
            transform: scale(1.12);
          }
				}
			}
		}
	}
}
</style>