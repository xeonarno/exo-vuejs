<template>
    <v-dialog :model-value="editDialog" max-width="600px" persistent>
        <v-card>
            <v-card-title>
                {{
                    isNewApp
                        ? "Ajouter une Nouvelle Application"
                        : "Modifier l'Application"
                }}
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="saveApplication">
                    <v-text-field
                        v-model="editedApplication.name"
                        label="Nom de l'Application"
                    ></v-text-field>
                    <v-text-field
                        v-model="editedApplication.url"
                        label="URL de l'Application"
                    ></v-text-field>
                    <v-select
                        v-model="editedApplication.type"
                        :items="['SPA', 'MPA', 'SSR']"
                        label="Type de l'Application"
                    ></v-select>
                    <v-text-field
                        v-model="editedApplication.description"
                        label="Description de l'Application"
                    ></v-text-field>
                    <v-dialog v-model="dateDialog" top>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props">{{
                                dateFilter[0]
                            }}</v-btn>
                        </template>
                        <v-row justify="center">
                            <v-date-picker
                                :model-value="dateFilter"
                                @update:model-value="updateDateFilter"
                                no-title
                                scrollable
                                locale="fr"
                                min="2021-01-01"
                                @click:cancel="dateDialog = false"
                            ></v-date-picker>
                        </v-row>
                    </v-dialog>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="primary" type="submit">{{
                            isNewApp ? "Ajouter" : "Modifier"
                        }}</v-btn>
                        <v-btn @click="cancelEdit">Annuler</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="deleteEdit">Supprimer</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { ref, PropType, watch } from "vue";
import { useAppStore } from "@/store/app";
import LuxonAdapter from "@date-io/luxon";
const adapt = new LuxonAdapter({ locale: "fr" });

const dateDialog = ref(false);
const appStore = useAppStore();

const today = adapt.date().toISODate();
console.log("EditApp > date", today);
const dateFilter = ref([today]);

export default {
    props: {
        editDialog: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        applicationId: {
            type: Number,
            required: false,
            default: -1,
        },
    },
    emits: [
        "save-application",
        "cancel-edit",
        "delete-edit",
        "update:editDialog",
    ],
    setup(props) {
        console.log("EditApp > edit", props.editDialog);

        const isNewApp = ref(props.applicationId < 0);
        console.log("IsNewApp ?", isNewApp.value ? "Ajouter" : "Modifier");

        let app = appStore.getApplication(props.applicationId);
        if (!app) {
            app = {
                id: appStore.getLastId(),
                name: "",
                url: "",
                type: "MPA",
                description: "",
                date: today,
            };
        }
        const editedApplication = ref(app);

        watch(
            () => props.applicationId,
            (newValue: number | undefined) => {
                console.log("EditApp > watch", newValue);
                isNewApp.value = newValue !== undefined && newValue < 0;
                let app = appStore.getApplication(newValue || -1);
                if (!app) {
                    app = {
                        id: appStore.getLastId(),
                        name: "",
                        url: "",
                        type: "MPA",
                        description: "",
                        date: today,
                    };
                }
                editedApplication.value = app;
            }
        );

        return {
            isNewApp,
            dateFilter,
            dateDialog,
            editedApplication,
        };
    },
    methods: {
        saveApplication() {
            // save the application in the store and close the dialog
            console.log("EditApp > save", this.editedApplication);

            if (this.isNewApp) {
                appStore.addApplication(this.editedApplication);
            } else {
                appStore.updateApplication(this.editedApplication);
            }

            this.$emit("update:editDialog", false);
            this.$emit("save-application", this.editedApplication);
        },
        cancelEdit() {
            this.$emit("update:editDialog", false);
            this.$emit("cancel-edit");
        },
        updateDateFilter(date: readonly any[]) {
            console.log("new Date App", date);
            const newDate = adapt.date(date).toISODate();
            this.dateFilter = [newDate];
            this.editedApplication.date = newDate;
            this.dateDialog = false;
        },
        deleteEdit() {
            appStore.removeApplication(this.editedApplication.id);
            this.$emit("update:editDialog", false);
            this.$emit("delete-edit");
        },
    },
};
</script>
