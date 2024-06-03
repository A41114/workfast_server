import db from '../models/index';
import userService from "../Services/userService";

let handleLogin=async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter !',
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user : userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async(req,res) => {
    let id = req.query.id; //ALL, id

    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage : 'Missing required parameters',
            users : []
        })
    }
    let users = await userService.getAllUsers(id);
    console.log(users);
    return res.status(200).json({
        errCode : 0,
        errMessage : 'OK',
        users 
    })
}

let handleCreateNewUsers= (async(req,res)=>{
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
})

let handleEditUser = (async(req,res)=>{
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
})

let handleDeleteUser = (async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!' 
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
})


let getAllCode = (async(req,res)=>{
    try {
        let data =  await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
    

})

let handleChangePassword=(async(req,res)=>{
    try {
        let message = await userService.ChangePassword(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log('Change password error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleUpdateUserInfo=(async(req,res)=>{
    try {
        
        let message = await userService.UpdateUserInfo(req.body)
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleGetUserById=(async(req,res)=>{
    try {
        //console.log('data from controller: ',req.query.id)
        let message = await userService.GetUserById(req.query.id)
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleGetAllRecruitmentsToHomepage=(async(req,res)=>{
    try {
        let recruitments = await userService.GetAllRecruitmentsToHomepage()
        return res.status(200).json(recruitments);
        
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleGetAllCompanies=(async(req,res)=>{
    try {
        let company = await userService.GetAllCompanies();
        return res.status(200).json(company);
        
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleCreateNewCompany=(async(req,res)=>{
    try {
        let company = await userService.CreateNewCompany(req.body);
        return res.status(200).json(company);
        
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})

let handleUpdateCompanyInfo=(async(req,res)=>{
    try {
        let message = await userService.UpdateCompanyInfo(req.body)
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleDeleteCompany=(async(req,res)=>{
    try {
        if(!req.body.id){
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters !' 
            })
        }else{
            let message = await userService.DeleteCompany(req.body.id);
            return res.status(200).json(message);
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
        
    }
})
module.exports = {  
    handleLogin : handleLogin,
    handleGetAllUsers : handleGetAllUsers,
    handleCreateNewUsers : handleCreateNewUsers,
    handleEditUser : handleEditUser,
    handleDeleteUser : handleDeleteUser,
    getAllCode : getAllCode,
    handleChangePassword : handleChangePassword,
    handleUpdateUserInfo : handleUpdateUserInfo,
    handleGetUserById : handleGetUserById,
    handleGetAllRecruitmentsToHomepage : handleGetAllRecruitmentsToHomepage,
    handleGetAllCompanies : handleGetAllCompanies,
    handleCreateNewCompany : handleCreateNewCompany,
    handleUpdateCompanyInfo : handleUpdateCompanyInfo,
    handleDeleteCompany : handleDeleteCompany
   
}   