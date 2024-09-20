import { boot } from "quasar/wrappers";

import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { WagmiPlugin, http, createConfig } from "@wagmi/vue";
import { mainnet, arbitrum } from "@wagmi/vue/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "@wagmi/vue/connectors";

const config = createConfig({
  chains: [mainnet, arbitrum],
  connectors: [
    coinbaseWallet(),
    injected(),
    metaMask(),
    walletConnect({
      projectId: process.env.VUE_APP_PROJECT_ID,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

export default boot(async ({ app, router }) => {
  // something to do

  app.use(WagmiPlugin, { config });
  app.use(VueQueryPlugin, { queryClient });
});
