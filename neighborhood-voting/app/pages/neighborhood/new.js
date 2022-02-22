import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import {
  Heading,
  FormControl,
  Button,
  FormLabel,
  Input,
  Alert,
  Progress,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import web3 from "../../web3/web3";
import neighborhoodFactory from "../../web3/neighborhoodFactory";

function New() {
  const [name, setName] = useState();
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
        await neighborhoodFactory.methods
          .createNeighborhood(name)
          .send({ from: accounts[0] });
        router.push("/");
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    },
    [router, name]
  );

  return (
    <form onSubmit={onSubmit}>
      <Heading as="h2" size="lg" mb={10}>
        Create a Neighborhood
      </Heading>
      {isLoading && <Progress colorScheme="pink" size="lg" isIndeterminate />}
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
      </FormControl>
      <Button
        sx={{ float: "right" }}
        type="submit"
        colorScheme="pink"
        mt={4}
        isLoading={isLoading}
      >
        Create
      </Button>
    </form>
  );
}

export default New;
