<template>
    <q-fab square color="secondary" text-color="primary" icon=handyman direction="right" class="q-pl-md q-pt-md">
        <q-fab-action square color="secondary" text-color="primary" @click="console.log('Profile')"
            icon="mdi-chart-line-variant">
            <q-tooltip>
                Profil topographique
            </q-tooltip>
        </q-fab-action>
    </q-fab>
</template>

<script>

export default {
    name: "ProcessingTool",
}
</script>