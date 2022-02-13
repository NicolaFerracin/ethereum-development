import { Container } from "@chakra-ui/react";
import Nav from "./nav";

function Layout({ children }) {
  return (
    <Container pt="10" maxW="container.lg">
      <Nav></Nav>
      {children}
    </Container>
  );
}

export default Layout;
