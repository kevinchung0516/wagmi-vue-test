import { boot } from "quasar/wrappers";

import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { WagmiPlugin } from "@wagmi/vue";
import { createAppKit } from "@reown/appkit/vue";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import {
  mainnet,
  base,
  polygon,
  binanceSmartChain,
  optimism,
  arbitrum,
  zkSync,
} from "@reown/appkit/networks";

const projectId = process.env.VUE_APP_PROJECT_ID;

const metadata = {
  name: "test",
  description: "test",
  url: window.location.origin,
  icons: [],
};

const networks = [
  mainnet,
  base,
  polygon,
  binanceSmartChain,
  optimism,
  arbitrum,
  zkSync,
];

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

// // 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks,
  defaultNetwork: "",
  metadata,
  projectId,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    email: false,
    socials: [],
  },
  themeMode: "light",
});

const config = wagmiAdapter.wagmiConfig;

const queryClient = new QueryClient();

export default boot(async ({ app, router }) => {
  // something to do

  app.use(WagmiPlugin, { config });
  app.use(VueQueryPlugin, { queryClient });
});
