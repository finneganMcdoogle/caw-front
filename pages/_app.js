import PageWrapper from "/components/PageWrapper";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const ethers = require("ethers");
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.goerli, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY)

//overide default text color to white for black background.  Adding brand colors
const theme = extendTheme({
  components: {
    Text: {
      baseStyle: { color: "white" },
    },
  },
  colors: {
    brand: {
      100: "#f2e266",
      200: "#e3d464",
      900: "#1a202c",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
