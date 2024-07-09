const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const serviceBasePath = `/student/`;

module.exports=function(app){
const options={
    definition:{
        openapi:"3.0.0",
        info: {
            title: "Node JS API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3001/api/",
            }],
        basePath: serviceBasePath,
        produces: ["application/json"],
        
        },
        apis: [
            path.join(__dirname, "../controllers/*.js"),
            path.join(__dirname, "../routers/*.js"),
          ],
        
};
const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))


};
