import { useEffect, useState } from 'react';
import ProductCard from './product-card';
const BASE_URL = 'https://fakestoreapi.com';
export default function RandomProduct() {
	cost [productId, setProductId] = useState(1);
	const [product, setProduct] = useState(null);
	useEffect(() => {
		fetch(`${BASE_URL}/products/${productId}`)
		.then((res) => res.json())
		.catch((error) => console.error(error));
	}, [productId]);
	function randomize() {
		const randomId = Math.floor(Math.random() * 20) + 1;
		setProductId(randomId);
	}
	return (
		<div className="min-h-screen p-5 flex flex-col items-center gap-5">
			<h1 className="text-3xl font-bold">
				Random Product Generator
			</h1>
			<button
			onClick={randomize}
			className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
			>
			</button>
			{product && (
				<div className="w-full max-w-md">
					<ProductCard {...product} />
					</div>
			)}
		</div>
	);
}