import { useNavigate } from "react-router-dom";
import { Product } from "../types";

type ProductDetailProps = {
  product: Product;
};
export default function ProductDetail({ product }: ProductDetailProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">${product.price}.00</td>
      <td className="p-3 text-lg text-gray-800">
        {product.availability ? "Disponible" : "No disponible"}
        {product.id}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
                window.location.href = `/products/${product.id}/edit`;
              }}
            className="bg-indigo-600 rounded-lg w-full hover:bg-indigo-500 text-white text-xs font-bold uppercase p-2 text-center"
          >
            Editar
          </button>
          <button className="bg-red-600 rounded-lg w-full hover:bg-red-500 text-white text-xs font-bold uppercase p-2 text-center">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
