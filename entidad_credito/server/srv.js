const Connection = require('tedious').Connection;
//const Request = require('tedious').Request;
var express = require('express');
var app = express();
const router = express.Router();

  var config = {  
    //server: '192.168.0.13',
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: '123456'
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'integradasTPO'
    }
  }; 

  const connection = new Connection(config);
  connection.on('connect', function(err) {
      if (err) {
      console.log(err);
        } else {
         console.log('Connected to SQL');
        }
    }
);

app.set('port', process.env.PORT || 8080);//defino valor del puerto

//Middlewares
app.use(express.json());//para enviar y recibir json

//Inicializar el srv
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

  var Request = require('tedious').Request;  
  var TYPES = require('tedious').TYPES;  

app.use(
    router.post('/log', (req, res) => {
        const { email, password } = req.body;
        request = new Request('SELECT * FROM Usuarios where mail = \'' + email + '\' and passDefault = ' + password +' FOR JSON PATH', function(err) {  
            if (err) {  
                console.log(err);}  
            });  
            var result = "";  
            console.log('1')
            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                  if (column.value === null) {  
                    //console.log('NULL');  
                  } else {  
                    result+= column.value + " ";  
                  }  
                });
                console.log('2')
                console.log(result);
                res.json(result);
                result ="";  
                console.log('3')
                console.log(result); 
                //res.writeHead(200, {'Content-Type': 'application/json'});
                //res.end(JSON.stringify(result))
                //console.log(res.end(JSON.stringify(result)))
                //res.json(result);
            });  
            console.log('4')
            connection.execSql(request); 
            console.log('5')
            //res.json(result); 
            
            
                
    })
    
    
    
    
    
    );
  
    function executeGetUsuarios() {  
        request = new Request("SELECT * FROM Usuarios FOR JSON PATH", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                //console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        /*
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        */
        connection.execSql(request);  
    }  

    function executeSetUsuario() {  
      request = new Request("INSERT INTO Usuarios (tipo, nombre, nomUsr, passDefault, fechaNac, dni, telefono, mail) values (@tipo, @nombre, @nomUsr, @passDefault, @fechaNac, @dni, @telefono, @mail)", function(err) {  
       if (err) {  
          console.log(err);}  
      });  
      request.addParameter('tipo', TYPES.NVarChar,'cliente');  
      request.addParameter('nombre', TYPES.NVarChar , 'Maria');  
      request.addParameter('nomUsr', TYPES.NVarChar, 'maria@hotmail.com');  
      request.addParameter('passDefault', TYPES.NVarChar,'123'); 
      request.addParameter('fechaNac', TYPES.Date, '1985/08/19'); 
      request.addParameter('dni', TYPES.Int, 25487653); 
      request.addParameter('telefono', TYPES.Int, '1586302247'); 
      request.addParameter('mail', TYPES.NVarChar,'maria@hotmail.com');  
           
      connection.execSql(request);  
  }  

  function executeGetTarjetas() {  
    request = new Request("SELECT * FROM Tarjetas FOR JSON PATH", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            //console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  
    connection.execSql(request);  
    }  

  function executeSetTarjeta() {  
    request = new Request("INSERT INTO Tarjetas (limite, fechaVto, codSeg, dni) values (@limite, @fechaVto, @codSeg, @dni)", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    request.addParameter('limite', TYPES.Float,10000);  
    request.addParameter('fechaVto', TYPES.Date , '2021/08/01');  
    request.addParameter('codSeg', TYPES.Int, 875);  
    request.addParameter('dni', TYPES.Int, 25487653); 
         
    connection.execSql(request);  
} 

function executeGetEntidades() {  
  request = new Request("SELECT * FROM Entidades FOR JSON PATH", function(err) {  
  if (err) {  
      console.log(err);}  
  });  
  var result = "";  
  request.on('row', function(columns) {  
      columns.forEach(function(column) {  
        if (column.value === null) {  
          //console.log('NULL');  
        } else {  
          result+= column.value + " ";  
        }  
      });  
      console.log(result);  
      result ="";  
  });  
  connection.execSql(request);  
  }  

function executeSetEntidad() {  
  request = new Request("INSERT INTO Entidades (razonSocial, direccion, telefono) values (@razonSocial, @direccion, @telefono)", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('razonSocial', TYPES.NVarChar, 'Visa');  
  request.addParameter('direccion', TYPES.NVarChar , 'CABA');  
  request.addParameter('telefono', TYPES.NVarChar, '43742265');   
       
  connection.execSql(request);  
} 

function executeGetResumenes() {  
  request = new Request("SELECT * FROM Resumenes FOR JSON PATH", function(err) {  
  if (err) {  
      console.log(err);}  
  });  
  var result = "";  
  request.on('row', function(columns) {  
      columns.forEach(function(column) {  
        if (column.value === null) {  
          //console.log('NULL');  
        } else {  
          result+= column.value + " ";  
        }  
      });  
      console.log(result);  
      result ="";  
  });  
  connection.execSql(request);  
  }  

function executeSetResumen() {  
  request = new Request("INSERT INTO Resumenes (mes, anio, nroTarjeta) values (@mes, @anio, @nroTarjeta)", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('mes', TYPES.Int, 2);  
  request.addParameter('anio', TYPES.Int , 2019);  
  request.addParameter('nroTarjeta', TYPES.Int, 1000);   
       
  connection.execSql(request);  
} 

function executeGetMovimientos() {  
  request = new Request("SELECT * FROM Movimientos FOR JSON PATH", function(err) {  
  if (err) {  
      console.log(err);}  
  });  
  var result = "";  
  request.on('row', function(columns) {  
      columns.forEach(function(column) {  
        if (column.value === null) {  
          //console.log('NULL');  
        } else {  
          result+= column.value + " ";  
        }  
      });  
      console.log(result);  
      result ="";  
  });  
  connection.execSql(request);  
  }  

function executeSetMovimiento() {  
  request = new Request("INSERT INTO Movimientos (fecha, monto, idEntidad, nroTarjeta) values (@fecha, @monto, @idEntidad, @nroTarjeta)", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('fecha', TYPES.Date, '2019/02/15');  
  request.addParameter('monto', TYPES.Float , 2650);  
  request.addParameter('idEntidad', TYPES.Int, 1);   
  request.addParameter('nroTarjeta', TYPES.Int, 1000);   
       
  connection.execSql(request);  
}
