import { AvaliacaoProduto } from "../../database/tables.js";
import { redirect } from 'next/navigation';
import DeleteButton from "../../componentes/DeleteButton";

async function getAvaliacoes() {
    const avaliacoes = await AvaliacaoProduto.findAll();
    return avaliacoes;
}

async function removeAvaliacao(formData) {
    "use server";
    const id = formData.get('idAvaliacao');
    const avaliacao = await AvaliacaoProduto.findByPk(id);
    await avaliacao.destroy();
    redirect('/AvaliacaoProduto');
}

export default async function AvaliacoesPage() {
    const avaliacoes = await getAvaliacoes();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Lista de Avaliações de Produtos</h1>
            <div style={{ marginBottom: '15px' }}>
                <a href="/AvaliacaoProduto/novo" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>+ Add Avaliação</a>
                <a href="/" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>← Voltar para Home</a>
            </div>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Produto</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Cliente</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Avaliação</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Comentário</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {avaliacoes.map((avaliacao) => (
                        <tr key={avaliacao.idAvaliacao}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{avaliacao.idAvaliacao}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{avaliacao.idProduto}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{avaliacao.idCliente}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{avaliacao.avaliacao}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{avaliacao.comentario}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <a href={`/AvaliacaoProduto/edita?idAvaliacao=${avaliacao.idAvaliacao}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</a>
                                <form action={removeAvaliacao} style={{ display: 'inline' }}>
                                    <input type="hidden" name="idAvaliacao" defaultValue={avaliacao.idAvaliacao} />
                                    <DeleteButton text="Excluir" confirmationMessage="Tem certeza que deseja excluir esta avaliação? Esta ação não pode ser desfeita." />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
