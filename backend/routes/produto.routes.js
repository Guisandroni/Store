

import express from 'express'
import { deleteProdutos, getProdutos, postProdutos, putProdutos } from '../controllers/produto.controller.js'



const router = express.Router()

router.get('/', getProdutos) //listar


router.post('/', postProdutos) //criar


router.delete('/:id', deleteProdutos) //deletar


router.put('/:id', putProdutos) //atualizar


export default router