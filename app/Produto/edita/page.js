import { Produto} from "../../../database/tables";
import { redirect } from 'next/navigation';


async function editaProduto(formData){
    "use server";
    const id = formData.get('idProduto');
    const nome = formData.get('nome');
    const estoque = formData.get('qtEstoque');
    const preco = formData.get('preco');
    const descricao = formData.get('descricao');

    const produto = await Produto.findByPk(id);

    if (!produto) {
        throw new Error(`Produto com ID ${id} não encontrado`);
    }

    produto.nome = nome;
    produto.qtEstoque = estoque;
    produto.preco = preco;
    produto.descricao = descricao

    await produto.save();

    redirect('/Produto');
}

export default async function TelaEditaProduto({ searchParams}){
    const id = searchParams.idProduto; //Para teste, usar um id existente
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Produto</h2>
                <p>Produto com ID {id} não encontrado.</p>
                <a href="/Produto" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Voltar para Produtos</a>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Produto</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Produto" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Produtos</a>
            </div>
            <form action={editaProduto} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                <input type="hidden" name="idProduto" defaultValue={produto.idProduto} />

                <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Produto</label>
                <input type="text" name="nome" defaultValue={produto.nome} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="qtEstoque" style={{ fontWeight: 'bold', marginTop: '10px' }}>Estoque</label>
                <input type="number" name="qtEstoque" defaultValue={produto.qtEstoque} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="preco" style={{ fontWeight: 'bold', marginTop: '10px' }}>Valor</label>
                <input type="number" step="0.01" name="preco" defaultValue={produto.preco} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="descricao" style={{ fontWeight: 'bold', marginTop: '10px' }}>Descrição</label>
                <input type="text" name="descricao" defaultValue={produto.descricao} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Atualizar</button>

            </form>
        </div>
    )
}