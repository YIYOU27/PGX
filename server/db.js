var mysql = require('mysql');
let databaseConfig = {
    host: 'localhost',
    user: 'root',
    password: '386015pgx',
    database: 'books'
};
var sql = {};
sql.query = function(sql,params){
return new Promise(function(resolve,reject){
    //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
    var connection = mysql.createConnection(databaseConfig);        
    connection.connect(function(err){
        if(err){
            console.log('数据库链接失败');
            throw err;
        }
     //开始数据操作
     //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
    connection.query( sql, params, function(err,results,fields ){
       if(err){
            console.log('数据操作失败');
            throw err;
        }
        //将查询出来的数据返回给回调函数
        resolve(results);
        //results作为数据操作后的结果，fields作为数据库连接的一些字段
        //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
         connection.end(function(err){
              if(err){
                  console.log('关闭数据库连接失败！');
                  throw err;
              }
          });
       });
   });
});
}


// sql.query('SELECT * FROM  bookselfs;')
//     .then((res) => {
//         console.log(res)
//     })

module.exports = sql;

