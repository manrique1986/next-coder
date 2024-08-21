import { NextResponse } from "next/server";
import { productos } from "@/Data/mockData";

// Función para simular un retraso (por ejemplo, 1000 ms)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request, { params }) {
  const { category } = params;

  // Lógica para obtener todos los productos si no se pasa ninguna categoría
  const data =
    !category || category === undefined
      ? productos // Devuelve todos los productos si no hay categoría
      : productos.filter(
          (producto) =>
            producto.category.toLowerCase() === category.toLowerCase()
        );

  // Simulación de retardo en la respuesta
  await sleep(1000);

  // Devolución de los productos filtrados o todos los productos
  return NextResponse.json(data);
}