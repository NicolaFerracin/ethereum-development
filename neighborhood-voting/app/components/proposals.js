import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import getNeighborhoodInstance from "../web3/neighborhood";
import Proposal from "./proposal";

function Proposals({ address }) {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      const neighborhood = getNeighborhoodInstance(address);
      const proposalsAmount = await neighborhood.methods.proposalId().call();
      const proposals = (
        await Promise.all(
          Array(+proposalsAmount)
            .fill()
            .map((_, i) => neighborhood.methods.proposals(i).call())
        )
      ).map(
        (
          { name, link, votesCount, moneyCollected, complete, cancelled },
          i
        ) => ({
          id: `proposal-${address}-${i}`,
          name,
          link,
          votesCount,
          moneyCollected,
          complete,
          cancelled,
        })
      );
      setProposals(proposals);
    }

    fetchData();
  });

  return (
    <Box>
      <Heading as="h2" size="lg">
        Proposals
      </Heading>
      {error && (
        <Alert status="error" flexDirection="column" alignItems="left">
          <AlertTitle mr={2}>Uh oh! Something went wrong!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {isLoading && <Progress colorScheme="pink" size="lg" isIndeterminate />}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Link</Th>
            <Th>Votes Count</Th>
            <Th>Funds Collected</Th>
            <Th>State</Th>
            <Th>Actions</Th>
            <Th>Admin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((proposal, index) => (
            <Proposal
              neighborhood={address}
              key={proposal.id}
              proposal={{ ...proposal, index }}
              setIsLoading={setIsLoading}
              setError={setError}
              isLoading={isLoading}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Proposals;
