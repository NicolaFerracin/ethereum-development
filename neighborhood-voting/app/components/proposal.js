import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import {
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Tr,
  Td,
  Stack,
} from "@chakra-ui/react";
import web3 from "../web3/web3";
import getNeighborhoodInstance from "../web3/neighborhood";

function Proposal({
  neighborhood: address,
  proposal,
  setError,
  setIsLoading,
  isLoading,
}) {
  const router = useRouter();
  const [contribution, setContribution] = useState();

  const onVote = useCallback(
    async (e, id) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const neighborhood = getNeighborhoodInstance(address);

      try {
        const accounts = await web3.eth.getAccounts();
        await neighborhood.methods
          .voteProposal(id)
          .send({ from: accounts[0], value: contribution });
        router.reload(window.location.pathname);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    },
    [router, contribution, address, setError, setIsLoading]
  );

  const onFinalize = useCallback(
    async (e, id) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const neighborhood = getNeighborhoodInstance(address);

      try {
        const accounts = await web3.eth.getAccounts();
        await neighborhood.methods
          .finalizeProposal(id)
          .send({ from: accounts[0] });
        router.reload(window.location.pathname);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    },
    [router, address, setError, setIsLoading]
  );

  const onReject = useCallback(
    async (e, id) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const neighborhood = getNeighborhoodInstance(address);

      try {
        const accounts = await web3.eth.getAccounts();
        await neighborhood.methods
          .rejectProposal(id)
          .send({ from: accounts[0] });
        router.reload(window.location.pathname);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    },
    [router, address, setError, setIsLoading]
  );

  const onWithdraw = useCallback(
    async (e, id) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const neighborhood = getNeighborhoodInstance(address);

      try {
        const accounts = await web3.eth.getAccounts();
        await neighborhood.methods
          .withdrawFromProposal(id)
          .send({ from: accounts[0] });
        router.reload(window.location.pathname);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    },
    [router, address, setError, setIsLoading]
  );

  const renderProposalActions = (complete, cancelled, index) => {
    if (complete) {
      return null;
    }
    if (cancelled) {
      return (
        <Button
          colorScheme="pink"
          onClick={(e) => onWithdraw(e, index)}
          isLoading={isLoading}
        >
          Withdraw
        </Button>
      );
    }
    return (
      <form onSubmit={(e) => onVote(e, index)}>
        <InputGroup>
          <Input
            id="contribution"
            type="number"
            required
            placeholder="Wei"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
          <InputRightElement width="auto">
            <Button type="submit" colorScheme="pink" isLoading={isLoading}>
              Vote
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    );
  };

  const renderAdminActions = (complete, cancelled, index) => {
    if (!complete && !cancelled) {
      return (
        <Stack direction="column" spacing={4}>
          <Button
            colorScheme="green"
            variant="outline"
            onClick={(e) => onFinalize(e, index)}
            isLoading={isLoading}
          >
            Finalize
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={(e) => onReject(e, index)}
            isLoading={isLoading}
          >
            Reject
          </Button>
        </Stack>
      );
    }
  };

  const {
    id,
    name,
    link,
    votesCount,
    moneyCollected,
    complete,
    cancelled,
    index,
  } = proposal;
  const state = complete ? "Complete" : cancelled ? "Cancelled" : "Open";
  const stateColor = complete ? "pink" : cancelled ? "red" : "black";
  const funds = web3.utils.fromWei(moneyCollected, "ether");

  return (
    <Tr
      key={id}
      sx={{
        ":hover": {
          backgroundColor: "#d53f8c47",
        },
      }}
    >
      <Td>{name}</Td>
      <Td
        sx={{
          color: "blue",
        }}
      >
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </Td>
      <Td>{votesCount}</Td>
      <Td>{funds > 0.005 ? `${funds} ETH` : `${moneyCollected} WEI`}</Td>
      <Td color={stateColor}>{state}</Td>
      <Td>{renderProposalActions(complete, cancelled, index)}</Td>
      <Td>{renderAdminActions(complete, cancelled, index)}</Td>
    </Tr>
  );
}

export default Proposal;
