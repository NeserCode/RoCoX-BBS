<script lang="ts" setup>
import {
	ExclamationTriangleIcon,
	InformationCircleIcon,
	ChatBubbleBottomCenterTextIcon,
} from "@heroicons/vue/24/outline"
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/vue/24/solid"

const $props = withDefaults(
	defineProps<{
		open: boolean
		text?: string
		type?: "warn" | "info" | "error" | "success" | "text"
		duration?: number
	}>(),
	{
		open: false,
		text: "Toast Here",
		type: "info",
		duration: 3000,
	}
)

function isIconShouldShow(
	key: "warn" | "info" | "error" | "success" | "text"
): boolean {
	return $props.type === key
}

const trigger = ref(false)
const trending = ref(false)
const timer = ref<NodeJS.Timeout | null>(null)

watch(
	() => $props.open,
	(value) => {
		trigger.value = true
		if (!value && trending.value) trigger.value = false

		trending.value = true
	}
)

watch(trigger, (_value) => {
	if (timer.value) {
		clearTimeout(timer.value)
		timer.value = null
	}

	timer.value = setTimeout(() => {
		trigger.value = false

		trending.value = false
		clearTimeout(timer.value!)
		timer.value = null
	}, $props.duration)
})
</script>

<template>
	<Transition name="toast-fade" mode="out-in" appear>
		<div :class="['toast', type]" v-if="trigger">
			<span class="icon">
				<CheckCircleIcon v-if="isIconShouldShow('success')" class="icon-body" />
				<ExclamationTriangleIcon
					v-else-if="isIconShouldShow('warn')"
					class="icon-body"
				/>
				<ExclamationCircleIcon
					v-else-if="isIconShouldShow('error')"
					class="icon-body"
				/>
				<InformationCircleIcon
					v-else-if="isIconShouldShow('info')"
					class="icon-body"
				/>
				<ChatBubbleBottomCenterTextIcon
					v-else-if="isIconShouldShow('text')"
					class="icon-body"
				/>
			</span>
			<span class="text">{{ text }}</span>
		</div>
	</Transition>
</template>

<style lang="postcss" scoped>
.toast {
	@apply w-fit h-max fixed top-12 left-1/2 inline-flex justify-between items-center px-2 py-1 space-x-2
  rounded-md border-2 border-gray-300 bg-cyan-100
  dark:border-gray-400 dark:bg-cyan-900
  -translate-x-1/2 transform z-50 overflow-hidden select-none outline-none shadow-lg
  transition-all ease-in-out duration-300;
}
.toast.error {
	@apply border-red-300 bg-cyan-100
  dark:border-red-400 dark:bg-cyan-900;
}
.toast.warn {
	@apply border-yellow-300 bg-cyan-100
  dark:border-yellow-400 dark:bg-cyan-900;
}
.toast.info {
	@apply border-sky-300 bg-cyan-100
  dark:border-sky-400 dark:bg-cyan-900;
}
.toast.success {
	@apply border-green-300 bg-cyan-100
  dark:border-green-400 dark:bg-cyan-900;
}

.toast .icon,
.toast .text {
	@apply inline-flex justify-center items-center w-fit h-full
  text-cyan-700 dark:text-cyan-300
  transition-all ease-in-out duration-300;
}

.toast .icon .icon-body {
	@apply inline-block w-5 h-5;
}

.toast.error .icon .icon-body {
	@apply text-red-300 dark:text-red-400;
}
.toast.warn .icon .icon-body {
	@apply text-yellow-300 dark:text-yellow-400;
}
.toast.info .icon .icon-body {
	@apply text-sky-300 dark:text-sky-400;
}
.toast.success .icon .icon-body {
	@apply text-green-300 dark:text-green-400;
}

.toast .text {
	@apply inline-block w-full h-full max-w-sm
  text-sm font-medium font-mono truncate;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
	@apply transition-all ease-in-out duration-300;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
	@apply opacity-0 transform -translate-y-6;
}
</style>
