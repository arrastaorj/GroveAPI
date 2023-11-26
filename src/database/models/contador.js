import db from "mongoose"



const contadorSchema = new db.Schema({
    contagem: { type: Number, default: 0 },
});

const Contador = db.model('Contador', contadorSchema);


export default Contador