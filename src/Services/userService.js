import db from "../models/index";
import bcrypt from 'bcryptjs'


const salt =  bcrypt.genSaltSync(10);



let handleUserLogin = (email, password)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if(isExist){
                //user already exits
                
                let user = await db.User.findOne({
                    attributes:['id','email','roleId','password','firstName','lastName','dayOfBirth','gender','address','phonenumber','image','companyId'],
                    where:{email : email},
                    raw: true,
                });
                if(user){
                    //compare password
                    let check =await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User not found`
                }
            }else{
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in our system. Plz try other emails`;
            }
            resolve(userData)
        } catch (e) {
            
            reject(e);
        }
    })
}
let checkUserEmail=(userEmail)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {email : userEmail}
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
            
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id : userId},
                    attributes:{
                        exclude:['password']
                    }
                })
            }

            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if(check===true){
                resolve({
                    errCode:1,
                    errMessage:'Your email is already in used, Plz try another email!',
                })
            }
            else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                //R2
                if(data.roleId==='R2'){
                    //Tạo cty moi
                    console.log('companyId: ',data.companyId)
                    console.log('companyName: ',data.companyName)
                    if((!data.companyId)&&data.companyName){
                        console.log('Tạo cty mới')
                        let company = '' 
                        company = await db.Company.create({
                            companyName:data.companyName,
                            companyLocation:data.companyLocation,
                            companyIndustry:data.companyIndustry,
                            companyDescriptionMarkdown:data.companyDescriptionMarkdown,
                            companyDescriptionHTML:data.companyDescriptionHTML,
                            companyImage:data.companyImage,
                            size:data.size,
                            address:data.companyAddress,
                        })
                        await db.User.create({
                            email: data.email,
                            password: hashPasswordFromBcrypt,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address: data.address,
                            phonenumber: data.phonenumber,
                            gender: data.gender,
                            roleId: data.roleId,
                            dayOfBirth : data.dayOfBirth,
                            image : data.image,
                            companyId:company.id
                        })

                    }//Gan cong ty
                    else if(data.companyId&&!data.companyName){
                        console.log('Gán cty')
                        await db.User.create({
                            email: data.email,
                            password: hashPasswordFromBcrypt,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address: data.address,
                            phonenumber: data.phonenumber,
                            gender: data.gender,
                            roleId: data.roleId,
                            dayOfBirth : data.dayOfBirth,
                            image : data.image,
                            companyId:data.companyId
                        })
                    }
                    else{//khong co thong tin gi cua cty
                        console.log('Khong co thong tin')
                        await db.User.create({
                            email: data.email,
                            password: hashPasswordFromBcrypt,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address: data.address,
                            phonenumber: data.phonenumber,
                            gender: data.gender,
                            roleId: data.roleId,
                            dayOfBirth : data.dayOfBirth,
                            image : data.image,
                            // companyId:company.id
                        })
                    }
                    // }
                }
                // R1,R3
                else{
                    console.log('Admin and Candidate')
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        roleId: data.roleId,
                        dayOfBirth : data.dayOfBirth,
                        image : data.image
                    })
                }

                resolve({
                    errCode:0,
                    message:'OK',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{    
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData =(data)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: 'Missing required paramter'
                });
            }
            let user = await db.User.findOne({
                where: { id : data.id },
                raw : false
            })
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
                await user.save({
                });
                resolve({
                    errCode: 0,
                    message: 'Update user succeeds !'
                });
            }else{
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id: userId}
            });
            if(!user){
                resolve({
                    errCode:2,
                    errMessage: `This user isn't exist !`
                });
            }
            await db.User.destroy({
                where : {id : userId}
            })
            resolve({
                errCode:0,
                message: 'This user is deleted !'
            });
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !!'
                })
            }
            else{
                let res ={};
                let allcode = await db.Allcode.findAll({
                    where: {type : typeInput}
                });
                res.errCode=0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e)
        }
    })
}
let ChangePassword = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.userId || !data.oldPassword || !data.newPassword){
                resolve({
                    errCode: 1,
                    message: 'Missing required paramter !!!'
                });
            }
            else{
                //console.log('1: ',data.userId)
                //console.log('2: ',data.oldPassword)
                //console.log('3: ',data.newPassword)
                let user = await db.User.findOne({
                    where:{id:data.userId},
                    raw:false
                })
                if(user){
                    let check =await bcrypt.compareSync(data.oldPassword, user.password);
                    if(check){
                        let hashPasswordFromBcrypt = await hashUserPassword(data.newPassword);
                        user.password = hashPasswordFromBcrypt
                        await user.save({
                        });
                        resolve({
                            errCode: 0,
                            message: `Update user's password succeeds !`
                        });
                    }else{
                        resolve({
                            errCode: 2,
                            message: 'Wrong password !!!'
                        });
                    }
                }else{
                    resolve({
                        errCode: 3,
                        message: 'Can find user !!!'
                    });
                }
            }


        } catch (e) {
            reject(e)
        }
    })

}

let UpdateUserInfo=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.userId){
                resolve({
                    errCode: 1,
                    message: 'Missing id !!!'
                });
            }else{
                let user = await db.User.findOne({
                    where:{id:data.userId},
                    raw:false
                })
                if(user){
                    let check = false
                    if(data.email!=user.email){
                        check = await checkUserEmail(data.email);
                    }
                    if(check===true){
                        resolve({
                            errCode:2,
                            errMessage:'Your email is already in used, Plz try another email!',
                        })
                    }else{
                        user.email = data.email,
                        user.firstName = data.firstName,
                        user.lastName = data.lastName,
                        user.dayOfBirth = data.dayOfBirth,
                        user.gender = data.gender,
                        user.address = data.address,
                        user.phonenumber = data.phonenumber,
                        user.image = data.image
                        await user.save({
                        });
                        resolve({
                            errCode: 0,
                            message: `Update user's info succeeds !`
                        });
                    }

                }else{
                    resolve({
                        errCode: 3,
                        message: 'Can find user !!!'
                    });
                }
            }
            
        } catch (e) {
            reject(e)
        }
    })
}
let GetUserById=(inputId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            //console.log('data service: ',inputId)
            if(!inputId){
                resolve({
                    errCode: 1,
                    message: 'Missing id !!!'
                });
            }else{
                let user = await db.User.findOne({
                    where:{id:inputId},
                    attributes:{
                        exclude:['password']
                    },
                    raw:false
                })
                if(user){
                    resolve({
                        errCode: 0,
                        message: 'Get user succeeds !',
                        user
                    });
                }else{
                    resolve({
                        errCode: 0,
                        message: 'Cant find user !',
                        user
                    });
                }
            }
            
        } catch (e) {
            reject(e)
        }
    })
}
let GetAllRecruitmentsToHomepage=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let recruitments = await db.Recruitment.findAll({
                
                include:[
                    {model: db.Company},
                ],
                raw:true,
                nest:true
            })
            //console.log('recruitments: ',recruitments)
            if(recruitments){
                
                resolve({
                    errCode:0,
                    message:'Get recuitments to homepage succeeds !',
                    recruitments
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let GetAllCompanies=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let allComp = await db.Company.findAll()
            if(allComp){
                resolve({
                    errCode:0,
                    message: `Get all companies succeeds !`,
                    allComp
                });
            }else{
                resolve({
                    errCode:1,
                    errMessage: `There are no companies in the database !`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let CreateNewCompany=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.companyName){
                resolve({
                    errCode:0,
                    message: `Missing company name !`,
                });

            }else{
                let newCompany=await db.Company.create({
                    companyName : data.companyName,
                    companyDescriptionMarkdown : data.companyDescriptionMarkdown,
                    companyDescriptionHTML : data.companyDescriptionHTML,
                    companyImage : data.companyImage,
                    companyLocation : data.companyLocation,
                    companyIndustry : data.companyIndustry,
                    size : data.size,
                    address : data.address,
                    license:data.license,
                    status:data.status,
                    follower:0,
                })
                // console.log('company: ',newCompany.id)
                resolve({
                    errCode:0,
                    errMessage: `create company succeeds !`,
                    newCompany
                });
                
            }
        } catch (e) {
            reject(e)
        }
    })
}
let UpdateCompanyInfo=(data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters !'
                })
            }else{
                let company = await db.Company.findOne({
                    where:{id:data.id},
                    raw:false
                })
                if(company){
                    company.companyName = data.companyName,
                    company.companyDescriptionMarkdown=data.companyDescriptionMarkdown,
                    company.companyDescriptionHTML=data.companyDescriptionHTML,
                    company.companyImage=data.companyImage,
                    company.companyLocation=data.companyLocation,
                    company.companyIndustry=data.companyIndustry,
                    company.size=data.size,
                    company.address=data.address
                    await company.save({});
                    resolve({
                        errCode: 0,
                        message: `Update company's info succeeds !`
                    });
                }else{
                    resolve({
                        errCode: 0,
                        message: `Cant find company !`
                    });

                }
                

            }
        } catch (e) {
            reject(e)
        }
    })
}
let DeleteCompany=(id)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let company = await db.Company.findOne({
                where:{id: id}
            });
            if(!company){
                resolve({
                    errCode:2,
                    errMessage: `This company isn't exist !`
                });
            }
            await db.Company.destroy({
                where : {id : id}
            })
            let recruitment = await db.Recruitment.findAll({
                where:{companyId: id}
            });
            for(let i = 0;i<recruitment.length;i++){
                await db.Status.destroy({
                    where : {recruitmentId : recruitment[i].id}
                })
            }
            await db.Recruitment.destroy({
                where : {companyId : id}
            })
            
            resolve({
                errCode:0,
                message: 'Delete company succeeds !'
            });
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin : handleUserLogin,
    checkUserEmail : checkUserEmail,
    getAllUsers : getAllUsers,
    createNewUser : createNewUser,
    updateUserData : updateUserData,
    deleteUser : deleteUser,
    getAllCodeService : getAllCodeService,
    ChangePassword : ChangePassword,
    UpdateUserInfo : UpdateUserInfo,
    GetUserById : GetUserById,
    GetAllRecruitmentsToHomepage : GetAllRecruitmentsToHomepage,
    
    GetAllCompanies : GetAllCompanies,
    CreateNewCompany : CreateNewCompany,
    UpdateCompanyInfo : UpdateCompanyInfo,
    DeleteCompany : DeleteCompany
}