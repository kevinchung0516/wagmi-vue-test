<template>
  <q-layout view="lHh LpR fFf">
    <q-header ref="header" elevated class="bg-white text-black">
      <q-toolbar>
        <q-space />

        <div class="flex justify-end items-center no-wrap">
          <w3m-button balance="hide" size="sm" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="text-center q-pt-md">
          <p>isConnected:{{ isConnected }}</p>
          <p>address:{{ address }}</p>
        </div>

        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { watch, computed } from "vue";
import { createAppKit, useAppKit } from "@reown/appkit/vue";
import { arbitrum, mainnet, base } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 1. Get projectId from https://cloud.reown.com
const projectId = process.env.VUE_APP_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: "test",
  description: "test",
  url: window.location.origin,
  icons: [],
};

const networks = [mainnet, arbitrum, base];

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

// 4. Create modal
const wagmiConfig = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false,
    socials: [],
  },
});

// 5. Use modal composable
const web3Modal = useAppKit();

import { useAccount, useConfig } from "@wagmi/vue";
const config = useConfig();
const account = useAccount();

const isConnected = computed(() => account?.isConnected);
const address = computed(() => account?.address);
</script>

<style lang="scss">
.q-layout,
.q-page-container {
  height: 100%;

  .q-page {
    height: 100%;
  }
}
</style>
