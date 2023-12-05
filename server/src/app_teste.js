const express = require('express');
const app = express();
const cors = require('cors');
const ai = require('./aiBot.js');
const path = require('path'); // Import the 'path' module

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public'))); // Adjust the path as needed

app.use('/mensagem', ai.botaAi);

app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port'));
});