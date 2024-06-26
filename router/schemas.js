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
 *            type: string
 *            minLenght: 8
 *            example: 'abc12345'
 *            description: contraseña del usuario
 *          email:
 *            type: string
 *            format: email
 *            description: correo electronico del usuario
 *        required:
 *          - username
 *          - password
 *          - email
 *      UserSchemaLog:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            example: theUser
 *            description: nombre del usuario
 *          password:
 *            type: string
 *            example: 'abc12345'
 *            description: contraseña del usuario
 *        required:
 *          - username
 *          - password
 *      FlashcardSchema:
 *        type: object
 *        properties:
 *          deckId:
 *            type: integer
 *            format: int64
 *            description: ID del deck
 *          vocab:
 *            type: string
 *            description: Palabra que quiere guardar en la flashcard
 *          sourceLang:
 *            type: string
 *            description: Idioma de la palabra ingresada
 *          targetLang:
 *            type: string
 *            description: Idioma al que se quiere traducir la palabra
 *        required:
 *          - deckId
 *          - vocab
 *          - sourceLang
 *          - targetLang
 *      QuizSchema:
 *        type: object
 *        properties:
 *          userId:
 *            type: integer
 *            format: int64
 *            description: ID del usuario
 *          success:
 *            type: integer
 *            format: int64
 *            description: Cantidad de aciertos
 *          total:
 *            type: integer
 *            format: int64
 *            description: Total de intentos
 *        required:
 *          - userId
 *          - success
 *          - total
 *      ChatSchema:
 *        type: object
 *        properties:
 *          prompt:
 *            type: string
 *            description: mensaje a enviar al chatBot
 *          history:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                role:
 *                  type: string
 *                  enum: [user, model]
 *                parts:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      text:
 *                        type: string
 *                  description: partes del mensaje en la conversación
 *        required:
 *          - prompt
 *          - history
 *      StorySchema:
 *        type: object
 *        properties:
 *          words:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                vocab:
 *                  type: string
 *        description: lista de palabras para construir la historia
 *        required:
 *           - words
 *        example:
 *          words:
 *            - vocab: "palabra1"
 *            - vocab: "palabra2"
 *            - vocab: "palabra3"
 */
