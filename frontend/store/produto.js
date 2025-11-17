
import {create} from 'zustand'
import { getApiUrl } from '../src/config/api'


export const useProdutoStore = create ((set) => ({

    produtos:[],
    setProdutos:(produto) => set({produto}),
    createProduto: async (newProduto) => {
        if(!newProduto.name || !newProduto.image || !newProduto.price){
            return {success:false, message:'Por favor preencha os campos vazios'}
        }

        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if(!urlPattern.test(newProduto.image)){
            return {success:false, message:'Por favor insira uma URL válida para a imagem'}
        }

        const res = await fetch(getApiUrl('/api/produtos'),{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newProduto),
        })
        const data = await res.json()
        set((state) => ({produtos:[...state.produtos, data.data]}))
        return {success:true, message:'Produto criado com sucesso'}
    },

    fetchProdutos: async ()=>{
        const res = await fetch(getApiUrl('/api/produtos'))
        const data = await res.json()
        set({produtos: data.data })
    },

    deleteProduto: async (pid) =>{
        const rest = await fetch(getApiUrl(`/api/produtos/${pid}`), {
            method:'DELETE',
        })
        const data = await rest.json()
        if(!data.success) return {success: false, message: data.message}
        set (state=> ({produtos: state.produtos.filter(produto => produto.id !== pid)}))
        return {success: true, message: data.message}
    },

    updateProduto: async (pid, updatedProduto) =>{
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if(!urlPattern.test(updatedProduto.image)){
            return {success:false, message:'Por favor insira uma URL válida para a imagem'}
        }

        const rest = await fetch(getApiUrl(`/api/produtos/${pid}`),{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updatedProduto),
        })

        const data = await rest.json()
        if(!data.success) return {success:false, message: data.message}
        set ((state)=> ({
            produtos: state.produtos.map((produto) => (produto.id === pid ? {... produto,... data.data }: produto))
        }) )

        return {success: true, message: data.message}
    }
})
)
