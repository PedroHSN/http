const http = require('http');
const url = require('url');
const fs = require('fs');//file system



http.createServer((request, response) => {

  let path = url.parse(request.url).pathname;
  
  if(path == "" || path == "/"){//se o c caminho for vazio ou / ele vai direito pro index
    path = "/index.html";
  }
  let fileName = "." + path;

  fs.readFile(fileName, (err, data) =>{
    if(err) { // se não encontrar o arquivo 
      response.writeHead(404, {"Content-Type":"text/html;charset=UTF-8"}); //text/html text/plain application/json
      response.end("<h1>Página Não encontrada</h1>")//msg na tela
    }else{
      response.writeHead(200, {"Content-Type":"text/html"})
      response.write(data);//vai mostrar oq tem no arquivo
      response.end();
    }
  })

}).listen(3000,(err) => {
  if(err){
    console.log(err) 
  }else {
    console.log("Servidor Rodando na Porta 3000")
  }
  
})