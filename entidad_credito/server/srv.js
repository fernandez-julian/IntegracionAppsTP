const Connection = require('tedious').Connection;
//const Request = require('tedious').Request;
var express = require('express');
var app = express();
const router = express.Router();
let tedious = require('tedious');

var config = {
  //server: '192.168.0.13',
  //10.100.44.211
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
        console.log('null');
        res.status(404).json('Usuario o clave icorrecto');
      }
      else {
        console.log(results);
        res.json(results);
      }
    });
    connection.execSql(request);
  }),

  router.post('/clientes/registrar', (req, res) => {
    const { nombre, fechaNac, dni, telefono, mail } = req.body;
    const passDefault = defaulPass();
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
        console.log('null');
        //res.status(404).json('No hay clientes registrados');
      }
      else {
        console.log(results);
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
        console.log('null');
        res.status(404).json('No hay entidades registradas');
      }
      else {
        console.log(results);
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
        console.log('null');
        res.status(404).json('No hay tarjetas registradas');
      }
      else {
        console.log(results);
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
    request.addParameter('nroTarjeta', TYPES.Int, nroTarjeta);

    connection.execSql(request);
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

  router.get('/movimientos/obtener', (req, res) => {
    const { dni, mes } = req.body;
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
        console.log('null');
        res.status(404).json('No hay movimientos registrados en ese periodo');
      }
      else {
        console.log(results);
        res.json(results);
      }
    });
    connection.execSql(request);
  }),



);

function defaulPass() {
  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var contraseña = "";
  for (i = 0; i < 6; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); //pass de 6 caracteres
  return (contraseña);
}

function defaulCodigoSeguridad() {
  var caracteres = "0123456789";
  var contraseña = "";
  for (i = 0; i < 3; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); //pass de 3 caracteres
  return (contraseña);
}