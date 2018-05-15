import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home/HomePage'
import Register from '@/components/home/Register'
import Chat from '@/components/dashboard/messagesession'
import Dashboard from '@/components/dashboard/Dashboard'

Vue.use(Router);

const routes = [
	{
		path: '/', 
		name: 'HomePage', 
		component: HomePage
	},
	{
		path: '/dashboard/:user_id',
		name: 'Dashboard',
		component: Dashboard,
		meta: {
			requiresAuth: true
		},
		props: true,
	}

];

const router = new Router({
	routes
});


export default router;
