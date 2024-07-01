<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import type { Ref } from 'vue';

    type Coords = {
        latitude: number | undefined;
        longitude: number | undefined;
    };

    type WeatherData = {
        location: {
            localtime: Date;
            name: string;
            region: string;
        };
        current: {
            temp_c: number;
            temp_f: number;
            precip_mm: number;
            condition: {
                text: string;
                icon: string;
            };
            wind_degree: number;
            wind_kph: number;
            wind_mph: number;
        };
    }

    interface Props {
        coords: Coords 
    }

    const props = defineProps<Props>();
    const data: Ref<WeatherData | undefined> = ref();

    async function getWeather(coords: Coords): Promise<WeatherData> {
        const { latitude, longitude } = coords;
        const stringCoords = `${latitude},${longitude}`;
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${stringCoords}`);
        const data = await response.json();
        return data;
    }

    onMounted(async () => {
        const { latitude, longitude } = props.coords;
        const weatherData = await getWeather({ latitude, longitude });
        data.value = weatherData;
    })
</script>

<template>
    <div v-if="data && data.current">{{data.current.temp_c}} celsius</div>
    <div v-else>Loading...</div>
</template>

<style scoped>

</style>