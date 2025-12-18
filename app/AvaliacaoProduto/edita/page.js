import { AvaliacaoProduto, Produto, Cliente } from "../../../database/tables";
import { redirect } from 'next/navigation';

async function editaAvaliacao(formData) {
    "use server";
    const id = formData.get('idAvaliacao');
    const idProduto = formData.get('idProduto');
    const idCliente = formData.get('idCliente');
    const avaliacao = formData.get('avaliacao');
    const comentario = formData.get('comentario');

    const aval = await AvaliacaoProduto.findByPk(id);

    if (!aval) {
        throw new Error(`Avaliação com ID ${id} não encontrada`);
    }

    aval.idProduto = idProduto;
    aval.idCliente = idCliente;
    aval.avaliacao = avaliacao;
    aval.comentario = comentario;

    await aval.save();

    redirect('/AvaliacaoProduto');
}

export default async function TelaEditaAvaliacao({ searchParams }) {
    const id = searchParams.idAvaliacao;
    const avaliacao = await AvaliacaoProduto.findByPk(id);
    const produtos = await Produto.findAll();
    const clientes = await Cliente.findAll();

    if (!avaliacao) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Avaliação de Produto</h2>
                <p>Avaliação com ID {id} não encontrada.</p>
                <a href="/AvaliacaoProduto" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Voltar para Avaliações</a>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Avaliação de Produto</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/AvaliacaoProduto" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Avaliações</a>
            </div>
            <form action={editaAvaliacao} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="hidden" name="idAvaliacao" defaultValue={avaliacao.idAvaliacao} />

                <label htmlFor="idProduto" style={{ fontWeight: 'bold' }}>Produto</label>
                <select name="idProduto" defaultValue={avaliacao.idProduto} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {produtos.map(produto => (
                        <option key={produto.idProduto} value={produto.idProduto}>
                            {produto.idProduto} - {produto.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="idCliente" style={{ fontWeight: 'bold', marginTop: '10px' }}>Cliente</label>
                <select name="idCliente" defaultValue={avaliacao.idCliente} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {clientes.map(cliente => (
                        <option key={cliente.idCliente} value={cliente.idCliente}>
                            {cliente.idCliente} - {cliente.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="avaliacao" style={{ fontWeight: 'bold', marginTop: '10px' }}>Avaliação (1 a 5)</label>
                <input type="number" name="avaliacao" min="1" max="5" defaultValue={avaliacao.avaliacao} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="comentario" style={{ fontWeight: 'bold', marginTop: '10px' }}>Comentário</label>
                <textarea name="comentario" defaultValue={avaliacao.comentario} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px' }}></textarea>

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Atualizar Avaliação</button>
            </form>
        </div>
    )
}