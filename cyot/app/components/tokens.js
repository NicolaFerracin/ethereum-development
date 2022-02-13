import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import web3 from "../web3/web3";

function Tokens({ tokens }) {
  return (
    <StatGroup gap="10" justifyContent="start">
      {tokens.map((token) => (
        <Stat
          key={token.name}
          padding="5"
          sx={{
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          <StatLabel>{token.name}</StatLabel>
          <StatNumber>{token.symbol}</StatNumber>
          <StatNumber>
            {web3.utils.fromWei(token.totalSupply, "ether")} ETH
          </StatNumber>
          <StatHelpText>
            <strong>Decimals</strong>: {token.decimals}
          </StatHelpText>
          <StatHelpText>{token.address}</StatHelpText>
        </Stat>
      ))}
    </StatGroup>
  );
}

export default Tokens;
