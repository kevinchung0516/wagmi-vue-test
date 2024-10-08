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
import { useAppKit } from "@reown/appkit/vue";
// 5. Use modal composable
const web3Modal = useAppKit();

import { useAccount, useConfig } from "@wagmi/vue";
const config = useConfig();
const account = useAccount();

const isConnected = computed(() => account?.isConnected);
const address = computed(() => account?.address);

import { useEnsAddress } from "@wagmi/vue";
import { normalize } from "viem/ens";

const { data, loading, error } = useEnsAddress({
  name: normalize("wevm.eth"),
});

console.log(data.value);
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
