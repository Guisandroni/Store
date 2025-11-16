import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useProdutoStore } from "../../store/produto";
import { useState } from "react";

export function ProdutoCard({ produto }) {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  const [updatedProduto, setUpdatedProduto] = useState(produto);
  const { isOpen, onOpen, onClose } = useDisclosure(); // abrir e fechar model
  const toast = useToast(); //footer ação ao deletar / criar produto
  const { deleteProduto, updateProduto } = useProdutoStore();

  const handleUpdateProduto = async (pid, updatedProduto) => {
    const { success, message } = await updateProduto(pid, updatedProduto);
    
    if (!success) {
      toast({
        title: "Erro",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduto(pid);
    if (!success) {
      toast({
        title: "Erro",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadown="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={produto.image}
        alt={produto.name}
        h={48}
        w={"full"}
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {produto.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          R${produto.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />

          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(produto.id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Atualizar Produtos</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Nome do Produto"
                name="name"
                value={updatedProduto.name}
                onChange={(e) => setUpdatedProduto({...updatedProduto, name: e.target.value})}
              />
              <Input
                placeholder="Preço"
                name="price"
                type="number"
                value={updatedProduto.price}
                onChange={(e) =>
                  setUpdatedProduto({ ...updatedProduto, price: parseFloat(e.target.value) || "" })
                }
              />
              
              <Input
                placeholder="URL da imagem"
                name="image"
                type="url"
                value={updatedProduto.image}
                onChange={(e) =>
                  setUpdatedProduto({ ...updatedProduto, image: e.target.value })
                }
              />
              
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
            colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduto(produto.id, updatedProduto)}
            >
              Atualizar
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
