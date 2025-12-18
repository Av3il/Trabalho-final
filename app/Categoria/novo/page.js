import { redirect } from 'next/navigation';
import { Categoria } from '../../../database/tables.js';

async function insereCategoria(formData) {
    'use server';
    const dados = {
        nome: formData.get('nome'),
        descricao: formData.get('descricao')
    };
    await Categoria.create(dados);
    redirect('/Categoria');
}

export default function TelaNovaCategoria() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Nova Categoria</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Categoria" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Categorias</a>
            </div>
            <form action={insereCategoria} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Nome</label>
                <input type="text" name="nome" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="descricao" style={{ fontWeight: 'bold', marginTop: '10px' }}>Descrição</label>
                <textarea name="descricao" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}></textarea>

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Cadastrar Categoria</button>
            </form>
        </div>
    );
}