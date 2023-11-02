<script setup>
import { FireIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<div class="loading">
		<FireIcon class="icon" />
	</div>
</template>

<style lang="postcss" scoped>
.loading {
	@apply flex items-center justify-center w-full h-screen;
}

.icon {
	@apply inline-flex w-8 h-8
  animate-pulse;
}
</style>
