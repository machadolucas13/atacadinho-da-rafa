import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-pink-600">
              Atacadinho da Rafa
            </h3>
            <p className="mt-2 text-gray-600">
              Descubra os melhores produtos, achados e ofertas. Curadoria de
              moda, decoração, tecnologia e muito mais.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Categorias</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/categorias/moda-feminina"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Moda Feminina
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias/casa-decoracao"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Casa e Decoração
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias/cozinha"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Cozinha
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias/tecnologia"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Tecnologia
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Links Úteis</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Atacadinho da Rafa. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            Este site contém links de afiliado. Podemos receber uma comissão se
            você fizer uma compra.
          </p>
        </div>
      </div>
    </footer>
  );
}
