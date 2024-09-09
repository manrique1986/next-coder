import { NextResponse } from "next/server";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "app/components/firebase/config";

export async function DELETE(request, { params }) {
  const { id } = params; // Obtener el ID del producto de los parámetros

  try {
    const productRef = doc(db, "Productos", id); // Referencia al documento del producto
    await deleteDoc(productRef); // Eliminar el documento

    return NextResponse.json({ message: "Producto eliminado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
    const { id } = params; // Extrae el ID de los parámetros de la URL
  
    try {
      const updatedProductData = await request.json(); // Obtén los datos enviados en la solicitud PUT
  
      const docRef = doc(db, "Productos", id); // Referencia al documento en Firestore
      await updateDoc(docRef, updatedProductData); // Actualiza el documento con los nuevos datos
  
      return NextResponse.json({ message: "Producto actualizado con éxito" }, { status: 200 });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 });
    }
  }