import { Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import tokenFactory from "../web3/tokenFactory";
import getTokenInstance from "../web3/token";
import Tokens from "../components/tokens";

function Index({ tokens }) {
  return (
    <>
      <Heading as="h2" size="lg">
        Create Your Own Token
      </Heading>
      <Heading as="h3" size="md">
        Create an ERC20 token in just a few clicks
      </Heading>
      <Link href="/new">
        <a>
          <Button colorScheme="teal" mt={10}>
            Create Token
          </Button>
        </a>
      </Link>
      <Tokens tokens={tokens} />
    </>
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
