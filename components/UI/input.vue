<script lang="ts" setup>
const $props = withDefaults(
	defineProps<{
		modelValue: string
		label?: string
		placeholder?: string
		type?: string
		labelFor?: string
	}>(),
	{
		modelValue: "",
		placeholder: "",
		type: "text",
	}
)
const $emit = defineEmits(["update:modelValue"])
const inputValue = useVModel($props, "modelValue", $emit)
</script>

<template>
	<div class="custom-input">
		<label v-if="label" class="input-label" :for="labelFor">{{
			$props.label
		}}</label>
		<input
			:id="labelFor"
			v-model="inputValue"
			class="input-body"
			:type="type"
			:placeholder="placeholder"
		/>
	</div>
</template>

<style lang="postcss" scoped>
.custom-input {
	@apply inline-flex flex-col justify-center items-start mt-2
  space-y-1;
}
.custom-input:first-child {
	@apply m-0;
}

.input-label {
	@apply inline-flex w-full text-sm font-thin tracking-wider
  truncate;
}

.input-body {
	@apply inline-flex justify-center items-center
  rounded border-2 active:ring-2 shadow-md outline-none text-base tracking-normal
  border-sky-300 focus:ring-sky-400 active:ring-sky-400
  dark:border-green-600 dark:focus:ring-green-400 dark:active:ring-green-400
  bg-cyan-50 dark:bg-cyan-950
  transition-all ease-in-out duration-300;
}
</style>
