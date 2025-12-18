import Menu from "../componentes/menu";
export const metadata = {
  title: 'Lojas',
  description: 'Atividade Node.js com Next.js',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Menu />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>Alfredo.</p>
        </footer>
      </body>
    </html>
  )
}
