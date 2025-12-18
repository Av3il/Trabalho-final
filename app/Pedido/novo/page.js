import { redirect } from 'next/navigation';
import { Pedido, Cliente } from '../../../database/tables.js';

async function inserePedido(formData) {
    'use server';
    const dados = {
        idCliente: formData.get('idCliente'),
        status: formData.get('status'),
        preco_total: formData.get('preco_total'),
        forma_pagamento: formData.get('forma_pagamento')
    };
    await Pedido.create(dados);
    redirect('/Pedido');
}

export default async function TelaNovoPedido() {
    const cliente = await Cliente.findAll();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Novo Pedido</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Pedido" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Pedidos</a>
            </div>
            <form action={inserePedido} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor="idCliente" style={{ fontWeight: 'bold' }}>Cliente</label>
                <select name="idCliente" required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    {cliente.map(cli => (
                        <option key={cli.idCliente} value={cli.idCliente}>
                            {cli.idCliente} - {cli.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="status" style={{ fontWeight: 'bold', marginTop: '10px' }}>Status</label>
                <input type="text" name="status" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="preco_total" style={{ fontWeight: 'bold', marginTop: '10px' }}>Preço Total</label>
                <input type="number" name="preco_total" step="0.01" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="forma_pagamento" style={{ fontWeight: 'bold', marginTop: '10px' }}>Forma de Pagamento</label>
                <input type="text" name="forma_pagamento" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Cadastrar Pedido</button>
            </form>
        </div>
    );
}
