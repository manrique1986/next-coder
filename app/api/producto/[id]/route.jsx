import { NextResponse } from "next/server";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "app/components/firebase/config";

export async function DELETE(request, { params }) {
  const { id } = params; 

  try {
    const productRef = doc(db, "Productos", id); 
    await deleteDoc(productRef); 

    return NextResponse.json({ message: "Producto eliminado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
    const { id } = params; 
  
    try {
      const updatedProductData = await request.json(); 
  
      const docRef = doc(db, "Productos", id); 
      await updateDoc(docRef, updatedProductData); 
  
      return NextResponse.json({ message: "Producto actualizado con éxito" }, { status: 200 });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 });
    }
  }