// import { describe, it, expect } from 'vitest'
import { shallowMount } from "@vue/test-utils";
import GetGeolocation from "./src/components/GetGeolocation.vue";
import App from './src/App.vue';

describe('App', () => {
    it('should render the GetGeolocation component', () => {
        const holder = shallowMount(App);
        expect(holder.findComponent(GetGeolocation).exists()).toBe(true);
    })
})