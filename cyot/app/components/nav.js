import { Heading } from "@chakra-ui/react";

function Nav() {
  return (
    <>
      <Heading>CYOT</Heading>
      <Heading as="h2" size="lg">
        Create Your Own Token
      </Heading>
      <Heading as="h3" size="md">
        Create an ERC20 token in just a few clicks
      </Heading>
    </>
  );
}

export default Nav;
