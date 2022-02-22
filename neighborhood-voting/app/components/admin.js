import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  Text,
  Input,
  InputRightElement,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import web3 from "../web3/web3";
import getNeighborhoodInstance from "../web3/neighborhood";

function Admin({ address }) {
  const router = useRouter();
  const [residentAddress, setResidentAddress] = useState();
  const [isLoadingVerifyAddress, setIsLoadingVerifyAddress] = useState(false);
  const [verifyAddressError, setVerifyAddressError] = useState();
  const onVerifyResident = useCallback(
    async (e) => {
      e.preventDefault();
      setVerifyAddressError("");
      setIsLoadingVerifyAddress(true);

      const neighborhood = getNeighborhoodInstance(address);

      try {
        const accounts = await web3.eth.getAccounts();
        await neighborhood.methods
          .verifyResident(residentAddress)
          .send({ from: accounts[0] });
        router.reload(window.location.pathname);
      } catch (e) {
        setVerifyAddressError(e);
      }
      setIsLoadingVerifyAddress(false);
    },
    [router, residentAddress, address]
  );

  const [proposalName, setProposalName] = useState();
  const [proposalLink, setProposalLink] = useState();
  const [isLoadingCreateProposal, setIsLoadingCreateProposal] = useState(false);
  const [createProposalError, setCreateProposalError] = useState();
  const onCreateProposal = useCallback(
    async (e) => {
      e.preventDefault();
      setCreateProposalError("");
      setIsLoadingCreateProposal(true);

      const neighborhood = getNeighborhoodInstance(address);

      try {
        const accounts = await web3.eth.getAccounts();
        await neighborhood.methods
          .createProposal(proposalName, proposalLink)
          .send({ from: accounts[0] });
        router.reload(window.location.pathname);
      } catch (e) {
        setCreateProposalError(e);
      }
      setIsLoadingCreateProposal(false);
    },
    [router, proposalName, proposalLink, address]
  );

  return (
    <Box>
      <Heading as="h2" size="lg">
        Admin
      </Heading>
      <Text color="red.500">
        {
          "This section is supposed to be displayed to the neighborhood's manager exclusively."
        }
        <br />
        For showcase purposes, this is publicly displayed.
      </Text>
      <form onSubmit={onVerifyResident}>
        {verifyAddressError && (
          <Alert status="error" flexDirection="column" alignItems="left">
            <AlertTitle mr={2}>Uh oh! Something went wrong!</AlertTitle>
            <AlertDescription>{verifyAddressError.message}</AlertDescription>
          </Alert>
        )}
        <FormControl mt={10}>
          <FormLabel htmlFor="residentAddress">Resident Address</FormLabel>
          <Text color="red.500">
            This is a simple process to verify residents manually. In a
            real-life scenario this could be replaced by some identifaction
            process.
          </Text>
          {isLoadingVerifyAddress && (
            <Progress colorScheme="pink" size="lg" isIndeterminate />
          )}
          <InputGroup>
            <Input
              id="residentAddress"
              type="text"
              required
              value={residentAddress}
              onChange={(e) => setResidentAddress(e.target.value)}
            />
            <InputRightElement width="auto">
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isLoadingVerifyAddress}
              >
                Verify Address
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
      <Box mt={10}>
        <form onSubmit={onCreateProposal}>
          {createProposalError && (
            <Alert status="error" flexDirection="column" alignItems="left">
              <AlertTitle mr={2}>Uh oh! Something went wrong!</AlertTitle>
              <AlertDescription>{createProposalError.message}</AlertDescription>
            </Alert>
          )}
          <FormControl mt={10}>
            <FormLabel htmlFor="proposalName">Proposal Name</FormLabel>
            <Input
              id="proposalName"
              type="text"
              required
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
            />
            <FormLabel htmlFor="proposalLink">Proposal Link</FormLabel>
            <Input
              id="proposalLink"
              type="text"
              required
              value={proposalLink}
              onChange={(e) => setProposalLink(e.target.value)}
            />
          </FormControl>
          {isLoadingCreateProposal && (
            <Progress colorScheme="pink" size="lg" isIndeterminate />
          )}
          <Button
            mt={4}
            sx={{ float: "right" }}
            type="submit"
            colorScheme="pink"
            isLoading={isLoadingCreateProposal}
          >
            Create Proposal
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Admin;
