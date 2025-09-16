<template>
	<form class="card-desc" @submit="addTask">
		<h1>Создать новую задачу</h1>
		<div class="form-control">
			<label for="title">Название</label>
			<input type="text" id="title" v-model="formData.title" />
		</div>
		<div class="form-control">
			<label for="worker">Ответственный</label>
			<input type="text" id="worker" v-model="formData.worker" />
		</div>
		<div class="form-control">
			<label for="date">Срок</label>
			<input type="date" id="date" v-model="formData.deadline" />
		</div>
		<div class="form-control">
			<label for="description">Описание</label>
			<textarea id="description" v-model="formData.desc"></textarea>
		</div>
		<button type="submit" class="btn primary">Создать</button>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { fetchData } from '@/helpers/apiHelper'

export default {
	setup() {
		const toast = useToast()
		const store = useStore()
		const formData = ref({
			title: '',
			deadline: '',
			desc: '',
			worker: '',
		})

		const router = useRouter()

		const addTask = async function (event) {
			event.preventDefault()

			const newTask = {
				title: formData.value.title.trim(),
				worker: formData.value.worker.trim(),
				deadline: formData.value.deadline.trim(),
				desc: formData.value.desc.trim(),
				status: 'на распределении',
			}

			if (
				!newTask.title ||
				!newTask.worker ||
				!newTask.deadline ||
				!newTask.desc
			) {
				toast.warning('Заполните все поля', {
					position: 'bottom-right',
					duration: 3000,
				})
				return
			}

			/* Добавляем задачу на сервер */
			try {
				await fetchData(
					'https://vue-task-manager-cb60d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
					'post',
					newTask
				)
			} catch (error) {
				console.error('Ошибка:', error)
			}

			/* добавляем задачу в хранилище */
			store.commit('ADD_TASK', newTask)
			toast.success('Задача успешно добавлена', {
				position: 'bottom-right',
				timeout: 4000,
			})
			formData.value = {}
			router.push('/')
		}

		return {
			formData,
			addTask,
		}
	},
}
</script>
