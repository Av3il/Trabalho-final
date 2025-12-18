import "./css/home.css";

async function Home() {
    return (
        <div id="home-container">
            {/* Título Principal */}
            <header className="home-header">
                <h1 className="main-title">
                    🏃‍♂️ Sportzone 🏃‍♂️
                </h1>
                {/* Slogan ou Breve Descrição */}
                <p className="slogan">
                    Onde a Paixão vira performance. Aqui você encontra equipamentos de alta qualidade!
                </p>
            </header>

            <hr className="divider" />

            {/* Seção de Destaques/Categorias */}
            <section className="highlights-section">
                <h2 className="section-title">O que você encontra aqui:</h2>
                <div className="highlights-grid">
                    <div className="highlight-item">👟 Calçados Esportivos</div>
                    <div className="highlight-item">👕 Vestuário</div>
                    <div className="highlight-item">🥊 Equipamentos</div>
                    <div className="highlight-item">🏋️ Academia</div>
                </div>
            </section>

            <hr className="divider" />

            {/* Chamada para Ação Principal */}
            <div className="cta-container">
                <a href='/Produto' className='cta-button'>
                    Ver Produtos →
                </a>
            </div>

        </div>
    );
}

export default Home;
  