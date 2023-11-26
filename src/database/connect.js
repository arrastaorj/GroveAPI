import { connect } from "mongoose"
import mongoose from 'mongoose'
import chalk from "chalk"



const databaseModule = {
    start() {
        mongoose.set('strictQuery', false);
        try {
            connect(process.env.mongourl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("[MongoDB]".bgGreen, "Conectado ao Banco de Dados.".green)

        } catch (err) {
            if (err) return console.log(`🚨 | [MongoDB]:`, err);
        }
    }
}

export default databaseModule;