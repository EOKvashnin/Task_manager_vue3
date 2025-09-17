/* Загружаем данные на сервер firebase */ // const loadDataInDB = async function
() { // try { // const response = await fetch( //
'https://vue-task-manager-cb60d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
// { // method: 'POST', // headers: { // 'Content-Type': 'application/json', //
}, // body: JSON.stringify({ // id: Date.now(), // title:
formData.value.title.trim(), // worker: formData.value.worker.trim(), //
deadline: formData.value.deadline.trim(), // desc: formData.value.desc.trim(),
// status: 'на распределении', // }), // } // ) // const firebaseData = await
response.json() // console.log(firebaseData) // } catch (error) { //
console.error('Ошибка:', error) // } // }

<!-- <template>
	<div class="conatiner wiht-nav">
		<h1 v-if="tasks.length === 0" class="text-white center">Задач пока нет</h1>
		<template v-else>
			<h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>

			<task-page
				v-for="task in tasks"
				:key="task.id"
				:title="task.title"
				:status="task.status"
				:deadline="task.deadline"
				:desc="task.desc"
				:id="task.id"
			></task-page>
		</template>
	</div>
</template>

<script>
// import AppStatus from '../components/AppStatus'
import TaskPage from './TaskPage.vue'

import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	setup() {
		const store = useStore()
		const tasks = computed(() => store.state.tasks || [])

		const activeTasks = computed(
			() => tasks.value.filter(task => task.status === 'в работе').length
		)

		return {
			tasks,
			activeTasks,
		}
	},
	components: { TaskPage },
}
</script> -->
