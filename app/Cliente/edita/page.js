import { Cliente } from "../../../database/tables";
import { redirect } from 'next/navigation';


async function editaCliente(formData){
    "use server";
    const id = formData.get('idCliente');
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefone = formData.get('telefone');
    const senha = formData.get('senha');
    const endereco = formData.get('endereco');
    const data_cadastro = formData.get('data_cadastro');

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    cliente.nome = nome;
    cliente.email = email;
    cliente.telefone = telefone;
    cliente.senha = senha;
    cliente.endereco = endereco;
    cliente.data_cadastro = data_cadastro;

    await cliente.save();

    redirect('/Cliente');
}

async function TelaEditaCliente({ searchParams}){
    const id = searchParams.idCliente; //Para teste, usar um id existente
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Cliente</h2>
                <p>Cliente com ID {id} não encontrado.</p>
                <a href="/Cliente" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Voltar para Clientes</a>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Cliente</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Cliente" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Clientes</a>
            </div>
            <form action={editaCliente} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                <input type="hidden" name="idCliente" defaultValue={cliente.idCliente} />

                <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Nome</label>
                <input type="text" name="nome" defaultValue={cliente.nome} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="email" style={{ fontWeight: 'bold', marginTop: '10px' }}>Email</label>
                <input type="text" name="email" defaultValue={cliente.email} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="telefone" style={{ fontWeight: 'bold', marginTop: '10px' }}>Telefone</label>
                <input type="text" name="telefone" defaultValue={cliente.telefone} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="senha" style={{ fontWeight: 'bold', marginTop: '10px' }}>Senha</label>
                <input type="text" name="senha" defaultValue={cliente.senha} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="endereco" style={{ fontWeight: 'bold', marginTop: '10px' }}>Endereço</label>
                <input type="text" name="endereco" defaultValue={cliente.endereco} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="data_cadastro" style={{ fontWeight: 'bold', marginTop: '10px' }}>Data de Cadastro</label>
                <input type="text" name="data_cadastro" defaultValue={cliente.data_cadastro} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Atualizar Cliente</button>

            </form>
        </div>
    )
}

export default TelaEditaCliente;