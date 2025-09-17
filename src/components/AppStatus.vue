<template>
	<span :class="['badge', type]">{{ status }}</span>
</template>

<script>
export default {
	props: {
		status: {
			type: String,
			required: true,
			default: 'на распределении',
			validator(value) {
				return [
					'в работе',
					'завершена',
					'отменена',
					'на распределении',
				].includes(value)
			},
		},
	},

	computed: {
		type() {
			// Добавляем проверку на undefined
			if (!this.status) return 'secondary'

			switch (this.status) {
				case 'в работе':
					return 'work'
				case 'завершена':
					return 'end'
				case 'отменена':
					return 'danger'
				case 'на распределении':
					return 'warning'
				default:
					return 'primary'
			}
		},
	},
}
</script>

<style scoped>
.badge {
	padding: 0.2em 0.8em;
	font-size: 14px;
	font-weight: 500;
	border-radius: 6px;

	justify-self: end;
	box-shadow: 2px 2px 2px rgba(96, 96, 96, 0.5);
	transition: all 1s ease-in-out;
}

.primary {
	color: #007bff;
	border: 1px solid #007bff;
}
.work {
	color: #fff;
	background-color: #42b983;
	border: none;
}
.danger {
	background: #ee6262;
	color: #ffffff;
	border: none;
}
.warning {
	border: 1px solid #a0a0a0;
	color: #a0a0a0;
}
.end {
	background: #909090;
	color: #e2e0e0;
	border: none;
}
</style>
