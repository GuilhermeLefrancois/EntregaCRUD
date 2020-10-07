console.log("Server Start...")
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://sa:200021@cluster0.4l8a9.mongodb.net/DB-CRUD-NODE?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => 
{
  if (err) return console.log(err)
  db = client.db('DB-CRUD-NODE')
  app.listen(3000, () => 
  {
    console.log('Servidor rodando na porta 3000')
  })
})

app.get('/', (req, res) =>
{
  res.render('home');
});

app.get('/cadastro-cliente', (req, res) =>
{ 
  res.render('cadastro-cliente')
})

app.get('/show-cliente', (req, res) => 
{
  db.collection('Clientes').find().toArray((err, results) => 
  {
      if (err) return console.log(err)
      res.render('show-cliente', { data: results })

  })
})

app.get('/cadastro-produto', (req, res) =>
{ 
  res.render('cadastro-produto')
})

app.get('/show-produto', (req, res) => 
{
  db.collection('Produtos').find().toArray((err, results) => 
  {
      if (err) return console.log(err)
      res.render('show-produto', { data: results })
  })
})

app.post('/cadastro-cliente', (req, res)=>
{
  db.collection('Clientes').save(req.body, (err, result) => 
  {
      if (err) return console.log(err)
      console.log('Salvando um cliente no Banco de Dados')
      res.redirect('show-cliente')
    })
});

app.post('/cadastro-produto', (req, res)=>
{
  db.collection('Produtos').save(req.body, (err, result) => 
  {
      if (err) return console.log(err)
      console.log('Salvando um produto no Banco de Dados')
      res.redirect('show-produto')
    })
});

app.route('/edit-cliente/:id')
.get((req, res) => 
{
  var id = req.params.id
  db.collection('Clientes').find(ObjectId(id)).toArray((err, result) => 
  {
    if (err) return res.send(err)
    res.render('edit-cliente', { data: result })
  })
  db.collection('Clientes').updateOne({_id: ObjectId(id)}, 
  {
    $set: 
    {
      nome: req.body.nome,
      cpf: req.body.cpf,
      data_nascimento: req.body.data_nascimento,
      email: req.body.email,
      telefone: req.body.telefone,
      profissao: req.body.profissao,
      endereco: req.body.endereco
    }
  })
})
.post((req, res) => {
  var id = req.params.id
  db.collection('Clientes').updateOne({_id: ObjectId(id)}, 
  {
    $set: 
    {
      nome: req.body.nome,
      cpf: req.body.cpf,
      data_nascimento: req.body.data_nascimento,
      email: req.body.email,
      telefone: req.body.telefone,
      profissao: req.body.profissao,
      endereco: req.body.endereco
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show-cliente')
    console.log('Atualizado um Cliente no Banco de Dados')
  })
})

app.route('/delete-cliente/:id')
.get((req, res) => {
  var id = req.params.id
  db.collection('Clientes').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado um Cliente do Banco de Dados!')
    res.redirect('/show-cliente')
  })
})
app.post('/show-cliente', (req, res)=>{
  db.collection('Clientes').save(req.body, (err, result) => {
      if (err) return console.log(err)
      res.redirect('/show-cliente')
    })
});

app.route('/edit-produto/:id')
.get((req, res) => 
{
  var id = req.params.id
  db.collection('Produtos').find(ObjectId(id)).toArray((err, result) => 
  {
    if (err) return res.send(err)
    res.render('edit-produto', { data: result })
  })
  db.collection('Produtos').updateOne({_id: ObjectId(id)}, 
  {
    $set: 
    {
      nome: req.body.nome,
      cpf: req.body.cpf,
      data_nascimento: req.body.data_nascimento,
      email: req.body.email,
      telefone: req.body.telefone,
      profissao: req.body.profissao,
      endereco: req.body.endereco
    }
  })
})
.post((req, res) => {
  var id = req.params.id
  db.collection('Produtos').updateOne({_id: ObjectId(id)}, 
  {
    $set: 
    {
      produto: req.body.produto,
      marca: req.body.marca,
      qntd_estoque: req.body.qntd_estoque,
      descricao: req.body.descricao,
      preco: req.body.preco,
      apresentacao: req.body.apresentacao,
      ramo: req.body.ramo,
      tipo_entrega: req.body.tipo_entrega
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show-produto')
    console.log('Atualizado um Produto no Banco de Dados')
  })
})

app.route('/delete-produto/:id')
.get((req, res) => {
  var id = req.params.id
  db.collection('Produtos').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado um Produto do Banco de Dados!')
    res.redirect('/show-produto')
  })
})
app.post('/show-Produtos', (req, res)=>{
  db.collection('Produtos').save(req.body, (err, result) => {
      if (err) return console.log(err)
      res.redirect('/show-produto')
    })
});
