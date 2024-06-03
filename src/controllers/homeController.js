import db from '../models/index';
import CRUDService from '../Services/CRUDService';

let getHomePage = async (req,res) =>{
    try{
        let data= await db.User.findAll();
    

        return res.render('homePage.ejs', {
            data: JSON.stringify(data) 
        }); 
    }catch(e){
        console.log(e)
    }
}

let getAboutme = (req,res) =>{
    return res.render('test/about.ejs');
}

let getCRUD = (req,res) =>{
    return res.render('crud.ejs');
}

let postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });

}

let getEditCRUD = async (req, res)=>{
    let userId = req.query.id;
    console.log('id nguoi dung muon sua: '+userId);
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        //check userData not found


        
        return res.render('editCRUD.ejs',{
            user : userData
            //x <- y
        });
    }
    else{
        return res.send("User not found");
    }
    
}
let putCRUD = async (req,res)=>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    // return res.render('displayCRUD.ejs',{
    //     dataTable: allUsers
    // });
    return res.redirect('/get-crud')
}

let deleteCRUD = async(req,res)=>{
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id)
        return res.redirect('/get-crud')
    }
    else{
        return res.send('User not found')
    }
    
}

module.exports = {
    getHomePage: getHomePage,
    getAboutme : getAboutme,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    displayGetCRUD : displayGetCRUD,
    getEditCRUD : getEditCRUD,
    putCRUD : putCRUD,
    deleteCRUD : deleteCRUD,
}