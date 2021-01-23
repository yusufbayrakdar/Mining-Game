const express = require('express');
const app = express();

const routes = require('./routes/index');

app.use("/", routes.router);

app.use((err, req, res, next) => {
	console.error(err);
	if(err.status){
		res.sendStatus(err.status);
	}else {
		res.sendStatus(500);
	}
});

app.get('/', (req, res) => {
    res.send('Mining Game Server');
});

const server = {
    name: 'mining-game',
    port: process.env.PORT || 3811
};
// Start server
app.listen(server.port , () => {
    console.info(`${server.name} listening at ${server.port}`);
});