import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
export function NavBar() {
    const {colorMode, toggleColorMode} = useColorMode()

  return (


    <Container maxWidth={"1140px"} px={4} p={10} >
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      > 
      <Link to={"/"}>
        <Text
          bgGradient="linear(to-r, #7f99e2, #2d80ce)"
          bgClip="text"
          fontSize={{ base: "22", sm: "40" }}
          fontWeight="extrabold"
          textTransform={"uppercase"}
        >
        Store 🛒
        </Text>
        </Link>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={'/create'}>
            <Button><PlusSquareIcon fontSize={22} /></Button>
          </Link>

          <Link to={'/'}>
            <Button onClick={toggleColorMode}>{colorMode === 'light' ? 'Dark' : 'Light'}</Button>
          </Link>
        </HStack>
        
      </Flex>
    </Container>
  );
}
