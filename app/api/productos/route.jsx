import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "app/components/firebase/config";

export async function POST(request) {
  try {
    const productData = await request.json(); // Asegúrate de que los datos se estén obteniendo correctamente

    const docRef = await addDoc(collection(db, "Productos"), productData); // Agrega el producto a Firestore
    const newProduct = {
      id: docRef.id,
      ...productData,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    return NextResponse.json({ error: "Error al agregar el producto" }, { status: 500 });
  }
}
