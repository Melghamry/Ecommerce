const mongoose = require('mongoose');
mongoose.connect( 
    process.env.MONGO_URL 
).then(() => {
    console.log(`database connected to MongoDB at ${mongoose.connection.host}`)
})
    .catch((err) => {
        console.log(err)
    });
