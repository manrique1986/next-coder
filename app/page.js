import Image from "next/image";


export const metadata ={
  title: "Alta pinta",
  description: "App para venta de pizza"
}


export default function Home() {
  
  return (
    <>

    <main className="flex   flex-col items-center justify-between p-24">
    <Image
    src={"/logoPiza.png"}
    alt=""
    width={400}
    height={400}/>
    </main>
    </>
  );
}
