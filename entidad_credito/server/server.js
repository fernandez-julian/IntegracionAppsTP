const Connection = require('tedious').Connection;
//const Request = require('tedious').Request;

  var config = {  
    server: '192.168.0.13',
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
     // executeGetAllUsuarios();
     // executeGetAllTarjetas();
     // executeGetAllEntidades();
     // executeGetAllResumenes();
     // executeGetAllMovimientos();

     // executeSearchUsr('maria@hotmail.com');
     // executeSearchTarjeta(1000);
     // executeSearchEntidad('x');
      
     // executeSetUsuario('admin', 'juan', 'juan@hotmail.com', 'abc', '1874/12/07', 123456, 123456, 'juan@hotmail.com');
     // executeSetTarjeta(10000, '2021/08/01', 875, 25487653);
     // executeSetEntidad('x', 'CABA', '43742265');
     // executeSetResumen(7, 2019, 1000);
     // executeSetMovimiento('2019/02/15', 2650, 1, 1000)

     // executeChangePass('aaa', 'maria@hotmail.com');
     // executeLogIn('maria@hotmail.com', 'aaa');
    }
  });

  var Request = require('tedious').Request;  
  var TYPES = require('tedious').TYPES;  
  
    function executeGetAllUsuarios() {  
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

    function executeSetUsuario(tipo, nombre, nomUsr, passDefault, fechaNac, dni, telefono, mail) {  
      request = new Request("INSERT INTO Usuarios (tipo, nombre, nomUsr, passDefault, passPropia, fechaNac, dni, telefono, mail) values (@tipo, @nombre, @nomUsr, @passDefault, @passPropia, @fechaNac, @dni, @telefono, @mail)", function(err) {  
       if (err) {  
          console.log(err);}  
      });  
      request.addParameter('tipo', TYPES.NVarChar, tipo);  
      request.addParameter('nombre', TYPES.NVarChar , nombre);  
      request.addParameter('nomUsr', TYPES.NVarChar, nomUsr);  
      request.addParameter('passDefault', TYPES.NVarChar, passDefault); 
      request.addParameter('passPropia', TYPES.NVarChar, passDefault);
      request.addParameter('fechaNac', TYPES.Date, fechaNac); 
      request.addParameter('dni', TYPES.Int, dni); 
      request.addParameter('telefono', TYPES.Int, telefono); 
      request.addParameter('mail', TYPES.NVarChar, mail);  
           
      connection.execSql(request);  
  }  

  function executeSearchUsr(userName) {  
    request = new Request("SELECT * FROM Usuarios WHERE nomUsr = @nomUsr FOR JSON PATH", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    request.addParameter('nomUsr', TYPES.NVarChar , userName);
    var result = "";
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === '') {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    }); 
    connection.execSql(request);
    } 

  function executeGetAllTarjetas() {  
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

    function executeSearchTarjeta(numero) {  
      request = new Request("SELECT * FROM Tarjetas WHERE nroTarjeta = @nroTarjeta FOR JSON PATH", function(err) {  
      if (err) {  
          console.log(err);}  
      });  
      request.addParameter('nroTarjeta', TYPES.Int, numero);
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

  function executeSetTarjeta(limite, fechaVto, codSeg, dni) {  
    request = new Request("INSERT INTO Tarjetas (limite, fechaVto, codSeg, dni) values (@limite, @fechaVto, @codSeg, @dni)", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    request.addParameter('limite', TYPES.Float, limite);  
    request.addParameter('fechaVto', TYPES.Date , fechaVto);  
    request.addParameter('codSeg', TYPES.Int, codSeg);  
    request.addParameter('dni', TYPES.Int, dni); 
         
    connection.execSql(request);  
} 

function executeGetAllEntidades() {  
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

function executeSetEntidad(razonSocial, direccion, telefono) {  
  request = new Request("INSERT INTO Entidades (razonSocial, direccion, telefono) values (@razonSocial, @direccion, @telefono)", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('razonSocial', TYPES.NVarChar, razonSocial);  
  request.addParameter('direccion', TYPES.NVarChar , direccion);  
  request.addParameter('telefono', TYPES.NVarChar, telefono);   
       
  connection.execSql(request);  
} 

function executeSearchEntidad(razonSocial) {  
  request = new Request("SELECT * FROM Entidades WHERE razonSocial = @razonSocial FOR JSON PATH", function(err) {  
  if (err) {  
      console.log(err);}  
  });  
  var result = "";  
  request.addParameter('razonSocial', TYPES.NVarChar, razonSocial);
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

function executeGetAllResumenes() {  
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

function executeSetResumen(mes, anio, nroTarjeta) {  
  request = new Request("INSERT INTO Resumenes (mes, anio, nroTarjeta) values (@mes, @anio, @nroTarjeta)", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('mes', TYPES.Int, mes);  
  request.addParameter('anio', TYPES.Int , anio);  
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);   
       
  connection.execSql(request);  
} 

function executeGetAllMovimientos() {  
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

function executeSetMovimiento(fecha, monto, idEntidad, nroTarjeta) {  
  request = new Request("INSERT INTO Movimientos (fecha, monto, idEntidad, nroTarjeta) values (@fecha, @monto, @idEntidad, @nroTarjeta)", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('fecha', TYPES.Date, fecha);  
  request.addParameter('monto', TYPES.Float , monto);  
  request.addParameter('idEntidad', TYPES.Int, idEntidad);   
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);   
       
  connection.execSql(request);  
}

function executeChangePass(password, userName) {  
  request = new Request("UPDATE Usuarios SET passPropia = @passPropia WHERE nomUsr = @nomUsr", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('passPropia', TYPES.NVarChar, password);  
  request.addParameter('nomUsr', TYPES.NVarChar , userName);  
       
  connection.execSql(request);  
} 

function executeLogIn(userName, password) {  
  request = new Request("SELECT tipo, passDefault, passPropia FROM Usuarios WHERE nomUsr = @nomUsr and passPropia = @passPropia FOR JSON PATH", function(err) {  
   if (err) {  
      console.log(err);}  
  });  
  request.addParameter('nomUsr', TYPES.NVarChar , userName);
  request.addParameter('passPropia', TYPES.NVarChar, password);  
  var result = "";
  request.on('row', function(columns) {  
      columns.forEach(function(column) {  
        if (column.value === '') {  
          console.log('NULL');  
        } else {  
          result+= column.value + " ";  
        }  
      });  
      console.log(result);  
      result ="";  
  }); 
  connection.execSql(request);
  } 
