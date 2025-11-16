import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ProdutoCard } from "../components/produtoCard";
import { useEffect } from "react";
import { useProdutoStore } from "../../store/produto";


export function Home(){

    const {fetchProdutos, produtos} = useProdutoStore()

    useEffect(()=> {
        fetchProdutos()
    }), [fetchProdutos]


    return(
        <Container maxW='container.xl' py={12}>

            <VStack spacing={8}>
            <Text
                fontSize={'30'}
                fontWeight={'bold'}
                bgGradient={"linear(to-r, cyan.400, blue.500"}
                bgClip={'text'}
                textAlign={'center'}
            >
                Produtos Criados
            </Text>

            <SimpleGrid
               columns={{
                base:1,
                md:2,
                lg:3
              
               }}
            
               spacing={10}
               w={'full'}

            >
               {produtos.map((produto)=>(
                <ProdutoCard  key={produto.id} produto={produto}/>
               )
            )}

            </SimpleGrid>

            {produtos.length=== 0 &&(
             
                
                <Text fontSize='2xl' mb={4} textAlign={'center'} fontWeight={'bold'} color='gray.600' >
                        Sem produtos 😢

                        <Link to={'/create'} >
                            <Text fontSize='2xl' textDecoration='none' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                                Crie um Produto
                            </Text>
                        </Link>
                    </Text>
                    
                        
                     
            )}
            </VStack>
        </Container>

    )
}