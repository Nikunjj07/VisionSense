import { Router } from "express";


const mainRouter = Router();

mainRouter.get('/health',(req,res)=>{
    res.json({
        status: "OK"
    });
})

export default mainRouter;