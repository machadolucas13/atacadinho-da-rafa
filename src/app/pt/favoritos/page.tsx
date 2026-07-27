import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus Favoritos - Atacadinho da Rafa",
  description: "Seus posts e produtos salvos para revisar depois. Gerencie seus achados favoritos em um só lugar.",
  robots: { index: false, follow: true },
};

import FavoritosClient from "./FavoritosClient";

export default function FavoritosPage() {
  return <FavoritosClient />;
}

