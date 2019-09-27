const Connection = require('tedious').Connection;
//const Request = require('tedious').Request;
var express = require('express');
var app = express();
const router = express.Router();
let tedious = require('tedious');

var config = {
  //server: '192.168.0.13',
  //10.100.44.211
  //10.100.49.234
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

//Inicializar el srv
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

app.use(
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
    const { nombre, fechaNac, dni, telefono, mail } = req.body;
    const passDefault = defaulPass(6); //6 es la long de la pass
    const tipo = 'cliente';
    request = new Request("INSERT INTO Usuarios (tipo, nombre, passDefault, passPropia, fechaNac, dni, telefono, mail) values (@tipo, @nombre, @passDefault, @passPropia, @fechaNac, @dni, @telefono, @mail)", function (err) {
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
    const { razonSocial, direccion, telefono } = req.body;
    request = new Request("INSERT INTO Entidades (razonSocial, direccion, telefono) values (@razonSocial, @direccion, @telefono)", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('razonSocial', TYPES.NVarChar, razonSocial);
    request.addParameter('direccion', TYPES.NVarChar, direccion);
    request.addParameter('telefono', TYPES.NVarChar, telefono);

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
      if(existe){
        tieneTarjeta(dni, function(result){
          tiene = result;
          if(tiene){
            res.status(403).json('El cliente ya posee una tarjeta asociada')
          }
          else{
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
      else{
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
    if(currentDate.getMonth()+1 === mes){
      res.status(403).json('La liquidación del presente mes no está disponible ya que el mes aún está en curso');
    }
    else{
    var dt = new Date();
    var anio = dt.getFullYear();
    const statement = "SELECT fecha, monto, razonSocial FROM Movimientos m JOIN Tarjetas t ON m.nroTarjeta = t.nroTarjeta JOIN Entidades e ON m.idEntidad = e.idEntidad WHERE t.dni = @dni AND MONTH(m.fecha) = @mes AND YEAR(m.fecha) = @anio FOR JSON PATH"
    function handleResult(err, numRows, rows) {
      if (err) return console.error("Error: ", err);
    }
    let results = '';
    let request = new tedious.Request(statement, handleResult);
    request.addParameter('dni', TYPES.Int, dni);
    request.addParameter('mes', TYPES.Int, mes);
    request.addParameter('anio', TYPES.Int, anio);
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
          var amountobj = obj.map((item) => {return item['monto']});
          var totalAmountobj = amountobj.reduce(reducer);

          var totalAmountobjJSON = {"montoTotal": totalAmountobj};
          obj.push(totalAmountobjJSON);
          var response = JSON.stringify(obj);
          res.json(response);
        }
      });
      connection.execSql(request);
    }
  }),

  router.post('/movimientos/topCinco', (req, res) => {
    const { dni } = req.body;
    const statement = "SELECT TOP 5 fecha, monto, razonSocial FROM Movimientos m JOIN Tarjetas t ON m.nroTarjeta = t.nroTarjeta JOIN Entidades e ON m.idEntidad = e.idEntidad WHERE t.dni = @dni ORDER BY m.fecha DESC FOR JSON PATH"
    function handleResult(err, numRows, rows) {
      if (err) return console.error("Error: ", err);
    }
    let results = '';
    let request = new tedious.Request(statement, handleResult );
    request.addParameter('dni', TYPES.Int, dni);
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        results += column.value + " ";
      });
    });
    request.on('doneProc', function (rowCount, more, returnStatus, rows) {
      if (results == '') {
        res.status(404).json('No hay movimientos registrados');
      }
      else{ 
        res.json(results);
      }
    });
    connection.execSql(request);
  }),

);

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
    const statement = "select * from Tarjetas where nroTarjeta = @cod FOR JSON PATH"
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

async function existeUsr(dni, callback) {
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