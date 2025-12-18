import {redirect} from 'next/navigation';
import { Produto } from '../../../database/tables.js';


async function insereProduto(formData){
    'use server';
    const dados = {
        nome: formData.get('nome'),
        qtEstoque: formData.get('qtEstoque'),
        preco: formData.get('preco'),
        descricao: formData.get('descricao')
    };
    await Produto.create(dados);
    redirect('/Produto');
}

export default function TelaNovoProduto(){
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Novo Produto</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Produto" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Produtos</a>
            </div>
            <form action={insereProduto} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Produto</label>
                <input type="text" name="nome" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="qtEstoque" style={{ fontWeight: 'bold', marginTop: '10px' }}>Estoque</label>
                <input type="number" name="qtEstoque" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="preco" style={{ fontWeight: 'bold', marginTop: '10px' }}>Valor</label>
                <input type="number" step="0.01" name="preco" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="descricao" style={{ fontWeight: 'bold', marginTop: '10px' }}>Descrição</label>
                <input type="text" name="descricao" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Cadastrar</button>

            </form>
        </div>
    )
}
