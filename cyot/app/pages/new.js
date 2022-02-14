import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import {
  Heading,
  FormControl,
  Button,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Input,
  Alert,
  Progress,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import web3 from "../web3/web3";
import tokenFactory from "../web3/tokenFactory";

function New() {
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [decimals, setDecimals] = useState(18);
  const [initialSupply, setInitialSupply] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
        const accounts = await web3.eth.getAccounts();
        await tokenFactory.methods
          .createToken(
            name,
            symbol,
            web3.utils.toWei(initialSupply, "ether"),
            decimals
          )
          .send({ from: accounts[0] });
        router.push("/");
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    },
    [name, symbol, decimals, initialSupply]
  );

  return (
    <form onSubmit={onSubmit}>
      <Heading as="h2" size="lg" mb={10}>
        Create new token
      </Heading>
      {isLoading && <Progress colorScheme="teal" size="lg" isIndeterminate />}
      {error && (
        <Alert status="error" flexDirection="column" alignItems="left">
          <AlertTitle mr={2}>Uh oh! Something went wrong!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <FormControl mt={10}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormLabel mt={4} htmlFor="symbol">
          Symbol
        </FormLabel>
        <Input
          id="symbol"
          type="text"
          required
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <FormLabel mt={4} htmlFor="decimals">
          Decimals
        </FormLabel>
        <Input
          id="decimals"
          type="number"
          required
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
        />
        <FormLabel mt={4} htmlFor="initialSupply">
          Initial Supply
        </FormLabel>
        <InputGroup>
          <Input
            id="initialSupply"
            type="number"
            required
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
          />
          <InputRightAddon children="ether" />
        </InputGroup>
      </FormControl>
      <Button type="submit" colorScheme="teal" mt={10} isLoading={isLoading}>
        Create
      </Button>
    </form>
  );
}

export default New;
