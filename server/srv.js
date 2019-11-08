const Connection = require('tedious').Connection;
//const Request = require('tedious').Request;
var express = require('express');
var app = express();
const router = express.Router();
let tedious = require('tedious');
var schedule = require('node-schedule');
const fetch = require('node-fetch');
var cors = require('cors');

/*var config = {
  server: 'entidadcreditosrv.database.windows.net',
  authentication: {
    type: 'default',
    options: {
      userName: 'master',
      password: 'credito$123456'
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: 'entidadCreditoBD'
  }
};*/

var config = {
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
connection.on('connect', function (err) {
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

//use cors
app.use(cors());

//Inicializar el srv
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var cbuEntidadCredito = '1230000000127';//Esta es de prueba--------> pedir la real

app.use(
  router.get('/', (req, res) => { res.send('hello') }),
  router.post('/log', (req, res) => {
    const { email, password } = req.body;
    const statement = "SELECT * FROM Usuarios WHERE mail = @mail and passPropia = @passPropia FOR JSON PATH"
    function handleResult(err, numRows, rows) {
      if (err) return console.error("Error: ", err);
    }
    let results = '';
    let request = new tedious.Request(statement, handleResult);
    request.addParameter('mail', TYPES.NVarChar, email);
    request.addParameter('passPropia', TYPES.NVarChar, password);
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        results += column.value + " ";
      });
    });
    request.on('doneProc', function (rowCount, more, returnStatus, rows) {
      if (results == '') {
        res.status(404).json('Usuario o clave icorrecto');
      }
      else {
        res.json(results);
      }
    });
    connection.execSql(request);
  }),

  router.post('/clientes/registrar', (req, res) => {
    const { nombre, fechaNac, dni, telefono, mail, cbu } = req.body;
    const passDefault = defaulPass(6); //6 es la long de la pass
    const tipo = 'cliente';
    request = new Request("INSERT INTO Usuarios (tipo, nombre, passDefault, passPropia, fechaNac, dni, telefono, mail, cbu) values (@tipo, @nombre, @passDefault, @passPropia, @fechaNac, @dni, @telefono, @mail, @cbu)", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('tipo', TYPES.NVarChar, tipo);
    request.addParameter('nombre', TYPES.NVarChar, nombre);
    request.addParameter('passDefault', TYPES.NVarChar, passDefault);
    request.addParameter('passPropia', TYPES.NVarChar, passDefault);
    request.addParameter('fechaNac', TYPES.Date, fechaNac);
    request.addParameter('dni', TYPES.Int, dni);
    request.addParameter('telefono', TYPES.Int, telefono);
    request.addParameter('mail', TYPES.NVarChar, mail);
    request.addParameter('cbu', TYPES.NVarChar, cbu);
    connection.execSql(request);
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.json({ clave: passDefault });
  }),

  router.get('/clientes/obtener', (req, res) => {
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
      if (results == '') {
        res.status(404).json('No hay clientes registrados');
      }
      else {
        res.json(results);
      }
    });
    connection.execSql(request);
  }),

  router.post('/clientes/cambiarPass', (req, res) => {
    const { usrEmail, currentPass, newPass } = req.body;
    request = new Request("UPDATE Usuarios SET passPropia = @passPropia WHERE mail = @mail", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('passPropia', TYPES.NVarChar, newPass);
    request.addParameter('mail', TYPES.NVarChar, usrEmail);
    connection.execSql(request);
    res.json();
  }),

  router.post('/clientes/eliminar', (req, res) => {
    const { dni } = req.body;
    request = new Request("DELETE FROM Usuarios WHERE dni = @dni", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('dni', TYPES.Int, dni);
    connection.execSql(request);
  }),

  router.post('/entidades/registrar', (req, res) => {
    const { razonSocial, direccion, telefono, cbu } = req.body;
    request = new Request("INSERT INTO Entidades (razonSocial, direccion, telefono, cbu) values (@razonSocial, @direccion, @telefono, @cbu)", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('razonSocial', TYPES.NVarChar, razonSocial);
    request.addParameter('direccion', TYPES.NVarChar, direccion);
    request.addParameter('telefono', TYPES.NVarChar, telefono);
    request.addParameter('cbu', TYPES.NVarChar, cbu);
    connection.execSql(request);
  }),

  router.get('/entidades/obtener', (req, res) => {
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
      if (results == '') {
        res.status(404).json('No hay entidades registradas');
      }
      else {
        res.json(results);
      }
    });
    connection.execSql(request);
  }),

  router.post('/entidades/actualizar', (req, res) => {
    const { idEntidad, direccion, telefono } = req.body;
    if (direccion !== null && telefono !== null)
      var statement = "UPDATE Entidades SET direccion = @direccion, telefono = @telefono WHERE idEntidad = @idEntidad"
    if (direccion !== null && telefono === null)
      var statement = "UPDATE Entidades SET direccion = @direccion WHERE idEntidad = @idEntidad"
    if (direccion === null && telefono !== null)
      var statement = "UPDATE Entidades SET telefono = @telefono WHERE idEntidad = @idEntidad"
    request = new Request(statement, function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('idEntidad', TYPES.Int, idEntidad);
    request.addParameter('direccion', TYPES.NVarChar, direccion);
    request.addParameter('telefono', TYPES.NVarChar, telefono);
    connection.execSql(request);
    res.json();
  }),

  router.post('/entidades/eliminar', (req, res) => {
    const { idEntidad } = req.body;
    request = new Request("DELETE FROM Entidades WHERE idEntidad = @idEntidad", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('idEntidad', TYPES.Int, idEntidad);
    connection.execSql(request);
  }),

  router.get('/tarjetas/obtener', (req, res) => {
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
      if (results == '') {
        res.status(404).json('No hay tarjetas registradas');
      }
      else {
        res.json(results);
      }
    });
    connection.execSql(request);
  }),

  router.post('/tarjetas/eliminar', (req, res) => {
    const { nroTarjeta } = req.body;
    request = new Request("DELETE FROM Tarjetas WHERE nroTarjeta = @nroTarjeta", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('nroTarjeta', TYPES.VarChar, nroTarjeta);
    connection.execSql(request);
  }),

  router.post('/tarjetas/registrar', (req, res) => {
    const { dni, limite } = req.body;
    var existe;
    var tiene;
    existeUsr(dni, function (result) {
      existe = result;
      if (existe) {
        tieneTarjeta(dni, function (result) {
          tiene = result;
          if (tiene) {
            res.status(403).json('El cliente ya posee una tarjeta asociada')
          }
          else {
            var d = new Date();
            const anio = d.getFullYear() + 2;
            const fechaVto = d;
            fechaVto.setFullYear(anio);
            const nroTarjeta = defaulCodigoNumerico(16) //numero con 16 digitos
            const codSeg = Number(defaulCodigoNumerico(3)) // codigo de seguridad de 3 digitos
            request = new Request("INSERT INTO Tarjetas (nroTarjeta, limite, dineroGastado, fechaVto, codSeg, dni) values (@nroTarjeta, @limite, @dineroGastado, @fechaVto, @codSeg, @dni)", function (err) {
              if (err) {
                console.log(err);
              }
            });
            request.addParameter('nroTarjeta', TYPES.VarChar, nroTarjeta);
            request.addParameter('limite', TYPES.Float, limite);
            request.addParameter('dineroGastado', TYPES.Float, 0);
            request.addParameter('fechaVto', TYPES.Date, fechaVto);
            request.addParameter('codSeg', TYPES.Int, codSeg);
            request.addParameter('dni', TYPES.Int, dni);
            connection.execSql(request);
            res.status(200).json('El proceso de registracion se realizo con exito')
          }
        })
      }
      else {
        res.status(404).json('El cliente solicitado no se encuentra registrado')
      }
    })
  }),

  router.post('/tarjetas/actualizar', (req, res) => {
    const { dni, limite } = req.body;
    if (limite !== null)
      var statement = "UPDATE Tarjetas SET limite = @limite WHERE dni = @dni"
    request = new Request(statement, function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('limite', TYPES.Float, limite);
    request.addParameter('dni', TYPES.Int, dni);
    connection.execSql(request);
    res.json();
  }),

  router.post('/movimientos/obtener', (req, res) => {
    const { dni, mes } = req.body;
    var currentDate = new Date();
    if (currentDate.getMonth() + 1 === mes) {
      res.status(403).json('La liquidación del presente mes no está disponible ya que el mes aún está en curso');
    }
    else if (mes < currentDate.getMonth() + 1) {
      var dt = new Date();
      var anio = dt.getFullYear();
      const statement = "SELECT fechaPago, monto, razonSocial, nroCuota, totalCuota FROM Movimientos m JOIN Tarjetas t ON m.nroTarjeta = t.nroTarjeta JOIN Entidades e ON m.idEntidad = e.idEntidad WHERE t.dni = @dni AND m.fechaCuota BETWEEN @anio+'-'+@mesPrev+'-23' AND @anio+'-'+@mesPost+'-22' FOR JSON PATH"
      function handleResult(err, numRows, rows) {
        if (err) return console.error("Error: ", err);
      }
      let results = '';
      let request = new tedious.Request(statement, handleResult);
      request.addParameter('dni', TYPES.Int, dni);
      request.addParameter('mesPrev', TYPES.VarChar, (mes - 1).toString());
      request.addParameter('mesPost', TYPES.VarChar, mes.toString());
      request.addParameter('anio', TYPES.VarChar, anio.toString());
      request.on('row', function (columns) {
        columns.forEach(function (column) {
          results += column.value + " ";
        });
      });
      request.on('doneProc', function (rowCount, more, returnStatus, rows) {
        if (results == '') {
          res.status(404).json('No hay movimientos registrados en ese periodo');
        }
        else {
          var obj = JSON.parse(results)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          var amountobj = obj.map((item) => { return item['monto'] });
          var subtotalobj = amountobj.reduce(reducer);
          var interes = subtotalobj * 0.03;
          var total = interes + subtotalobj;
          var subtotalobjJSON = { "subtotal": subtotalobj.toFixed(2) };
          var interesJSON = { "intereses": interes.toFixed(2) };
          var totalJSON = { "total": total.toFixed(2) }
          obj.push(subtotalobjJSON);
          obj.push(interesJSON);
          obj.push(totalJSON);
          var response = JSON.stringify(obj);
          res.json(response);
        }
      });
      connection.execSql(request);
    }
    else {
      res.status(404).json('No se pueden consultar meses posteriores al actual');
    }
  }),

  router.post('/tarjetas/obtenerPorCliente', (req, res) => {
    const { dni } = req.body;
    const statement = "SELECT limite, dineroGastado FROM Tarjetas WHERE dni = @dni FOR JSON PATH"
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
      if (results == '') {
        res.status(404).json('No existe tarjeta para ese cliente');
      }
      else {
        var objResult = JSON.parse(results);
        var obj = new Object;
        obj.limite = objResult[0]['limite'].toFixed(2);
        obj.dineroGastado = objResult[0]['dineroGastado'].toFixed(2);
        var response = JSON.stringify(obj);
        res.json(response);
      }
    });
    connection.execSql(request);
  }),

  router.post('/chequearTarjeta', (req, res) => {
    var { nroTarjeta, codSeg } = req.body;
    existeTarjetaConCodigo(nroTarjeta, codSeg, function (result) {
      existe = result;
      if (existe) {
        res.status(200).json('Los datos son correctos');
      }
      else {
        res.status(404).json('Los datos no conciden');
      }
    })
  }),

  router.post('/registrar', (req, res) => { //NO VA, ES SOLO PAR APROBAR
    var movimientos = req.body;
    var x = new Array();
    res.json(movimientos)
    console.log(movimientos)
    x.push('hola')
    console.log(x)
  }),

  //EJEMPLO DE UNA PETICION (ARRAY)
  /*
  {
    "movimientos": [{"nroTarjeta":"1","codSeg":1,"monto":1,"idEntidad":1,"cuotas":1},{"nroTarjeta":"2","codSeg":2,"monto":2,"idEntidad":2,"cuotas":2}]
  }
  */
  router.post('/movimientos/registrarMuchos', (req, res) => { //FALTA DOCUMENTAR
    var movimientos = req.body;
    var respuestas = new Array();
    movimientos.movimientos.map(function (item) {
      var { nroTarjeta, codSeg, monto, idEntidad, cuotas } = item;
      var existe;
      var habilitado;
      existeTarjetaConCodigo(nroTarjeta, codSeg, function (result) {
        existe = result;
        if (existe) {
          isHabilitado(nroTarjeta, monto / cuotas, function (result) {
            habilitado = result;
            if (habilitado) {
              var fechaHoy = new Date();
              if (cuotas == 1) {
                request = new Request("INSERT INTO Movimientos (fechaPago, monto, idEntidad, nroTarjeta, nroCuota, totalCuota, fechaCuota) values (@fechaPago, @monto, @idEntidad, @nroTarjeta, @nroCuota, @totalCuota, @fechaCuota)", function (err) {
                  if (err) {
                    console.log(err);
                  }
                });
                request.addParameter('fechaPago', TYPES.Date, fechaHoy);
                request.addParameter('monto', TYPES.Float, monto);
                request.addParameter('idEntidad', TYPES.Int, idEntidad);
                request.addParameter('nroTarjeta', TYPES.VarChar, nroTarjeta);
                request.addParameter('nroCuota', TYPES.Int, 1);
                request.addParameter('totalCuota', TYPES.Int, 1);
                request.addParameter('fechaCuota', TYPES.Date, fechaHoy);
                connection.execSql(request);
              }
              else if (cuotas > 1) {
                var montoCuota = monto / cuotas;
                var values = [];
                var cantCuotas = cuotas;
                var nroCuota = 1;
                fechaCuota = new Date();
                while (cantCuotas != 0) {
                  values.push(
                    "( '" + fechaHoy.toLocaleDateString() + "'", montoCuota, idEntidad, nroTarjeta, nroCuota, cuotas, "'" + fechaCuota.toLocaleDateString() + "' )"
                  )
                  nroCuota++;
                  cantCuotas--;
                  fechaCuota.setMonth(fechaCuota.getMonth() + 1);
                }
                request = new Request("INSERT INTO Movimientos (fechaPago, monto, idEntidad, nroTarjeta, nroCuota, totalCuota, fechaCuota) VALUES " + values, function (err) {
                  if (err) {
                    console.log(err);
                  }
                });
                connection.execSql(request);
              }
              respuestas.push('El proceso de compra se realizo con exito')
            }
            else {
              respuestas.push('Pago rechazado por saldo insuficiente')
            }
          })
        }
        else {
          respuestas.push('Tarjeta no existente o codigo de seguridad erroneo')
        }
      })

    })
    res.json(respuesta);
  }),

  router.post('/movimientos/registrar', (req, res) => {
    var { nroTarjeta, codSeg, monto, idEntidad, cuotas } = req.body;
    var existe;
    var habilitado;
    existeTarjetaConCodigo(nroTarjeta, codSeg, function (result) {
      existe = result;
      if (existe) {
        isHabilitado(nroTarjeta, monto / cuotas, function (result) {
          habilitado = result;
          if (habilitado) {
            getCbuEntidad(idEntidad, function (cbuEntidad) {
              var obj = JSON.parse(cbuEntidad);
              var fechaHoy = new Date();
              if (cuotas == 1) {
                montoReal = monto;
                request = new Request("INSERT INTO Movimientos (fechaPago, monto, idEntidad, nroTarjeta, nroCuota, totalCuota, fechaCuota) values (@fechaPago, @monto, @idEntidad, @nroTarjeta, @nroCuota, @totalCuota, @fechaCuota)", function (err) {
                  if (err) {
                    console.log(err);
                  }
                });
                request.addParameter('fechaPago', TYPES.Date, fechaHoy);
                request.addParameter('monto', TYPES.Float, monto);
                request.addParameter('idEntidad', TYPES.Int, idEntidad);
                request.addParameter('nroTarjeta', TYPES.VarChar, nroTarjeta);
                request.addParameter('nroCuota', TYPES.Int, 1);
                request.addParameter('totalCuota', TYPES.Int, 1);
                request.addParameter('fechaCuota', TYPES.Date, fechaHoy);
                connection.execSql(request);
              }
              else if (cuotas > 1) {
                var montoCuota = monto / cuotas;
                var values = [];
                var cantCuotas = cuotas;
                var nroCuota = 1;
                fechaCuota = new Date();
                while (cantCuotas != 0) {
                  values.push(
                    "( '" + fechaHoy.toLocaleDateString() + "'", montoCuota, idEntidad, nroTarjeta, nroCuota, cuotas, "'" + fechaCuota.toLocaleDateString() + "' )"
                  )
                  nroCuota++;
                  cantCuotas--;
                  fechaCuota.setMonth(fechaCuota.getMonth() + 1);
                }
                request = new Request("INSERT INTO Movimientos (fechaPago, monto, idEntidad, nroTarjeta, nroCuota, totalCuota, fechaCuota) VALUES " + values, function (err) {
                  if (err) {
                    console.log(err);
                  }
                });
                connection.execSql(request);
              }
              obj.forEach(element => {
                element['monto'] = monto;
                element['cbuOrigen'] = cbuEntidadCredito;
                element['descripcion'] = 'Pago';
              });
              obj = JSON.stringify(obj);
              fetch('https://bancaservice.azurewebsites.net/api/integration/transferir?movimientos=' +
                obj + '&user=tarjeta01&origenMovimiento=origen1', {
                method: "POST",
                body: JSON.stringify(''),
                headers: { 'Content-Type': 'application/json' },
              }).then(res => res.json())
                .then(json => console.log(json));
            });
            res.status(200).json('El proceso de compra se realizo con exito');
          }
          else {
            res.status(403).json('Pago rechazado por saldo insuficiente')
          }
        })
      }
      else {
        res.status(404).json('Tarjeta no existente o codigo de seguridad erroneo')
      }
    })
  }),
)

function defaulPass(long) {
  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var contraseña = "";
  for (i = 0; i < long; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); //pass de longitud long caracteres
  return (contraseña);
}

function defaulCodigoNumerico(long) {
  var caracteres = "0123456789";
  var contraseña = "";
  for (i = 0; i < long; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  return (contraseña);
}

function generarNumTarjeta(long) {
  function chequearDuplicados(cod) {
    const statement = "SELECT * FROM Tarjetas WHERE nroTarjeta = @cod FOR JSON PATH"
    function handleResult(err, numRows, rows) {
      if (err) return console.error("Error: ", err);
    }
    let results = '';
    let request = new tedious.Request(statement, handleResult);
    request.addParameter('cod', TYPES.Int, cod);
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        results += column.value + " ";
      });
    });
    request.on('doneProc', function (rowCount, more, returnStatus, rows) {
      if (results == '') {
        return false
      }
      else {
        return true
      }
    });
    connection.execSql(request);
  };
  var cod = defaulCodigoNumerico(3);
  while (defaulCodigoNumerico(3)) {
    cod = defaulCodigoNumerico(3);
  }
  return (cod);
};

function existeUsr(dni, callback) {
  const statement = "SELECT * FROM Usuarios WHERE dni = @dni FOR JSON PATH"
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
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') {
      return callback(false)
    }
    else {
      return callback(true)
    }
  });
  connection.execSql(request);
};

function tieneTarjeta(dni, callback) {
  const statement = "SELECT * FROM Tarjetas where dni = @dni FOR JSON PATH"
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
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') {
      return callback(false)
    }
    else {
      return callback(true)
    }
  });
  connection.execSql(request);
};

function isHabilitado(nroTarjeta, dineroGastado, callback) { //Chequea si el monto no supera el limite de la tarjeta
  const statement = "UPDATE Tarjetas SET dineroGastado += @dineroGastado OUTPUT @@ROWCOUNT as rta WHERE nroTarjeta = @nroTarjeta AND dineroGastado+@dineroGastado <= limite"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('nroTarjeta', TYPES.VarChar, nroTarjeta);
  request.addParameter('dineroGastado', TYPES.Float, dineroGastado);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') return callback(false); //SALDO INSUFICIENTE
    else {
      return callback(true); //SALDO SUFICIENTE
    }
  });
  connection.execSql(request);
}

function existeTarjetaConCodigo(nroTarjeta, codSeg, callback) {
  const statement = "SELECT * FROM Tarjetas WHERE nroTarjeta = @nroTarjeta AND codSeg = @codSeg FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('nroTarjeta', TYPES.VarChar, nroTarjeta);
  request.addParameter('codSeg', TYPES.Int, codSeg);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') return callback(false); //TARJETA O CODIGO ERRONEO
    else return callback(true);
  });
  connection.execSql(request);
}

function getSubtotalForAllClientesWithCBU(callback) {
  const statement = "SELECT u.cbu, SUM(m.monto) AS subtotal FROM Movimientos m JOIN Tarjetas t ON m.nroTarjeta = t.nroTarjeta JOIN Usuarios u ON t.dni = u.dni WHERE t.dni IN (SELECT dni FROM Usuarios WHERE tipo = 'cliente' AND cbu != '') AND m.fechaCuota BETWEEN @anio+'-'+@mesPrev+'-23' AND @anio+'-'+@mesPost+'-22' GROUP BY u.cbu FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  var dt = new Date();
  var mes = dt.getMonth();
  var anio = dt.getFullYear();
  request.addParameter('mesPrev', TYPES.VarChar, mes.toString());
  request.addParameter('mesPost', TYPES.VarChar, (mes + 1).toString());
  request.addParameter('anio', TYPES.VarChar, anio.toString());
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') return callback(null);
    else return callback(results);
  });
  connection.execSql(request);
}

function getCbuEntidad(idEntidad, callback) {
  const statement = "SELECT cbu AS cbuDestino FROM Entidades WHERE idEntidad = @idEntidad FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('idEntidad', TYPES.Int, idEntidad);
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') return callback(null);
    else return callback(results);
  });
  connection.execSql(request);
}

schedule.scheduleJob('59 23 22 * *', function () { //NOTIFICAR AL BANCO GASTOS DE CLIENTES
  getSubtotalForAllClientesWithCBU(function (result) {
    var clientes = result;
    if (clientes != null) {
      var obj = JSON.parse(clientes)
      obj.forEach(element => {
        var total = element.subtotal + element.subtotal * 0.03;
        delete element.subtotal;
        element['monto'] = total;
        element['cbuOrigen'] = cbuEntidadCredito;
        element['descripcion'] = 'Pago';
      });
      var response = JSON.stringify(obj);
      fetch('https://bancaservice.azurewebsites.net/api/integration/transferir?movimientos=' +
        response + '&user=tarjeta01&origenMovimiento=origen1', {
        method: "POST",
        body: JSON.stringify(''),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
        .then(json => console.log(json));
    }
    else {
      console.log('No hay movimientos registrados de los clientes con CBU durante ese periodo');
    }
  });
});

schedule.scheduleJob('59 23 22 * *', function () { //RESETEAR dineroGastado CUANDO EMPIEZA NUEVO PERIODO (los dias 22)
  var dt = new Date();
  var anio = dt.getFullYear();
  var mes = dt.getMonth() + 1;
  const statement = "SELECT t.dni, SUM(m.monto) AS total FROM Movimientos m JOIN Tarjetas t ON m.nroTarjeta = t.nroTarjeta JOIN Entidades e ON m.idEntidad = e.idEntidad WHERE m.fechaCuota BETWEEN @anio+'-'+@mesPrev+'-23' AND @anio+'-'+@mesPost+'-22' GROUP BY t.dni FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  request.addParameter('mesPrev', TYPES.VarChar, mes.toString());
  request.addParameter('mesPost', TYPES.VarChar, (mes + 1).toString());
  request.addParameter('anio', TYPES.VarChar, anio.toString());
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('requestCompleted', function (rowCount, more, returnStatus, rows) {
    if (results == '') {
      request = new Request("UPDATE Tarjetas SET dineroGastado = 0", function (err) {
        if (err) {
          console.log(err);
        }
      });
      connection.execSql(request);
    }
    else {
      var obj = JSON.parse(results)
      var query = [];
      query.push(" UPDATE Tarjetas SET dineroGastado = 0")
      obj.forEach(element => {
        query.push(" UPDATE Tarjetas SET dineroGastado = " + element.total + " WHERE dni = " + element.dni);
      });
      query = query.toString().replace(/,/g, " ");
      request = new Request(query, function (err) {
        if (err) {
          console.log(err);
        }
      });
      connection.execSql(request);
    }
  });
  connection.execSql(request);
})

/*
schedule.scheduleJob('59 23 22 * *', function () { //NOTIFICAR AL BANCO FACTURACION DE ENTIDADES
  const statement = "SELECT e.cbu as cbuDestino, SUM(m.monto) as monto FROM Movimientos m JOIN Entidades e ON m.idEntidad = e.idEntidad WHERE m.fechaCuota BETWEEN @anio+'-'+@mesPrev+'-23' AND @anio+'-'+@mesPost+'-22' GROUP BY e.idEntidad, e.razonSocial, e.cbu FOR JSON PATH"
  function handleResult(err, numRows, rows) {
    if (err) return console.error("Error: ", err);
  }
  let results = '';
  let request = new tedious.Request(statement, handleResult);
  var dt = new Date();
  var anio = dt.getFullYear();
  var mes = dt.getMonth();
  request.addParameter('mesPost', TYPES.VarChar, (mes + 1).toString());
  request.addParameter('mesPrev', TYPES.VarChar, mes.toString());
  request.addParameter('anio', TYPES.VarChar, anio.toString());
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      results += column.value + " ";
    });
  });
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    if (results == '') {
      console.log('No hay entidades a las que facturar');
    }
    else {
      var obj = JSON.parse(results)
      obj.forEach((element) => {
        element["cbuOrigen"] = cbuEntidadCredito
        element["descripcion"] = 'Pago'
      });
      obj = JSON.stringify(obj);
      fetch('https://bancaservice.azurewebsites.net/api/integration/transferir?movimientos=' +
        obj + '&user=tarjeta01&origenMovimiento=origen1', {
        method: "POST",
        body: JSON.stringify(''),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
        .then(json => console.log(json));
    }
  });
  connection.execSql(request);
});
*/