
module.exports={
    response:function(res){
        return function (err,data){
            //res.setHeader('Content-Type', 'application/json');
            console.log(data);
            if(err)
                res.send({error:true,message:err});
            else
                res.json(data);
                //res.send(data);
            //res.flush();    
            //res.end();
        }
    },
    For: function(items,exec,init){
        var result=undefined;
        for(var i=init||0,length=items.length;i<length;i++)
        {
            result=exec(items[i],i);
        }
        return result;
    }
};