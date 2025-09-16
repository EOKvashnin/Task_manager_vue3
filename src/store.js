import { createStore } from 'vuex'

export const store = createStore({
	state() {
		return {
			title: ' This is Vuex + Composition API',
			tasks: [],
		}
	},
	mutations: {
		UPDATE_TASK_STATUS(state, payload) {
			const task = state.tasks.find(t => t.id === payload.taskId)
			if (task) {
				task.status = payload.newStatus
			}
		},

		ADD_TASK(state, task) {
			state.tasks.unshift(task)
		},

		SET_TASKS(state, payload) {
			state.tasks = payload
		},

		REMOVE_TASK(state, payload) {
			state.tasks = state.tasks.filter(task => task.id !== payload.taskId)
		},
	},
})
