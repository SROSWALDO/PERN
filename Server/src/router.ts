import { Router } from "express";
import { createProduct, deleteProduct, getProductByID, getProducts, updatedProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErros } from "./middleware";

const router = Router()

/**
 * @swagger
 * components:
 *     schemas:
 *      Product:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: The Product ID
 *              example: 1
 *            name:
 *              type: string
 *              description: The Product name
 *              example: Monitor Curvo de 49 pulgadas
 */


//* Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErros,
    getProductByID
)

router.post('/', 

    body('name')
    .notEmpty().withMessage('El nombre el Producto no puede ir vacio'),

    body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no es valido'),
    handleInputErros,
    createProduct
)

router.put('/:id',
    body('name')
    .notEmpty().withMessage('El nombre el Producto no puede ir vacio'),

    body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no es valido'),
    handleInputErros,
    updatedProduct

)

router.delete('/:id',
    param('id').isInt().withMessage('Id no valido'),
    handleInputErros,
    deleteProduct)

export default router