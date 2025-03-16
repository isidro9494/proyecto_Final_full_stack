const AuthServices = require("../services/authService")


const registerUser = async (req,res)=>{
try{
    const {username,password}= req.body;
    const user = await  AuthService.register(username, password);
    res.status(201).json({ message: 'Usuario registrado', user });
}catch(error){
    res.status(400).json({ error: err.message });
}
}
const loguinUser = async (req,res)=>{
    try{
        const {username,password}= req.body;
        const token = await  AuthService.login(username, password);
        res.status(201).json({ message: 'Inicio de sesión exitoso', token });
    }catch(error){
        res.status(400).json({ error: err.message });
    }
    }