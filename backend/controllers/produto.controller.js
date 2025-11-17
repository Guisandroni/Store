import prisma from "../config/db.js"

export const getProdutos = async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany();
        res.status(200).json({ success: true, data: produtos });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const postProdutos = async (req, res) => {
    const produto = req.body;

    if (!produto.name || !produto.price || !produto.image) {
        return res.status(400).json({ success: false, message: "Por favor inclua todos os atributos" });
    }

    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(produto.image)) {
        return res.status(400).json({ success: false, message: "Por favor insira uma URL válida para a imagem" });
    }

    try {
        const novoProduto = await prisma.produto.create({
            data: {
                name: produto.name,
                price: parseFloat(produto.price),
                image: produto.image
            }
        });
        res.status(201).json({ success: true, data: novoProduto });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProdutos = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await prisma.produto.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!produto) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }

        await prisma.produto.delete({
            where: { id: parseInt(id) }
        });
        
        res.status(200).json({ success: true, message: "Produto Deletado" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao deletar produto" });
    }
};

export const putProdutos = async (req, res) => {
    const { id } = req.params;
    const produto = req.body;

    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(produto.image)) {
        return res.status(400).json({ success: false, message: "Por favor insira uma URL válida para a imagem" });
    }

    try {
        const produtoExistente = await prisma.produto.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!produtoExistente) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }

        const produtoAtualizado = await prisma.produto.update({
            where: { id: parseInt(id) },
            data: {
                name: produto.name,
                price: parseFloat(produto.price),
                image: produto.image
            }
        });
        
        res.status(200).json({ success: true, data: produtoAtualizado });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro ao atualizar produto" });
    }
};