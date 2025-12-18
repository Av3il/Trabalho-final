import { Pedido, Cliente } from "../../database/tables.js";
import { redirect } from 'next/navigation';
import DeleteButton from "../../componentes/DeleteButton";

async function getPedidos() {
    const pedidos = await Pedido.findAll();
    return pedidos;
}

async function removePedido(formData) {
    "use server";
    const id = formData.get('idPedido');
    const pedido = await Pedido.findByPk(id);
    await pedido.destroy();
    redirect('/Pedido');
}

export default async function PedidosPage() {
    const pedidos = await getPedidos();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Lista de Pedidos</h1>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Pedido/novo" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>+ Add Pedido</a>
                <a href="/" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>← Voltar para Home</a>
            </div>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Cliente</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Preço Total</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Forma Pagamento</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.idPedido}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pedido.idPedido}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pedido.idCliente}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pedido.status}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pedido.preco_total}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pedido.forma_pagamento}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <a href={`/Pedido/edita?idPedido=${pedido.idPedido}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</a>
                                <form action={removePedido} style={{ display: 'inline' }}>
                                    <input type="hidden" name="idPedido" defaultValue={pedido.idPedido} />
                                    <DeleteButton text="Excluir" confirmationMessage="Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita." />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
