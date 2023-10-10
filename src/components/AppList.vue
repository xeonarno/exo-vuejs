<template>
    <v-container class="fill-height">
        <filter-panel
            @filters-update="updateList"
            filtertypes="SSR,MPA"
        ></filter-panel>
        <v-responsive class="align-center text-center fill-height">
            <v-row>
                <app-item
                    v-for="application in applications"
                    :key="application.id"
                    :application="application"
                    @edit="openEditDialog"
                />
                <add-item @add-application="addNewApplication"></add-item>
            </v-row>
            <edit-app
                v-model:edit-dialog="editDialog"
                :application-id="selectedApplication"
                @save-application="refreshList"
                @cancel-edit="closeEditDialog"
                @delete-edit="refreshList"
            />
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import FilterPanel from "@/components/FilterPanel.vue";
import AppItem from "@/components/AppItem.vue";
import EditApp from "@/components/EditApp.vue";
import AddItem from "@/components/AddItem.vue";
import FiltersType from "@/type/filters.type";

import { defineComponent, ref, Ref } from "vue";
import { useAppStore } from "@/store/app";
import Application from "@/type/application.type";

const NO_APP = -1;
const appStore = useAppStore();
const filters = ref<FiltersType>({
    types: [],
    text: "",
    start: "",
    stop: "",
});

export default defineComponent({
    setup() {
        const applications: Ref<Application[]> = ref([]);
        const selectedApplication: Ref<number> = ref(NO_APP);

        applications.value = appStore.applications;

        return {
            applications,
            selectedApplication,
        };
    },
    data() {
        return {
            editDialog: false,
        };
    },
    methods: {
        openEditDialog(id: number) {
            console.log("AppList > open", id);
            this.selectedApplication = id;
            this.editDialog = true;
        },
        closeEditDialog() {
            console.log("AppList > close");
            this.selectedApplication = NO_APP;
        },
        addNewApplication() {
            console.log("Applist > new", NO_APP);
            this.selectedApplication = NO_APP;
            this.editDialog = true;
        },
        updateList(event: FiltersType) {
            console.log("AppList > update", event);
            filters.value = event || filters.value;
            const { types, text, start, stop } = filters.value;
            console.log('filters', filters.value);

            let applications = appStore.applications;
            if (types.length > 0) {
                applications = applications.filter((app) =>
                    types.includes(app.type)
                );
            }
            if (text) {
                applications = applications.filter((app) =>
                    app.name.trim().toLowerCase().includes(text)
                );
            }
            if (start && stop) {
                const startTime = Date.parse(start);
                const stopTime = Date.parse(stop);
                applications = applications.filter((app) => {
                    const date = Date.parse(app.date);
                    return date >= startTime && date <= stopTime;
                });
            }
            console.log("applications", applications);

            this.applications = applications;
        },
        refreshList() {
            console.log("AppList > refresh");
            this.updateList(filters.value);
        },
    },
    components: {
        FilterPanel,
        AppItem,
        EditApp,
        AddItem,
    },
});
</script>
