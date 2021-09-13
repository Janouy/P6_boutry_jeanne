// import du package HTTP natif de Node pour créer un serveur//
const http = require('http');
//import du fichier app.js//
const app = require('./app');

//import du fichier des variables d'environnement//
const dotenv = require("dotenv");

dotenv.config();

// Configuration du server pour qu'il écoute le port 3000//
const port = process.env.PORT;
app.set('port', port);

//recherche et gère les différentes erreurs//
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// cette fonction reçoit les objets du fichier app.js en tant qu'argument//
const server = http.createServer(app);

//cet écouteur d'évènements consigne le port nommé sur lequel le server s'execute//
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
