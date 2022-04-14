const http = require('http');
const url = require('url');
const fs = require('fs');//file system

function handleFile(req, res, callback){
  let path = url.parse(req.url).pathname;
  let fileName = "." + path;

  fs.readFile(fileName, (err, data) =>{//lê o arquivo com o caminho de filename
    if(err) { // se não encontrar o arquivo 
          if(callback){
           if(!callback(req, res)){
             
              res.writeHead(404, {"Content-Type":"text/html;charset=UTF-8"}); //text/html text/plain application/json
              res.end("<h1>Página Não encontrada</h1>")//msg na tela
           }
          }
        
          
    }else{
          res.writeHead(200, {"Content-Type":"text/html"})
          res.write(data);//vai mostrar oq tem no arquivo
          res.end();
    }
  })
}

function handleRequest(req, res) {
  let path = url.parse(req.url).pathname;

  if(path == "/teste"){
    res.end("Teste");
    return true;
  }

  return false;
}

http.createServer((request, response) => {
  
    handleFile(request, response, handleRequest);


}).listen(3000,(err) => { //escolhe a porta
  if(err){
    console.log(err) 
  }else {
    console.log("Servidor Rodando na Porta 3000")
  }
  
})