import swaggerJSDoc from "swagger-jsdoc";
import type { SwaggerOptions, SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [{
            name: "Products",
            description: "API operations related to products"
        }],
        info: {
            title: "Rest API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis:["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .topbar-wrapper .link {
            content: url('https://i.ibb.co/RjGMwKp/Logo-Cesc-Dev-dark.webp');
            height: 100px;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: "Documentación REST API Express / TypeScript"
};

export default swaggerSpec
export {
    swaggerUiOptions
}