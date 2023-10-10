<template>
    <v-toolbar>
        <v-toolbar-title>FilterApp</v-toolbar-title>
        <v-select
            :model-value="filterType"
            :items="typeOptions"
            multiple
            chips
            label="Filtrer par type"
            @update:model-value="selectTypeFilter"
        >
        </v-select>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogStart" top>
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"
                    >Start:{{ startFilter[0] }}</v-btn
                >
            </template>
            <v-row justify="center">
                <v-date-picker
                    :model-value="startFilter"
                    @update:model-value="updateStartFilter"
                    no-title
                    scrollable
                    locale="fr"
                    min="2021-01-01"
                    @click:cancel="dialogStart = false"
                ></v-date-picker>
            </v-row>
        </v-dialog>
        <v-dialog v-model="dialogStop" top>
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"
                    >Stop:{{ stopFilter[0] }}</v-btn
                >
            </template>
            <v-row justify="center">
                <v-date-picker
                    :model-value="stopFilter"
                    @update:model-value="updateStopFilter"
                    no-title
                    scrollable
                    locale="fr"
                    min="2021-01-01"
                    @click:cancel="dialogStop = false"
                ></v-date-picker>
            </v-row>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="filterText"
            :rules="filterName"
            :counter="10"
            hide-details
            clearable
            label="Filter par mot-clé"
            persistent-clear
            @change="emitFilterChange"
            @click:clear="emitFilterChange"
        ></v-text-field>

    </v-toolbar>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import LuxonAdapter from "@date-io/luxon";
import FiltersType from "@/type/filters.type";
const adapt = new LuxonAdapter({ locale: "fr" });

const typeOptions = [
    'SPA','MPA','SSR'
]

const dialogStart = ref(false);
const dialogStop = ref(false);

const filterName = [
    (value: string) => {
        if (/^[a-zA-Z0-9]+$/.test(value)) return true;
        return "Le nom ne peut contenir que du texte et des chiffres.";
    },
];

export default defineComponent({
    setup(props) {
        const filterText = ref(props.filtertext || "") ;
        const filterType = ref<string[]>(props.filtertypes?.split(',') || []);

        const today = adapt.date();
        const start:string = (props.filterstart ? adapt.date(props.filterstart) : today.minus({ years: 1 })).toISODate();
        const stop:string = (props.filterstop ? adapt.date() : today).toISODate();
        console.log("start date", start);
        console.log("stop date", stop);

        const startFilter = ref([start]);
        const stopFilter = ref([stop]);

        return {
            dialogStart,
            dialogStop,
            startFilter,
            stopFilter,
            filterText,
            filterType,
            typeOptions,
            filterName,
        };
    },
    mounted() {
        this.emitFilterChange()
    },
    props: {
        filtertext: String,
        filtertypes: String,
        filterstart: Date,
        filterstop: Date,
    },
    methods: {
        selectTypeFilter(data: string[]) {
            console.log('select:',data);
            this.filterType = data;
            this.emitFilterChange();
        },
        emitFilterChange() {
            const filters = {
                text: this.filterText.trim().toLowerCase(),
                types: this.filterType,
                start: this.startFilter[0],
                stop: this.stopFilter[0],
            } satisfies FiltersType;
            this.$emit("filters-update", filters);
            console.log("Emit filters", filters);
        },
        updateStartFilter(date: readonly any[]) {
            console.log("newDate Start", date);
            const newDate = adapt.date(date).toISODate();
            this.startFilter = [newDate];
            dialogStart.value = false;
            this.emitFilterChange();
        },
        cancelStart() {
            dialogStart.value = false;
        },
        updateStopFilter(date: readonly any[]) {
            console.log("newDate Stop", date);
            const newDate = adapt.date(date).toISODate();
            this.stopFilter = [newDate];
            dialogStop.value = false;
            this.emitFilterChange();
        },
        cancelStop() {
            dialogStop.value = false;
        },
    },
});
</script>
