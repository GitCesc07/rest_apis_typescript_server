import { Router } from "express";
import {body, param} from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
* @swagger
* components:
*   schemas: 
*     Product:
*       type: object
*       properties:
*         id:
*             type: integer
*             description: The product Id
*             example: 1
*         name:
*             type: string
*             description: The product name
*             example: Monitor curvo de 32 pulgadas
*         price:
*             type: number
*             description: The product price
*             example: 300
*         availability:
*              type: boolean
*              description: The producto availability
*              example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                             type: array
 *                             items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */
router.get("/",  getProducts)

/**
* @swagger
* /api/products/{id}:
*  get:
*      summary: Get a product by Id
*      tags:
*          - Products
*      description: Return a product based on its unique Id
*      parameters:
*      - in: path
*        name: id
*        description: The Id of the product to retrieve
*        required: true
*        schema:
*            type: integer
*      responses:
*          200:
*              description: Successful Response
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Product'
*          404:
*              description: Not found
*          400:
*              description: Bad Request - Invalid Id
*/
router.get("/:id", 
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  getProductById
)

/**
* @swagger
* /api/products:
*   post:
*        summary: Create a new Products
*        tags:
*             - Products
*        description: Returns a new record in the database
*        requestBody:
*            required: true
*            content:
*                application/json:
*                    schema:
*                        type: object
*                        properties:
*                             name:
*                                  type: string
*                                  exmaple: "Monitor curvo de 49 pulgadas"
*                             price:
*                                   type: number
*                                   example: 399
*        responses:
*            201:
*                description: Successfull response
*                content:
*                    application/json:
*                        schema:
*                            $ref: '#/components/schemas/Product'
*            400:
*                description: Bad Request - Invalid input data
*/

router.post("/", 

  // Validaciones con express-validator
    body("name")
      .notEmpty().withMessage("Debes de agregar el nombre del producto"),

    body("price")
      .notEmpty().withMessage("Debes de agregar el precio del producto")
      .isNumeric().withMessage("El valor no es valido")
      .custom(value => value > 0).withMessage("El precio que estas agregando no es correcto"),

    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                               type: string
 *                               example: "Monitor curvo de 49 pulgadas"
 *                          price:
 *                               type: number
 *                               example: 399
 *                          availability:
 *                               type: boolean
 *                               example: true
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid Id or invalid input data
 *          404:
 *              description: Product not found
 */

router.put("/:id",
  // Validaciones con express-validator
  param("id").isInt().withMessage("Id no valido"),
  body("name")
    .notEmpty()
    .withMessage("Debes de agregar el nombre del producto"),

  body("price")
    .notEmpty()
    .withMessage("Debes de agregar el precio del producto")
    .isNumeric()
    .withMessage("El valor no es valido")
    .custom(value => value > 0)
    .withMessage("El precio que estas agregando no es correcto"),

  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),

  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns the update availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid Id
 *          404:
 *              description: Product not found
 * 
 */

router.patch("/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given id
 *      tags:
 *          - Products
 *      description: Returns a confirmation a message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:
 *              description: Bad Request - invalid Id
 *          404:
 *              description: Product not found
 * 
 */

router.delete("/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  deleteProduct
);


export default router