<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { Ref } from 'vue';

  type Geolocation = {
    latitude: number;
    longitude: number;
  }

  let coords: Ref<Geolocation | undefined> = ref();
  let geolocationAccessDeniedByUser = ref(false);

  async function getCoords(): Promise<void> {
     navigator.geolocation.getCurrentPosition(
      (position: { coords: Geolocation }) => {
      coords.value = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    }, 
      (error: { message: string }) => {
        geolocationAccessDeniedByUser.value = true;
        console.error(error.message);
      })
  }


  onMounted(async () => {
    await getCoords();
});
</script>
  
<template>
  <div>
    <div v-if="!geolocationAccessDeniedByUser">{{ coords?.latitude }} {{ coords?.longitude }} </div>
    <div v-else>Access denied by the user</div>
  </div>
</template>

<style scoped>

</style>
