const app = require('./app.js')
const port = 8080;

app.listen(port, () => console.log(`Server is now listening on port ${port}.`))