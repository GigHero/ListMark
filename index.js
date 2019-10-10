const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const itensRouter = require('./routes/itensRouter');
const listasRouter = require('./routes/listasRouter');
const mercadosRouter = require('./routes/mercadosRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/listas', listasRouter);
app.use('/itens', itensRouter);
app.use('/mercados', mercadosRouter);

app.get('/', (req, res, next) => {
  res.render('site/index', {
    titulo: 'Vai uma ajuda aí?',
    corpo: "Olá! Bem vindo(a) ao MarkList! Aqui seu dinheiro vale mais! Te oferecemos uma plataforma para gerenciamento de suas compras onde você poderá ver os melhores preços, onde comprar e fará uma bela economia no final do mês! Quer tentar a 'sorte'? Então vai que é sua! Abaixo está uma breve explicação de como utilizar a plataforma, não se assuste, é tão fácil que até a minha vó consegue aprender, certamente você se sairá bem ;)"
  });
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(3000);
