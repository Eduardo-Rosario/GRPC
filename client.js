const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/auth.proto'))
const Authentication = grpc.loadPackageDefinition(protoObject)

const client = new Authentication.AuthenticationService('localhost:50051', grpc.credentials.createInsecure())

client.auth({userName: 'Fulano123', password: '123456'}, (_, auth) =>{
    return console.log(`User is authenticated: ${ auth.authenticated }`)
})