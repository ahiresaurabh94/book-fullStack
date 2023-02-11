const router = require("express").Router();
const listModel = require('../Models/listModel');


router.get("/list" , async (req , res)=> {
    try{
        const post = await listModel.find()

        res.json({
            status: "Success",
            post
        })
    }
    catch(e){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})  

router.post('/list' , async (req,res)=>{
    try{
        const {title,isbn,author,description,publishedDate,publisher} = req.body;

        const lists = await listModel.create({
            title:title,
            isbn:isbn,
            author:author,
            description:description,
            publishedDate:publishedDate,
            publisher:publisher
        })

        res.json({
            status:"Success",
            lists
        })
    }
    catch (e){
        return res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})


router.put("/list/:id", async (req, res) => {
    try {
        //console.log(req.body);
        const list = await listModel.findOne({_id:req.params.id});
        console.log(list);

        if(list){
            const listUpdate = await listModel.updateOne({_id : req.params.id} , req.body);
            res.status(200).json({
                status:"success",
                listUpdate
            })
        }

        else{
            res.status(404).json({
                error: "There is no task at that id"
            })
        }
    }
    catch (e) {
        return res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete("/list/:id", async (req, res) => {
    try {
        
        const taskDelete = await listModel.deleteMany({_id: req.params.id });
        res.status(200).json({
            taskDelete
        })
    }
    catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router