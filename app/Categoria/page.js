import { Categoria, Produto } from "../../database/tables.js";
import { redirect } from 'next/navigation';
import DeleteButton from "../../componentes/DeleteButton";

async function getCategorias() {
    const categorias = await Categoria.findAll();
    return categorias;
}

async function removeCategoria(formData) {
    "use server";
    const id = formData.get('idCategoria');
    const categoria = await Categoria.findByPk(id);
    await categoria.destroy();
    redirect('/Categoria');
}

async function CategoriasPage() {
    const categorias = await getCategorias();

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Lista de Categorias</h1>
            <div style={{ marginBottom: '15px' }}>
                <a href="/Categoria/novo" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' }}>+ Add Categoria</a>
                <a href="/" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>← Voltar para Home</a>
            </div>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Descrição</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{categoria.idCategoria}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{categoria.nome}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{categoria.descricao || '-'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <a href={`/Categoria/edita?idCategoria=${categoria.idCategoria}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</a>
                                <form action={removeCategoria} style={{ display: 'inline' }}>
                                    <input type="hidden" name="idCategoria" defaultValue={categoria.idCategoria} />
                                    <DeleteButton text="Excluir" confirmationMessage="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita." />
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriasPage;