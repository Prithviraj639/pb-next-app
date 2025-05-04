import axios from "axios";
import Image from "next/image";

export default async function  Home() {
  const products = await axios.get('https://fakestoreapi.com/products')
    .then(response => response.data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Product List</h1>
      <ul className="list-disc">
        {products.map((product) => (
          <li key={product.id} className="my-2">
            <h2 className="text-2xl">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <Image src={product.image} height={300} width={300} alt={product.title} className="w-32 h-32 object-cover" />
          </li>
        ))}
      </ul>
    </main>
    
  );
}
