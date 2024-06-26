import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "RivaLearn API Documentation", version: "1.2.0"},
    },
    apis: [`${path.join(__dirname, './router/*.js')}`]
};

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
