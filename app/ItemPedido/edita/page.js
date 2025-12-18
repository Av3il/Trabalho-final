import { ItemPedido, Pedido, Produto } from "../../../database/tables";
import { redirect } from 'next/navigation';

async function editaItemPedido(formData) {
    "use server";
    const id = formData.get('idItemPedido');
    const idPedido = formData.get('idPedido');
    const idProduto = formData.get('idProduto');
    const quantidade = formData.get('quantidade');
    const preco_unitario = formData.get('preco_unitario');
    const subtotal = quantidade * preco_unitario;

    const item = await ItemPedido.findByPk(id);

    if (!item) {
        throw new Error(`Item de Pedido com ID ${id} não encontrado`);
    }

    item.idPedido = idPedido;
    item.idProduto = idProduto;
    item.quantidade = quantidade;
    item.preco_unitario = preco_unitario;
    item.subtotal = subtotal;

    await item.save();

    redirect('/ItemPedido');
}

export default async function TelaEditaItemPedido({ searchParams }) {
    const id = searchParams.idItemPedido;
    const item = await ItemPedido.findByPk(id);
    const pedidos = await Pedido.findAll();
    const produtos = await Produto.findAll();

    if (!item) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Item de Pedido</h2>
                <p>Item de Pedido com ID {id} não encontrado.</p>
                <a href="/ItemPedido" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Voltar para Itens de Pedido</a>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Item de Pedido</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/ItemPedido" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Itens de Pedido</a>
            </div>
            <form action={editaItemPedido} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="hidden" name="idItemPedido" defaultValue={item.idItemPedido} />

                <label htmlFor="idPedido" style={{ fontWeight: 'bold' }}>Pedido</label>
                <select name="idPedido" defaultValue={item.idPedido} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {pedidos.map(pedido => (
                        <option key={pedido.idPedido} value={pedido.idPedido}>
                            {pedido.idPedido} - {pedido.idCliente}
                        </option>
                    ))}
                </select>

                <label htmlFor="idProduto" style={{ fontWeight: 'bold', marginTop: '10px' }}>Produto</label>
                <select name="idProduto" defaultValue={item.idProduto} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {produtos.map(produto => (
                        <option key={produto.idProduto} value={produto.idProduto}>
                            {produto.idProduto} - {produto.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="quantidade" style={{ fontWeight: 'bold', marginTop: '10px' }}>Quantidade</label>
                <input type="number" name="quantidade" defaultValue={item.quantidade} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="preco_unitario" style={{ fontWeight: 'bold', marginTop: '10px' }}>Preço Unitário</label>
                <input type="number" step="0.01" name="preco_unitario" defaultValue={item.preco_unitario} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Atualizar Item</button>
            </form>
        </div>
    )
}