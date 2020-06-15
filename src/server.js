const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// Configurar pasta pública
server.use(express.static("public"))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/pages",{
    express: server,
    noCache: true
})

// Configurar caminhos
// Página inicial, pontos de coleta e resultados
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um título"})
})

server.get("/pages/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    console.log(req.query)
    
    return res.render("create-point.html")
})

server.get("/pages/search-results", (req, res) => {
    
    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // Mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total })
    })    
})

// ligar o servidor
server.listen(3000)