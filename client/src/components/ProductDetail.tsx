import { Product } from "../types"


type ProductDetailProps = {
    product: Product
}
export default function ProductDetail({product} : ProductDetailProps) {
  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            ${product.price}.00
        </td>
        <td className="p-3 text-lg text-gray-800">
            {product.availability ? 'Disponible' : 'No disponible' }
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           
        </td>
    </tr> 
  )
}
