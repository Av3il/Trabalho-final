import { ItemPedido } from "../../database/tables.js";
import { redirect } from 'next/navigation';
import DeleteButton from "../../componentes/DeleteButton";

async function getItensPedido() {
    const itens = await ItemPedido.findAll();
    return itens;
}

async function removeItemPedido(formData) {
    "use server";
    const id = formData.get('idItemPedido');
    const item = await ItemPedido.findByPk(id);
    await item.destroy();
    redirect('/ItemPedido');
}

export default async function ItensPedidoPage() {
    const itens = await getItensPedido();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Lista de Itens de Pedido</h1>
            <div style={{ marginBottom: '15px' }}>
                <a href="/ItemPedido/novo" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>+ Add Item</a>
                <a href="/" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>← Voltar para Home</a>
            </div>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Pedido</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Produto</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantidade</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Preço Unitário</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subtotal</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr key={item.idItemPedido}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.idItemPedido}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.idPedido}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.idProduto}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.quantidade}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.preco_unitario}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.subtotal}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <a href={`/ItemPedido/edita?idItemPedido=${item.idItemPedido}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</a>
                                <form action={removeItemPedido} style={{ display: 'inline' }}>
                                    <input type="hidden" name="idItemPedido" defaultValue={item.idItemPedido} />
                                    <DeleteButton text="Excluir" confirmationMessage="Tem certeza que deseja excluir este item de pedido? Esta ação não pode ser desfeita." />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
