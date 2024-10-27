const products = require("./products.json")
const Express = require("express");
const API_SERVER = Express();
API_SERVER.use(Express.static("public"));
API_SERVER.use(Express.json());
require('dotenv').config();
API_SERVER.get("/",function(request,response){
    return response.send("Hello Floks");
})

// API_SERVER.get("/products",function(request,response){
//     return response.json({
//         message:"Products Fetched",
//         data:products,
//         sucess:true
//     })
// })
API_SERVER.get("/products",function(request,response){
let result=[];
const {limit,page}=request.query;
if(limit&&page){
    const start = Number(limit)*(Number(page)-1);
    const end = Number(limit)*Number(page);
    result = products.slice(start,end);
}
else{
    result = products;
}
return response.json({
    message:"Products Fetched SucessFully",
    sucess:true,
    data:result
})
})

API_SERVER.get("/products/:productId",function(request,response){
    const matched_products = products.find((_product)=>_product.id === parseInt(request.params.productId));
    if(!matched_products){
        return response.status(404).json({
            message:"product not found",
            success:false
        });
    
    }
    return response.status(200).json({
        message:"product fetched sucessfully",
        success:true,
        data:matched_products
    });
    
})

API_SERVER.post("/products/create",function(request,response){
    return response.json({
        message:"Products Created",
        sucess:true
    })
})

API_SERVER.listen(process.env.PORT,process.env.HOSTNAME,function(){
    console.log(`server started http://${process.env.HOSTNAME}:${process.env.PORT}`);
})
API_SERVER.listen()
// API_SERVER.listen(3000,"localhost",function(){
//     console.log("http://localhost:3000")
// })
 