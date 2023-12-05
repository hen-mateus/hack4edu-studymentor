const express = require('express');
const app = express();
const cors = require('cors')

const ai = require('./aiBot.js');

app.set('port', process.env.PORT||3000);
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

app.use('/',ai.botaAi)

//route.get('/mensagem', ai.botaAi);

app.listen(app.get('port'),()=>{
    console.log('Start server on port' + app.get('port'));
})