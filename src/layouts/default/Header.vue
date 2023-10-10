<template>
    <v-app-bar :elevation="5">
        <v-app-bar-title class="text-center">
            <v-icon icon="mdi-wrench" />App Manager
        </v-app-bar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :title="item.title"
                @click="() => $router.push(item.route)"
            >
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const drawer = ref(false);
const items = [
    { title: "Home", icon: "mdi-home", route: "/" },
    { title: "About", icon: "mdi-help-box", route: "/about" },
    { title: "Contact", icon: "mdi-email", route: "/contact" },
];

export default defineComponent({
    setup() {
        return {
            drawer,
            items,
        };
    },
});
</script>
