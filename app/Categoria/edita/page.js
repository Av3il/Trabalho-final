import { Categoria } from "../../../database/tables";
import { redirect } from 'next/navigation';


async function editaCategoria(formData){
    "use server";
    const id = formData.get('idCategoria');
    const nome = formData.get('nome');
    const descricao = formData.get('descricao');

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
    }

    categoria.nome = nome;
    categoria.descricao = descricao;

    await categoria.save();

    redirect('/Categoria');
}

async function TelaEditaCategoria({ searchParams}){
    const id = searchParams.idCategoria;
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Categoria</h2>
                <p>Categoria com ID {id} não encontrada.</p>
                <a href="/Categoria" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Voltar para Categorias</a>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>Editar Categoria</h2>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Categoria" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>← Voltar para Categorias</a>
            </div>
            <form action={editaCategoria} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                <input type="hidden" name="idCategoria" defaultValue={categoria.idCategoria} />

                <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Nome</label>
                <input type="text" name="nome" defaultValue={categoria.nome} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />

                <label htmlFor="descricao" style={{ fontWeight: 'bold', marginTop: '10px' }}>Descrição</label>
                <textarea name="descricao" defaultValue={categoria.descricao || ''} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}></textarea>

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Atualizar Categoria</button>

            </form>
        </div>
    )
}

export default TelaEditaCategoria;