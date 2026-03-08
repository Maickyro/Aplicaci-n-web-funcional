const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("❌ MONGO_URI no está definido en el .env");

        await mongoose.connect(uri);
        console.log("🟢 MongoDB conectado correctamente");
    } catch (error) {
        console.error("🔴 Error al conectar MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
