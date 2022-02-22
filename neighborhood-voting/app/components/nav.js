import { Heading } from "@chakra-ui/react";
import Link from "next/link";

function Nav() {
  return (
    <>
      <Link href="/">
        <a>
          <Heading>Neighborhood Voting DApp</Heading>
        </a>
      </Link>
      <hr />
    </>
  );
}

export default Nav;
