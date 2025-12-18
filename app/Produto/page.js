import { redirect } from 'next/navigation';
import { Produto } from '../../database/tables.js';
import DeleteButton from "../../componentes/DeleteButton";

async function removeProduto(formData) {
  "use server";
  const id = formData.get('idProduto');
  const produto = await Produto.findByPk(id);
  await produto.destroy();
  redirect('/Produto');
}

export default async function ProdutosPage() {
    const produtos = await Produto.findAll();
    console.log('dados de Produto');
    return(
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Produtos</h1>
            <div style={{ marginBottom: '15px' }}>
                <a href='/Produto/novo' style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>+ Criar novo Produto</a>
                <a href="/" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>← Voltar para Home</a>
            </div>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>NOME</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>DESCRIÇÃO</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>PREÇO</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ESTOQUE</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(function(produto){
                        return(
                            <tr key={produto.idProduto}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{produto.idProduto}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{produto.nome}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{produto.descricao}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{produto.preco}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{produto.qtEstoque}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <a href={`/Produto/edita?idProduto=${produto.idProduto}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</a>
                                    <form action={removeProduto} style={{ display: 'inline' }}>
                                        <input type="hidden" name="idProduto" defaultValue={produto.idProduto}/>
                                        <DeleteButton text="Excluir" confirmationMessage="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita." />
                                    </form>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
