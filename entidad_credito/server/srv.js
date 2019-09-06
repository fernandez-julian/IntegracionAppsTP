const Connection = require('tedious').Connection;
//const Request = require('tedious').Request;
var express = require('express');
var app = express();
const router = express.Router();
let tedious = require('tedious');

var config = {
  //server: '192.168.0.13',
  //10.100.44.211
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
    console.log(nombre, dni, passDefault);
    request = new Request("INSERT INTO Usuarios (tipo, nombre, passDefault, fechaNac, dni, telefono, mail) values (@tipo, @nombre, @passDefault, @fechaNac, @dni, @telefono, @mail)", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('tipo', TYPES.NVarChar, tipo);
    request.addParameter('nombre', TYPES.NVarChar, nombre);
    request.addParameter('passDefault', TYPES.NVarChar, passDefault);
    request.addParameter('fechaNac', TYPES.Date, fechaNac);
    request.addParameter('dni', TYPES.Int, dni);
    request.addParameter('telefono', TYPES.Int, telefono);
    request.addParameter('mail', TYPES.NVarChar, mail);
    console.log(request)
    connection.execSql(request);
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.json({ clave: passDefault });
  })




);

function defaulPass() {
  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var contraseña = "";
  for (i = 0; i < 6; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); //pass de 6 caracteres
  return (contraseña);
}