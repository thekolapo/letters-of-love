<template>
	<div class="home">
		<p class="u-font-normal">
			Send beautiful letters to loved ones&nbsp;
			<span class="u-font-style-normal">🌺️</span>
		</p>
		<div class="home__letters">
			<p class="home__letters-title">Featured Letters</p>
			<div class="home__letters-list">
				<div class="home__letter">
					<nuxt-link to="letter/mama" class="u-font-normal">Love from Kolapo</nuxt-link>
					<div class="home__letter-date">12 hours ago</div>
				</div>
				<div class="home__letter">
					<nuxt-link to="letter/mama" class="u-font-normal">I love you mama</nuxt-link>
					<div class="home__letter-date">2 days ago</div>
				</div>
			</div>
		</div>
		<nuxt-link :to="{name: 'new-letter'}" class="c-button c-button--add">+</nuxt-link>
	</div>
</template>
  
<script setup>
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
		a {
			transition: 0.3s color linear;
			text-decoration: none;
			color: inherit;

			&:hover {
				color: white;
			}
		}

		&-date {
			margin-top: 12px;
			color: var(--color-gray);

      @media screen and (max-width: 480px) {
        margin-top: 8px;
      }
		}
	}
}
</style>