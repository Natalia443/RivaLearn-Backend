/**
 * @swagger
 *  components:
 *    schemas:
 *      DeckSchema:
 *        type: object
 *        properties:
 *          userId:
 *            type: integer
 *            format: int64
 *            description: id del usuario
 *          deckname:
 *            type: string
 *            description: nombre del deck
 *        required:
 *          - userId
 *          - deckname
 *      UserSchemaReg:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            example: theUser
 *            description: nombre del usuario
 *          password:
 *            minLength: 8
 *            type: string
 *            example: '12345'
 *            description: contraseña del usuario
 *          email:
 *            type: string
 *            format: email
 *            description: correo electronico del usuario
 *        required:
 *          - idUser
 *          - deckName           
 */



