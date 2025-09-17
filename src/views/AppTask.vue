<template>
	<div v-if="task" class="card-desc">
		<div class="card-desc-title">
			<div class="status-bar">
				<div class="card-desc-attribute">
					<div class="card-desc-attr shadow">
						<svg class="item-icon__logo" aria-label="logo">
							<use :href="spritesSVG + '#person'" />
						</svg>
						<p>
							<strong>{{ task.worker }}</strong>
						</p>
					</div>
					<div class="card-desc-attr shadow">
						<svg class="item-icon__logo" aria-label="logo">
							<use :href="spritesSVG + '#calendar'" />
						</svg>
						<p>
							<strong>{{ task.deadline }}</strong>
						</p>
					</div>
				</div>

				<div class="status">
					<AppSmallLoader v-if="isLoading" />
					<AppStatus :type="task.status" :status="task.status" />
					<button class="close" @click="closeForm">✕</button>
				</div>
			</div>
			<hr />
			<div class="desc-title">
				<h2>{{ task.title }}</h2>
			</div>
		</div>

		<p><strong>Описание:</strong> {{ task.desc }}</p>

		<div class="down_block">
			<div class="select">
				<select
					name="status"
					class="select-bar"
					@change="handleSelectChange($event.target.value)"
				>
					<option value="" disabled selected>Установить статус</option>
					<option value="inProgress">Взять в работу</option>
					<option value="completed">Завершена</option>
					<option value="canceled">Отменена</option>
				</select>
			</div>
			<div class="delete">
				<button class="btn_delete" @click="removeTask">Удалить</button>
			</div>
		</div>
	</div>
	<!-- 
	<h3 v-else class="text-white center">
		Задача с id = <strong>{{ taskId }}</strong> отсутствует.
	</h3> -->
</template>

<script>
import AppStatus from '../components/AppStatus'
import AppSmallLoader from '@/components/AppSmallLoader.vue'
import spritesSVG from '@/assets/img/sprites.svg'
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { fetchData } from '@/helpers/apiHelper'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

export default {
	components: { AppStatus, AppSmallLoader },
	props: {
		id: { type: String, required: true },
	},
	setup(props) {
		const isLoading = ref(false)
		const router = useRouter()
		const store = useStore()
		const toast = useToast()

		const task = computed(
			() => store.state.tasks.find(i => i.id === props.id) || null
		)

		const closeForm = () => router.push('/')

		const handleSelectChange = async function (value) {
			if (!value) return

			try {
				isLoading.value = true

				let newStatusText = ''

				switch (value) {
					case 'inProgress':
						newStatusText = 'в работе'
						break
					case 'completed':
						newStatusText = 'завершена'
						break
					case 'canceled':
						newStatusText = 'отменена'
						break
					default:
						throw new Error('Неверный статус')
				}

				const updatedTask = {
					...task.value,
					status: newStatusText,
				}

				await fetchData(
					`https://vue-task-manager-cb60d-default-rtdb.europe-west1.firebasedatabase.app/tasks/${props.id}.json`,
					'PATCH',
					updatedTask
				)

				setTimeout(() => {
					isLoading.value = false
					store.commit('UPDATE_TASK_STATUS', {
						taskId: task.value.id,
						newStatus: newStatusText,
					})
				}, 600)
			} catch (error) {
				console.error('Ошибка обновления статуса:', error)
			}
		}

		const removeTask = async function () {
			try {
				const taskId = props.id

				await fetchData(
					`https://vue-task-manager-cb60d-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`,
					'DELETE'
				)

				store.commit('REMOVE_TASK', taskId)
				toast.success('Задача успешно удалена', {
					position: 'bottom-right',
					duration: 3000,
				})
				router.push('/')
			} catch (error) {
				console.error('Ошибка:', error)
			}

			isLoading.value = false
		}

		return {
			task,
			taskId: props.id,
			handleSelectChange,
			removeTask,
			isLoading,
			spritesSVG,
			closeForm,
		}
	},
}
</script>
