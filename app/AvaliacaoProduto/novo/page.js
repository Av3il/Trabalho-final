import { redirect } from 'next/navigation';
import { AvaliacaoProduto, Produto, Cliente } from '../../../database/tables.js'

async function insereAvaliacao(formData) {
    'use server';
    const dados = {
        idProduto: formData.get('idProduto'),
        idCliente: formData.get('idCliente'),
        avaliacao: formData.get('avaliacao'),
        comentario: formData.get('comentario')
    };
    await AvaliacaoProduto.create(dados);
    redirect('/AvaliacaoProduto');
}

export default async function TelaNovaAvaliacao() {
    const produto = await Produto.findAll();
    const cliente = await Cliente.findAll();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Nova Avaliação de Produto</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/AvaliacaoProduto" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Avaliações</a>
            </div>
            <form action={insereAvaliacao} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="idCliente" style={{ fontWeight: 'bold' }}>Cliente</label>
                <select name="idCliente" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    {cliente.map(ped => (
                        <option key={ped.idCliente} value={ped.idCliente}>
                            {ped.idCliente} - {ped.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="idProduto" style={{ fontWeight: 'bold', marginTop: '10px' }}>Produto</label>
                <select name="idProduto" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    {produto.map(ped => (
                        <option key={ped.idProduto} value={ped.idProduto}>
                            {ped.idProduto} - {ped.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="avaliacao" style={{ fontWeight: 'bold', marginTop: '10px' }}>Avaliação (1 a 5)</label>
                <input type="number" name="avaliacao" min="1" max="5" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="comentario" style={{ fontWeight: 'bold', marginTop: '10px' }}>Comentário</label>
                <textarea name="comentario" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}></textarea>

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Cadastrar Avaliação</button>
            </form>
        </div>
    );
}
