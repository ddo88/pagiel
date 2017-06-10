
module.exports={
    response:function(res){
        return function (err,data){
            if(err)
                res.send({error:true,message:err});
            else
                res.send(data);
            res.end();
        }
    }
};