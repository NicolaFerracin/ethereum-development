import { Box } from "@chakra-ui/react";
import tokenFactory from "../web3/tokenFactory";
import getTokenInstance from "../web3/token";
import Tokens from "../components/tokens";

function Index({ tokens }) {
  return (
    <Box pt={4}>
      <Tokens tokens={tokens} />
    </Box>
  );
}

export async function getStaticProps() {
  const tokensAddresses = await tokenFactory.methods.getAllTokens().call();
  const tokens = [];
  for (let address of tokensAddresses) {
    const token = getTokenInstance(address);
    const promises = [
      token.methods.name().call(),
      token.methods.symbol().call(),
      token.methods.decimals().call(),
      token.methods.totalSupply().call(),
    ];
    const [name, symbol, decimals, totalSupply] = await Promise.all(promises);
    tokens.push({
      name,
      symbol,
      decimals,
      totalSupply,
      address,
    });
  }

  return {
    props: { tokens },
  };
}

export default Index;
