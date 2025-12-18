import { redirect } from 'next/navigation';
import { ItemPedido, Pedido, Produto } from '../../../database/tables.js';

async function insereItemPedido(formData) {
    'use server';
    const dados = {
        idPedido: formData.get('idPedido'),
        idProduto: formData.get('idProduto'),
        quantidade: formData.get('quantidade'),
        preco_unitario: formData.get('preco_unitario')
    };
    await ItemPedido.create(dados);
    redirect('/ItemPedido');
}

export default async function TelaNovoItemPedido() {
    const pedido = await Pedido.findAll();
    const produto = await Produto.findAll();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Novo Item de Pedido</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/ItemPedido" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Itens de Pedido</a>
            </div>
            <form action={insereItemPedido} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="idPedido" style={{ fontWeight: 'bold' }}>Pedido</label>
                <select name="idPedido" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    {pedido.map(ped => (
                        <option key={ped.idPedido} value={ped.idPedido}>
                            {ped.idPedido} - {ped.idCliente}
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

                <label htmlFor="quantidade" style={{ fontWeight: 'bold', marginTop: '10px' }}>Quantidade</label>
                <input type="number" name="quantidade" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="preco_unitario" style={{ fontWeight: 'bold', marginTop: '10px' }}>Preço Unitário</label>
                <input type="number" step="0.01" name="preco_unitario" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Cadastrar Item</button>
            </form>
        </div>
    );
}
