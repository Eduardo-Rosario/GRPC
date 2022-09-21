const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/auth.proto'))
const Authentication = grpc.loadPackageDefinition(protoObject)

const users = [
    { userName: 'Fulano123', password: '123456' }
  ]

function Auth ({ request: authRequest }, callback) {
    const userFound = users.find((user) => user.userName === authRequest.userName)
    if (!userFound) return callback(null, false)
    const response = { 
      authenticated: userFound.password === authRequest.password
    }
    return callback(null, response)
}

const server = new grpc.Server()
server.addService(Authentication.AuthenticationService.service, { Auth })

server.bindAsync(
  '0.0.0.0:50051', 
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://0.0.0.0:50051");
    server.start();
  })
console.log('Listening')