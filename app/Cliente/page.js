import { Cliente } from "../../database/tables.js";
import { redirect } from 'next/navigation';
import DeleteButton from "../../componentes/DeleteButton";

async function getClientes() {
    const clientes = await Cliente.findAll();
    return clientes;
}

async function removeCliente(formData) {
    "use server";
    const id = formData.get('idCliente');
    const cliente = await Cliente.findByPk(id);
    await cliente.destroy();
    redirect('/Cliente');
}

export default async function ClientesPage() {
    const clientes = await getClientes();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Lista de Clientes</h1>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Cliente/novo" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>+ Add Cliente</a>
                <a href="/" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>← Voltar para Home</a>
            </div>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Telefone</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.idCliente}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{cliente.idCliente}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{cliente.nome}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{cliente.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{cliente.telefone}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <a href={`/Cliente/edita?idCliente=${cliente.idCliente}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</a>
                                <form action={removeCliente} style={{ display: 'inline' }}>
                                    <input type="hidden" name="idCliente" defaultValue={cliente.idCliente} />
                                    <DeleteButton text="Excluir" confirmationMessage="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita." />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
