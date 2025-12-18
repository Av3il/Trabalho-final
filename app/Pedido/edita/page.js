import { Pedido, Cliente } from "../../../database/tables";
import { redirect } from 'next/navigation';

async function editaPedido(formData) {
    "use server";
    const id = formData.get('idPedido');
    const idCliente = formData.get('idCliente');
    const status = formData.get('status');
    const preco_total = formData.get('preco_total');
    const forma_pagamento = formData.get('forma_pagamento');

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
        throw new Error(`Pedido com ID ${id} não encontrado`);
    }

    pedido.idCliente = idCliente;
    pedido.status = status;
    pedido.preco_total = preco_total;
    pedido.forma_pagamento = forma_pagamento;

    await pedido.save();

    redirect('/Pedido');
}

export default async function TelaEditaPedido({ searchParams }) {
    const id = searchParams.idPedido;
    const pedido = await Pedido.findByPk(id);
    const clientes = await Cliente.findAll();

    if (!pedido) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Pedido</h2>
                <p>Pedido com ID {id} não encontrado.</p>
                <a href="/Pedido" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Voltar para Pedidos</a>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Pedido</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Pedido" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Pedidos</a>
            </div>
            <form action={editaPedido} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="hidden" name="idPedido" defaultValue={pedido.idPedido} />

                <label htmlFor="idCliente" style={{ fontWeight: 'bold' }}>Cliente</label>
                <select name="idCliente" defaultValue={pedido.idCliente} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {clientes.map(cliente => (
                        <option key={cliente.idCliente} value={cliente.idCliente}>
                            {cliente.idCliente} - {cliente.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="status" style={{ fontWeight: 'bold', marginTop: '10px' }}>Status</label>
                <input type="text" name="status" defaultValue={pedido.status} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="preco_total" style={{ fontWeight: 'bold', marginTop: '10px' }}>Preço Total</label>
                <input type="number" step="0.01" name="preco_total" defaultValue={pedido.preco_total} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="forma_pagamento" style={{ fontWeight: 'bold', marginTop: '10px' }}>Forma de Pagamento</label>
                <input type="text" name="forma_pagamento" defaultValue={pedido.forma_pagamento} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Atualizar Pedido</button>
            </form>
        </div>
    )
}