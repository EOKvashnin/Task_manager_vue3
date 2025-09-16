import { createRouter, createWebHistory } from 'vue-router'
import NewPage from './views/NewPage.vue'
import AppTasks from './views/AppTasks.vue'
import AppTask from './views/AppTask.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: AppTasks },
		{ path: '/new', component: NewPage },
		{ path: '/task/:id', name: 'Task', component: AppTask, props: true },
	],
	linkActiveClass: 'active',
	linkExactActiveClass: 'active',
})
