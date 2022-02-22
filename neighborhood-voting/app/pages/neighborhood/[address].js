import {
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  StatGroup,
  Divider,
} from "@chakra-ui/react";
import neighborhoodFactory from "../../web3/neighborhoodFactory";
import getNeighborhoodInstance from "../../web3/neighborhood";
import Proposals from "../../components/proposals";
import Admin from "../../components/admin";

export default function Neighborhood({
  name,
  residentsCount,
  proposalId,
  address,
}) {
  return (
    <>
      <Heading as="h2" size="lg">
        Neighborhood
      </Heading>
      <Heading as="h4" size="md">
        {address}
      </Heading>
      <StatGroup mt={10}>
        <Stat>
          <StatLabel>Name</StatLabel>
          <StatNumber>{name}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Verified Residents</StatLabel>
          <StatNumber>{residentsCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Proposals</StatLabel>
          <StatNumber>{proposalId}</StatNumber>
        </Stat>
      </StatGroup>

      <Divider mt={10} mb={10} />
      <Proposals address={address} />
      <Divider mt={10} mb={10} />
      <Admin address={address} />
    </>
  );
}

export async function getStaticPaths() {
  const neighborhoods = await neighborhoodFactory.methods
    .getAllNeighborhoods()
    .call();

  return {
    paths: neighborhoods.map((c) => ({ params: { address: c } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const neighborhood = getNeighborhoodInstance(context.params.address);
  const promises = [
    neighborhood.methods.name().call(),
    neighborhood.methods.residentsCount().call(),
    neighborhood.methods.proposalId().call(),
  ];
  const [name, residentsCount, proposalId] = await Promise.all(promises);

  return {
    props: {
      name,
      residentsCount,
      proposalId,
      address: context.params.address,
    },
  };
}
