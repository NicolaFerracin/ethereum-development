import { useEffect, useState } from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import Layout from "../components/layout";
import web3 from "../web3/web3";

function MyApp({ Component, pageProps }) {
  const [isOnRopsten, setIsOnRopsten] = useState();

  useEffect(() => {
    setIsOnRopsten(+web3.currentProvider.chainId === 3);
  }, []);

  return (
    <ChakraProvider>
      <Layout>
        {isOnRopsten ? (
          <Component {...pageProps} />
        ) : (
          <>
            The main factory contract is deployed on the ropsten test network,
            please switch to it to interact with this DApp.
            <br />
            <Button
              colorScheme="pink"
              variant="outline"
              onClick={async () => {
                await web3.currentProvider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x3" }],
                });
                setTimeout(
                  () => setIsOnRopsten(+web3.currentProvider.chainId === 3),
                  1000
                );
              }}
            >
              Change to ropsten
            </Button>
          </>
        )}
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
