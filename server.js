import  {app}  from './app.js';
import { connectDB } from './db/db.js';

connectDB();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is connected on port:${process.env.PORT} in ${process.env.NODE_DEV} Mode`);
})