import { redirect } from 'next/navigation';
import { Cliente } from '../../../database/tables.js';

async function insereCliente(formData) {
    'use server';
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        senha: formData.get('senha')
    };
    await Cliente.create(dados);
    redirect('/Cliente');
}

export default function TelaNovoCliente() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Novo Cliente</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Cliente" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Clientes</a>
            </div>
            <form action={insereCliente} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Nome</label>
                <input type="text" name="nome" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="email" style={{ fontWeight: 'bold', marginTop: '10px' }}>Email</label>
                <input type="email" name="email" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="telefone" style={{ fontWeight: 'bold', marginTop: '10px' }}>Telefone</label>
                <input type="text" name="telefone" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="senha" style={{ fontWeight: 'bold', marginTop: '10px' }}>Senha</label>
                <input type="password" name="senha" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Cadastrar Cliente</button>
            </form>
        </div>
    );
}

