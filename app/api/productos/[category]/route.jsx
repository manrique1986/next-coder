import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config"; 

export async function GET(request, { params }) {
  const { category } = params;

  try {
    const productosRef = collection(db, "Productos");
    const q = category === "all" 
      ? productosRef
      : query(productosRef, where("category", "==", category));

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => doc.data());

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

