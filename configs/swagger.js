const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0', // Specification (OpenAPI version)
        info: {
            title: 'SBAC Profile API',
            version: '1.0.0',
            description: 'API documentation for SBAC Profile API App',
        },
    },
    apis: ['./routes/api/student.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
