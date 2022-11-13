import { createRouter, createWebHistory } from 'vue-router'
import ChartView from '@/views/ChartView.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        props: true,
        component: () => import('../components/BarChartComponent.vue') //Change to show bar chart-Oscar Lopez
    },
    {
        path: '/intakeform',
        name: 'intakeForm',
        props: true,
        component: () => import('../components/intakeForm.vue')
    },
    {
        path: '/findclient',
        name: 'findClient',
        component: () => import('../components/findClient.vue')
    },
    {
        path: '/updateclient/:id',
        name: 'updateclient',
        props: true,
        component: () => import('../components/updateClient.vue')
    },
    {
        path: '/eventform',
        name: 'eventform',
        component: () => import('../components/eventForm.vue')
    },
    {
        path: '/findEvents',
        name: 'findEvents',
        component: () => import('../components/findEvents.vue')
    },
    {
        path: '/eventDetails/:id',
        name: 'eventdetails',
        props: true,
        component: () => import('../components/eventDetails.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: ChartView
    }
]
const router = createRouter({
    history: createWebHistory(), routes
})
export default router