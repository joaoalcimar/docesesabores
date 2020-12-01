const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));

app.use('/api/recipe', require('./routes/api/recipe'));
//app.use('/api/budget', require('./routes/api/budget'));
app.use('/api/ingredient', require('./routes/api/ingredient'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
