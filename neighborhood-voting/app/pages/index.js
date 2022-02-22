import { Button, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import Link from "next/link";
import neighborhoodFactory from "../web3/neighborhoodFactory";
import getNeighborhoodInstance from "../web3/neighborhood";
import Neighborhoods from "../components/neighborhoods";

function Index({ neighborhoods }) {
  return (
    <>
      <Heading as="h2" size="lg">
        Create a system for residents in your neighborhood to vote for projects
      </Heading>
      <List spacing={3} mt={4}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          As a manager you can create a neighborhood, verify residents and
          create proposals.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          {
            "Verified residents can contribute and vote on their neighborhood's proposals."
          }
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          At the end of the voting process, managers can either
          <List pl={10} spacing={3} mt={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              finalize a proposal receiving the collected funds
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              reject it giving each contributor the possibility to withdraw
              their contribution to that proposal
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Link href="/neighborhood/new">
        <a>
          <Button colorScheme="pink" mt={10}>
            Create Neighborhood
          </Button>
        </a>
      </Link>
      <Neighborhoods neighborhoods={neighborhoods} />
    </>
  );
}

export async function getStaticProps() {
  const neighborhoodsAddresses = await neighborhoodFactory.methods
    .getAllNeighborhoods()
    .call();
  const neighborhoods = [];
  for (let address of neighborhoodsAddresses) {
    const neighborhood = getNeighborhoodInstance(address);
    const promises = [
      neighborhood.methods.name().call(),
      neighborhood.methods.residentsCount().call(),
      neighborhood.methods.proposalId().call(),
    ];
    const [name, residentsCount, proposalId] = await Promise.all(promises);
    neighborhoods.push({
      name,
      residentsCount,
      proposalId,
      address,
    });
  }

  return {
    props: { neighborhoods },
  };
}

export default Index;
