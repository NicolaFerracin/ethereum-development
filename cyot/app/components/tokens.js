import { useCallback } from "react";
import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function Tokens({ tokens }) {
  const addToMetamask = useCallback(async (token) => {
    await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
        },
      },
    });
  }, []);

  return (
    <Table variant="simple" mt={10}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>Total Supply</Th>
          <Th>Decimals</Th>
          <Th>Address</Th>
          <Th isNumeric>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tokens.map((token) => (
          <Tr key={token.name}>
            <Td>{token.name}</Td>
            <Td>{token.symbol}</Td>
            <Td>
              {token.totalSupply} {token.symbol}
            </Td>
            <Td>{token.decimals}</Td>
            <Td>{token.address}</Td>
            <Td isNumeric>
              <Button
                variant="outline"
                size="xs"
                colorScheme="teal"
                onClick={() => addToMetamask(token)}
              >
                Add to Metamask
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Tokens;
