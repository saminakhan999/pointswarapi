const app = require('./app');
const port = 3000;



const port = process.env.PORT || 3000; // if there is no PORT env variable, 3000 will be used
app.listen(port, () => console.log(`Express is running on port ${port}`))
