import { collection, getDocs } from "firebase/firestore";
import { db } from "app/components/firebase/config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const productosRef = collection(db, "Productos");
    const snapshot = await getDocs(productosRef);

    // Mapea los documentos para incluir el ID del documento
    const productos = snapshot.docs.map((doc) => ({
      id: doc.id, // Aquí incluimos el ID del documento
      ...doc.data(), // Incluimos los datos del documento
    }));

    return NextResponse.json(productos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json({ error: "Error al obtener los productos" }, { status: 500 });
  }
}