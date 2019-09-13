const Connection = require('tedious').Connection;
let tedious = require('tedious');
//const Request = require('tedious').Request;

var config = {
  //server: '192.168.0.13',
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

connection.on('connect', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to SQL');
    // executeGetAllUsuarios();
    // executeGetAllTarjetas();
    // executeGetAllEntidades();
    // executeGetAllResumenes();
    // executeGetAllMovimientos();
   
    // executeGetTotalResumen(10, 8, 2019);

    // executeSearchUsrByMail('maria@hotmail.com');
    // executeSearchUsrByDni(10);
    // executeSearchTarjetaByNro(1000);.
    // executeSearchTarjetaByUsr(10);
    // executeSearchEntidad('x');

    // executeSetUsuario('admin', 'juan', 'juan@hotmail.com', 'abc', '1874/12/07', 123456, 123456, 'juan@hotmail.com');
    // executeSetTarjeta(10000, '2021/08/01', 875, 25487653);
    // executeSetEntidad('x', 'CABA', '43742265');
    // executeSetResumen(8, 2019, 1002, 10); //CORREGIR
    // executeSetMovimiento('2019/02/15', 2650, 1, 1000)

    // executeChangePass('aaa', 'maria@hotmail.com');
    // executeLogIn('maria@hotmail.com', 'aaa');
    // executeGetLiquidaciones(25487653, '2019-07-30', '2019-08-30');
    // executeGetTotalResumen(2, 8, 2019);

    // executeUpdateLimiteTarjeta(25487653, 10000);
    // executeUpdateEntidad(1,'CABA', '425');
    // executeUpdateDineroGastadoTarjeta(1, 5);
    
    // executeDeleteUsuario(3);
    // executeDeleteTarjeta(2);
    // executeDeleteEntidad(2);
  }
});

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeGetAllUsuarios() {
  const statement = "SELECT * FROM Usuarios WHERE tipo = 'cliente' FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSetUsuario(tipo, nombre, nomUsr, passDefault, fechaNac, dni, telefono, mail) {
  request = new Request("INSERT INTO Usuarios (tipo, nombre, nomUsr, passDefault, passPropia, fechaNac, dni, telefono, mail) values (@tipo, @nombre, @nomUsr, @passDefault, @passPropia, @fechaNac, @dni, @telefono, @mail)", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('tipo', TYPES.NVarChar, tipo);
  request.addParameter('nombre', TYPES.NVarChar, nombre);
  request.addParameter('nomUsr', TYPES.NVarChar, nomUsr);
  request.addParameter('passDefault', TYPES.NVarChar, passDefault);
  request.addParameter('passPropia', TYPES.NVarChar, passDefault);
  request.addParameter('fechaNac', TYPES.Date, fechaNac);
  request.addParameter('dni', TYPES.Int, dni);
  request.addParameter('telefono', TYPES.Int, telefono);
  request.addParameter('mail', TYPES.NVarChar, mail);

  connection.execSql(request);
}

function executeSearchUsrByMail(mail) {
  const statement = "SELECT * FROM Usuarios WHERE tipo = 'cliente' AND mail = @mail FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('mail', TYPES.NVarChar, mail);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSearchUsrByDni(dni) {
  const statement = "SELECT * FROM Usuarios WHERE tipo = 'cliente' AND dni = @dni FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('dni', TYPES.Int, dni);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeGetAllTarjetas() {
  const statement = "SELECT * FROM Tarjetas FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSearchTarjetaByNro(numero) {
  const statement = "SELECT * FROM Tarjetas WHERE nroTarjeta = @nroTarjeta FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('nroTarjeta', TYPES.Int, numero);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSearchTarjetaByUsr(dni) {
  const statement = "SELECT * FROM Tarjetas WHERE dni = @dni FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('dni', TYPES.Int, dni);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSetTarjeta(nroTarjeta, limite, fechaVto, codSeg, dni) {
  request = new Request("INSERT INTO Tarjetas (nroTarjeta, limite, saldoDisponible, fechaVto, codSeg, dni) values (@nroTarjeta, @limite, @saldoDisponible, @fechaVto, @codSeg, @dni)", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);
  request.addParameter('limite', TYPES.Float, limite);
  request.addParameter('dineroGastado', TYPES.Float, 0);
  request.addParameter('fechaVto', TYPES.Date, fechaVto);
  request.addParameter('codSeg', TYPES.Int, codSeg);
  request.addParameter('dni', TYPES.Int, dni);

  connection.execSql(request);
}

function executeGetAllEntidades() {
  const statement = "SELECT * FROM Entidades FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSetEntidad(razonSocial, direccion, telefono) {
  request = new Request("INSERT INTO Entidades (razonSocial, direccion, telefono) values (@razonSocial, @direccion, @telefono)", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('razonSocial', TYPES.NVarChar, razonSocial);
  request.addParameter('direccion', TYPES.NVarChar, direccion);
  request.addParameter('telefono', TYPES.NVarChar, telefono);

  connection.execSql(request);
}

function executeSearchEntidad(razonSocial) {
  const statement = "SELECT * FROM Entidades WHERE razonSocial = @razonSocial FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('razonSocial', TYPES.NVarChar, razonSocial);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeGetAllResumenes() {
  const statement = "SELECT * FROM Resumenes FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') return 'null';
    else return results;
  });
  connection.execSql(request);
}

function executeSetResumen(mes, anio, nroTarjeta, dni) { //Necesita que executeGetTotalResumen le devuelva el total
  request = new Request("INSERT INTO Resumenes (mes, anio, nroTarjeta, total) values (@mes, @anio, @nroTarjeta, @total)", function (err) {
    if (err) {
      console.log(err);
    }
  });
  var res;
  request.on('requestCompleted', function () { //Para que una query se pueda ejecutar dentro de otra
   // res = executeGetTotalResumen(dni, mes, anio) //NO FUNCIONA --> COMO HAGO PARA DEVOLVERLE EL TOTAL
  });
  request.addParameter('mes', TYPES.Int, mes);
  request.addParameter('anio', TYPES.Int, anio);
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);
  request.addParameter('total', TYPES.Float, res);

  connection.execSql(request);
}

function executeGetAllMovimientos() {
  const statement = "SELECT * FROM Movimientos FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeSetMovimiento(fecha, monto, idEntidad, nroTarjeta) {
  request = new Request("INSERT INTO Movimientos (fecha, monto, idEntidad, nroTarjeta) values (@fecha, @monto, @idEntidad, @nroTarjeta)", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('fecha', TYPES.Date, fecha);
  request.addParameter('monto', TYPES.Float, monto);
  request.addParameter('idEntidad', TYPES.Int, idEntidad);
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);

  connection.execSql(request);
}

function executeChangePass(password, userName) {
  request = new Request("UPDATE Usuarios SET passPropia = @passPropia WHERE nomUsr = @nomUsr", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('passPropia', TYPES.NVarChar, password);
  request.addParameter('nomUsr', TYPES.NVarChar, userName);

  connection.execSql(request);
}

function executeLogIn(userName, password) {
  const statement = "SELECT tipo, passDefault, passPropia FROM Usuarios WHERE nomUsr = @nomUsr and passPropia = @passPropia FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('nomUsr', TYPES.NVarChar, userName);
  request.addParameter('passPropia', TYPES.NVarChar, password);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else console.log(results);
  });
  connection.execSql(request);
}

function executeGetTotalResumen(dni, mes, anio) {
  const statement = "SELECT fecha, monto, razonSocial FROM Movimientos m JOIN Tarjetas t ON m.nroTarjeta = t.nroTarjeta JOIN Entidades e ON m.idEntidad = e.idEntidad WHERE t.dni = @dni AND MONTH(m.fecha) = @mes AND YEAR(m.fecha) = @anio FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult );
  request.addParameter('dni', TYPES.Int, dni);
  request.addParameter('mes', TYPES.Int, mes);
  request.addParameter('anio', TYPES.Int, anio);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') console.log('null');
    else{ 
      console.log(results);
    }
  });
  connection.execSql(request);
}

function executeUpdateLimiteTarjeta(dni, limite) {
  request = new Request("UPDATE Tarjetas SET limite = @limite WHERE dni = @dni", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('limite', TYPES.Float, limite);
  request.addParameter('dni', TYPES.Int, dni);

  connection.execSql(request);
}

function executeUpdateEntidad(idEntidad, direccion, telefono){
  request = new Request("UPDATE Entidades SET direccion = @direccion, telefono = @telefono WHERE idEntidad = @idEntidad", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('idEntidad', TYPES.Int, idEntidad);
  request.addParameter('direccion', TYPES.NVarChar, direccion);
  request.addParameter('telefono', TYPES.NVarChar, telefono);

  connection.execSql(request);
}

function executeUpdateDineroGastadoTarjeta(nroTarjeta, dinero){ //El dinero se suma al dineroGastado - dineroGastado+@dineroGastado <= limite
  request = new Request("UPDATE Tarjetas SET dineroGastado += @dineroGastado WHERE nroTarjeta = @nroTarjeta", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);
  request.addParameter('dineroGastado', TYPES.Float, dinero);

  connection.execSql(request);
}

function executeDeleteUsuario(dni){
  request = new Request("DELETE FROM Usuarios WHERE dni = @dni", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('dni', TYPES.Int, dni);

  connection.execSql(request);
}

function executeDeleteTarjeta(nroTarjeta){
  request = new Request("DELETE FROM Tarjetas WHERE nroTarjeta = @nroTarjeta", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);

  connection.execSql(request);
}

function executeDeleteEntidad(idEntidad){
  request = new Request("DELETE FROM Entidades WHERE idEntidad = @idEntidad", function (err) {
    if (err) {
      console.log(err);
    }
  });
  request.addParameter('idEntidad', TYPES.Int, idEntidad);

  connection.execSql(request);
}