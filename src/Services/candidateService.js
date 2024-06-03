import { response } from "express";
import db from "../models/index";

let CreateNewCv=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            
            if(!data.candidateId || !data.fullName || !data.position || !data.cvName){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters !!!',
                })
            }
            else{
                let message = 'from server service'
                let exist = await db.Cv.findOne({
                    where : {candidateId : data.candidateId, cvName:data.cvName}
                })
                if(exist){
                    
                    resolve({
                        errCode:2,
                        errMessage:'CV already exist !!',
                    })
                }
                else{
                    await db.Cv.create({
                    
                        candidateId : data.candidateId,
                        cvName:data.cvName,
                        fullName : data.fullName,
                        position : data.position,
                        dayOfBirth : data.dayOfBirth,
                        gender : data.gender,
                        phonenumber : data.phonenumber,
                        email : data.email,
                        address : data.address,
                        goals : data.goals,
                        skills : data.skills,
                        hobbies : data.hobbies,
                        education : data.education,
                        experience : data.experience,
                        activities : data.activities,
                        certificate : data.certificate,
                        awards : data.awards,
                        moreInf : data.moreInf,
                        
                        image : data.image
                        
                        
                    })
                    resolve({
                        errCode:0,
                        message:'New CV  !!!',
                    })

                }
                
            }

        } catch (e) {
            reject(e)
        }
    })
}
let GetAllCv=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.Cv.findAll({
                where:{candidateId: userId}
            });
            if(data.length>0){
                resolve({
                    errCode: 0,
                    Message: 'succeed !!!',
                    data
                });
            }
            else{
                resolve({
                    errCode: 0,
                    Message: `You haven't created any CV yet`,
                    data
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let updateCv=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.cvId || !data.fullName || !data.position){
                resolve({
                    errCode: 2,
                    message: 'Missing required paramter'
                });
            }
            else{
                let cv = await db.Cv.findOne({
                    where: { id : data.cvId },
                    raw : false
                })
                if(cv){
                    
                    cv.fullName = data.fullName,
                    cv.position = data.position,
                    cv.dayOfBirth = data.dayOfBirth,
                    cv.gender = data.gender,
                    cv.phonenumber = data.phonenumber,
                    cv.email = data.email,
                    cv.address = data.address,
                    cv.goals = data.goals,
                    cv.skills = data.skills,
                    cv.hobbies = data.hobbies,
                    cv.education = data.education,
                    cv.experience = data.experience,
                    cv.activities = data.activities,
                    cv.certificate = data.certificate,
                    cv.awards = data.awards,
                    cv.moreInf = data.moreInf,  
                    cv.image = data.image
                    
                    await cv.save({
                    });
                    resolve({
                        errCode: 0,
                        message: 'Update cv succeed !'
                    });
                }
                else{
                    resolve({
                        errCode: 0,
                        message: 'Cant find cv id in database !'
                    });
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let DeleteCv=(cvId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let cv = await db.Cv.findOne({
                where:{id: cvId}
            });
            if(!cv){
                resolve({
                    errCode:2,
                    errMessage: `This cv isn't exist !`
                });
            }
            await db.Cv.destroy({
                where : {id : cvId}
            })
            resolve({
                errCode:0,
                message: 'This cv is deleted !'
            });
        } catch (e) {
            reject(e)
        }
    })
}

let GetRecruitmentDetailById=(inputId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.Recruitment.findOne({

                include:[
                    {model: db.Company},
                ],
                where:{id:inputId},
                raw:true,
                nest:true
            })
            console.log('data: ',data)

            if(data){
                resolve({
                    errCode:0,
                    message:'Get recuitment detail succeeds !',
                    data
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}
let ApplyCv=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.recruitmentId||!data.candidateId||!data.cvName){
                resolve({
                    errCode:1,
                    message:'Missing required parameters !!!',
                })
            }
            else{
                await db.Status.create({
                    
                    recruitmentId: data.recruitmentId,
                    candidateId : data.candidateId,
                    cvName:data.cvName,

                    fullName : data.fullName,
                    position : data.position,
                    dayOfBirth : data.dayOfBirth,
                    gender : data.gender,
                    phonenumber : data.phonenumber,
                    email : data.email,
                    address : data.address,
                    goals : data.goals,
                    skills : data.skills,
                    hobbies : data.hobbies,
                    education : data.education,
                    experience : data.experience,
                    activities : data.activities,
                    certificate : data.certificate,
                    awards : data.awards,
                    moreInf : data.moreInf,
                    image : data.image,

                    value: 'Đợi xác nhận'
                    
                })
                resolve({
                    errCode:0,
                    message:'Apply CV succeeds !',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let GetAppliedCvByCandidateId=(candidateId)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!candidateId){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameter !',
                })
            }else{
                
                let cv = await db.Status.findAll({
                    where: { candidateId : candidateId },
                    order:[['createdAt','DESC']],
                    raw : false
                })
                if(cv.length>0){
                    resolve({
                        errCode:0,
                        errMessage:'Get applied cv succeed !',
                        cv
                    })
                }else{
                    resolve({
                        errCode:2,
                        errMessage:'You dont have any cv yet!',
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let GetCompanyDetailById=(companyId)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!companyId){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameter !',
                })
            }else{
                let company = await db.Company.findOne({
                    where: { id : companyId },
                    raw : false
                })
                if(company){
                    resolve({
                        errCode:0,
                        errMessage:'Get company succeed !',
                        company
                    })
                }else{
                    resolve({
                        errCode:2,
                        errMessage:'can not find company !',
                    })
                }
            }
            
        } catch (e) {
            reject(e)
        }
    })
}
let ChangeFollowStatus =(data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.userId||!data.followedId||!data.type){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameter !',
                })
            }else{
                let follow = await db.Follow.findOne({
                    where:{userId:data.userId,followedId:data.followedId,type:data.type}
                })
                if(follow){
                    await db.Follow.destroy({
                        where:{userId:data.userId,followedId:data.followedId,type:data.type}
                    })
                    resolve({
                        action:'Unfollow',
                        errCode:0,
                        errMessage:'Unfollow succeeds !',
                    })
                }else{
                    await db.Follow.create({
                        userId : data.userId,
                        followedId : data.followedId,
                        type : data.type
                    })
                    resolve({
                        action:'Follow',
                        errCode:0,
                        errMessage:'Follow succeeds !',
                    })
                }
                //update company follower
                if(data.type==='Company'){
                    //count company follower
                    
                    let count = await db.Follow.findAll({
                        where:{followedId:data.followedId,type:'Company'}
                    })
                    

                    let company = await db.Company.findOne({
                        where: { id : data.followedId },
                        raw : false
                    })
                    if(company){
                        // console.log('count: ',count.length)

                        company.follower = count.length
                        await company.save({
                        });
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let GetFollowlById=(userId)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!userId){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameter !',
                })
            }else{
                let follow = await db.Follow.findAll({
                    where: { userId : userId },
                    raw : false
                })
                if(follow){
                    resolve({
                        errCode:0,
                        errMessage:'Get follow succeed !',
                        follow
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    CreateNewCv : CreateNewCv,
    GetAllCv : GetAllCv,
    updateCv : updateCv,
    DeleteCv : DeleteCv,
    GetRecruitmentDetailById : GetRecruitmentDetailById,
    ApplyCv : ApplyCv,
    GetAppliedCvByCandidateId : GetAppliedCvByCandidateId,
    GetCompanyDetailById : GetCompanyDetailById,
    ChangeFollowStatus : ChangeFollowStatus,
    GetFollowlById : GetFollowlById
}