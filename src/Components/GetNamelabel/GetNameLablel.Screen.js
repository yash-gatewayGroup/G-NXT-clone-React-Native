export  const getNameLable=(name)=>{
    var NameLable='';
    var res =name.split(' ');
    for(var i=0;i<res.length;i++)
    {
      NameLable=NameLable.concat(res[i].charAt(0));
    }
    return NameLable.toUpperCase();
  }