<template>
	<!-- Отображаем AppLoader, если идет загрузка -->
	<AppLoader v-if="isLoading" />

	<!-- Проверяем наличие задач после загрузки -->
	<template v-else>
		<!-- Если задач нет -->
		<h1 v-if="tasks.length === 0" class="text-white center">Задач пока нет</h1>

		<!-- Если задачи есть -->
		<template v-else>
			<div class="wrapper">
				<h3 class="text-gray">Всего активных задач: {{ activeTasks }}</h3>
				<div class="wrapper-cards">
					<router-link
						v-for="task in tasks"
						:key="task.id"
						:to="`/task/${task.id}`"
						class="card-link"
					>
						<div class="card">
							<div class="card-title">
								<h3>
									{{ task.title }}
								</h3>
								<AppStatus :type="task.status" :status="task.status" />
							</div>
							<div class="card-bottom">
								<svg class="item-icon__logo" aria-label="logo">
									<use :href="spritesSVG + '#person'" />
								</svg>
								<p style="padding-top: 1px">
									<strong>{{ task.worker }}</strong>
								</p>
							</div>
							<div class="card-bottom">
								<svg class="item-icon__logo" aria-label="logo">
									<use :href="spritesSVG + '#calendar'" />
								</svg>
								<p>{{ formatDate(task.deadline) }}</p>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</template>
	</template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import AppLoader from '@/components/AppLoader.vue'
import spritesSVG from '@/assets/img/sprites.svg'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import axios from 'axios'

export default {
	components: { AppStatus, AppLoader },
	setup() {
		const isLoading = ref(true)
		const toast = useToast()
		const store = useStore()
		const tasks = computed(() => store.state.tasks || []) // проверка существования задач

		const activeTasks = computed(
			() => tasks.value.filter(task => task.status === 'в работе').length
		)

		const loadTasks = async () => {
			try {
				const { data } = await axios.get(
					'https://vue-task-manager-cb60d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
				)

				if (!data) {
					console.log('Список задач пуст.')
					return []
				}

				const transformedTasks = Object.keys(data).map(key => ({
					id: key,
					...data[key],
				}))

				setTimeout(() => {
					isLoading.value = false
					store.commit('SET_TASKS', transformedTasks)
				}, 1000)
			} catch (error) {
				toast.warning(error, {
					position: 'bottom-right',
					timeout: 1000,
				})
			}
		}

		const formatDate = dateStr => {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Intl.DateTimeFormat('ru-RU', options).format(new Date(dateStr))
		}

		onMounted(loadTasks)

		return {
			tasks,
			activeTasks,
			isLoading,
			spritesSVG,
			formatDate,
		}
	},
}
</script>
