// Utilities
import Application from '@/type/application.type'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    applications: [
      {
        id: 1,
        name: "Application 1",
        url: "https://example.com/app1",
        type: "SPA",
        description: "Description de l'application 1",
        date: "2023-01-15",
      },
      {
        id: 2,
        name: "Application 2",
        url: "https://example.com/app2",
        type: "MPA",
        description: "Description de l'application 2",
        date: "2023-02-20",
      },
      {
        id: 3,
        name: "Application 3",
        url: "https://example.com/app3",
        type: "SPA",
        description: "Description de l'application 3",
        date: "2023-03-10",
      },
      {
        id: 4,
        name: "Application 4",
        url: "https://example.com/app4",
        type: "MPA",
        description: "Description de l'application 4",
        date: "2023-04-25",
      },
      {
        id: 5,
        name: "Application 5",
        url: "https://example.com/app5",
        type: "SSR",
        description: "Description de l'application 5",
        date: "2023-05-12",
      },
    ] as Application[],
  }),
  actions: {
    getLastId(): number {
      return this.applications.length + 1
    },
    getApplication(id: number): Application | undefined {
      return this.applications.find((app) => app.id === id)
    },
    addApplication(application: Application) {
      this.applications.push(application);
    },
    removeApplication(id: number) {
      this.applications = this.applications.filter((app) => app.id !== id)
    },
    updateApplication(application: Application) {
      const index = this.applications.findIndex((app) => app.id === application.id)
      if (index !== -1) {
        this.applications[index] = application
      }
    },
  },
})
