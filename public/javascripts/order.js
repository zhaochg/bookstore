
function del(id){
     $.post("/shopping/orderdel",{
         id:id
     },function(data){
         if(data.status == 1){
             layer.msg(data.msg)
             $("#"+id+"_order").remove()
         }

     })
}