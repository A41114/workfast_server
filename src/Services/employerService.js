import { response } from "express";
import db from "../models/index";

let CreateNewRecruitment=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.title){
                resolve({
                    errCode:1,
                    errMessage:'Tên chức vụ không phù hợp !',
                })
            }
            else{
                await db.Recruitment.create({
                    employerId : data.employerId,
                    companyId : data.companyId,
                    title : data.title,
                    position : data.position,
                    field : data.field,
                    jobDescriptionMarkdown : data.jobDescriptionMarkdown,
                    jobDescriptionHTML : data.jobDescriptionHTML,
                    workLocation : data.workLocation,
                    yearOfExperience : data.yearOfExperience,
                    salary : data.salary,
                    endDate : data.endDate,
                    public : data.public,
                    amount : data.amount,
                    gender : data.gender
                })
            }
                        
        } catch (e) {
            reject(e)
        }
    })
}
let GetAllRecruitment=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.Recruitment.findAll({
                where:{employerId: userId}
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
                    Message: `You haven't created any recruitment yet`,
                    data
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let updateRecruitment=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.recruitmentId){
                resolve({
                    errCode: 2,
                    message: 'Missing required paramter'
                });
            }
            else{
                let recruitment = await db.Recruitment.findOne({
                    where: { id : data.recruitmentId },
                    raw : false
                })
                if(recruitment){
                    recruitment.companyId = data.companyId,
                    recruitment.position = data.position,
                    recruitment.field = data.field,
                    recruitment.jobDescriptionMarkdown = data.jobDescriptionMarkdown,
                    recruitment.jobDescriptionHTML = data.jobDescriptionHTML,
                    recruitment.workLocation = data.workLocation,
                    recruitment.yearOfExperience = data.yearOfExperience,
                    recruitment.salary = data.salary,
                    recruitment.endDate = data.endDate,
                    recruitment.amount = data.amount,
                    recruitment.gender = data.gender,

                    await recruitment.save({
                    });
                    resolve({
                        errCode: 0,
                        message: 'Update recruitment succeed !'
                    });
                }
                else{
                    resolve({
                        errCode: 0,
                        message: 'Missing id !'
                    });
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let DeleteRecruitment = (recruitmentId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let recruitment = await db.Recruitment.findOne({
                where:{id: recruitmentId}
            });
            if(!recruitment){
                resolve({
                    errCode:2,
                    errMessage: `This recruitment isn't exist !`
                });
            }
            await db.Recruitment.destroy({
                where : {id : recruitmentId}
            })
            resolve({
                errCode:0,
                message: 'This recruitment is deleted !'
            });
        } catch (e) {
            reject(e)
        }
    })
}
let updateStatusRecruitment= (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            if(!data.recruitmentId){
                resolve({
                    errCode: 2,
                    message: 'Missing recruitment id'
                });
            }
            if(!data.status){
                resolve({
                    errCode: 2,
                    message: 'Missing recruitment status'
                });
            }
            else{
                let recruitment = await db.Recruitment.findOne({
                    where: { id : data.recruitmentId },
                    raw : false
                })
                if(recruitment){
                    recruitment.public = data.status

                    await recruitment.save({
                    });
                    resolve({
                        errCode: 0,
                        message: 'Update recruitment status succeed !'
                    });
                }
                else{
                    resolve({
                        errCode: 0,
                        message: 'Missing id !'
                    });
                }
            }

        } catch (e) {
            reject(e)
        }
    })
}
let GetAllCvByRecruitmentId=(recruitmentId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!recruitmentId){
                resolve({
                    errCode:1,
                    errMessage:'Missing recruitmentId'
                })
            }else{
                let cv = await db.Status.findAll({
                    where: { recruitmentId : recruitmentId },
                    raw : false
                })
                resolve({
                    errCode:0,
                    Message:'Get all cv succeed !!!',
                    cv
                })
                
            }
        } catch (e) {
            reject(e)
        }
    })
}
let UpdateAppliedCvStatus=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            //console.log('data: ',data)
            if(!data.cvId || !data.status){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters !!!'
                })
            }else{
                let cv = await db.Status.findOne({
                    where: { id : data.cvId },
                    raw : false
                })
                if(cv){
                    cv.value = data.status
                    await cv.save({
                    });
                    resolve({
                        errCode: 0,
                        message: 'Update applied cv status succeed !'
                    });
                }else{
                    resolve({
                        errCode: 2,
                        message: 'Cv not exits...'
                    });
                }
                
                
            }
        } catch (e) {
            reject(e)
        }
    })
}
let GetStatisticsByRecruitmentId=(recruitmentId)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!recruitmentId){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters !'
                })
            }else{
                let cv = await db.Status.findAll({
                    where:{recruitmentId:recruitmentId},
                    attributes:['candidateId','value']
                })
                if(cv.length>0){
                    

                    let n = 0
                    let interview = 0
                    let p = 0
                    let f = 0


                    for(let i = 0; i < cv.length; i++){
                        // console.log('cv: ',i,': ',cv[i].candidateId, cv[i].value)
                        if(cv[i].value==='Đợi xác nhận'){
                            n+=1
                        }
                        else if(cv[i].value==='Chờ phỏng vấn'){
                            interview+=1
                        }
                        else if(cv[i].value==='Được nhận'){
                            p+=1
                        }
                        else if(cv[i].value==='Bị loại'){
                            f+=1
                        }
                    }
                    
                    let New = [{count:n},{percentage:(n/cv.length).toFixed(2)*100}]
                    let Interview = [{count:interview},{percentage:(interview/cv.length).toFixed(2)*100}]
                    let Pass = [{count:p},{percentage:(p/cv.length).toFixed(2)*100}]
                    let Fail = [{count:f},{percentage:(f/cv.length).toFixed(2)*100}]
                    let statistics = [New,Interview,Pass,Fail]
                    console.log('statistics',statistics)
                    resolve({
                        errCode:0,
                        errMessage:'Get stastics succeed !',
                        statistics
                    })
                    



                }else{
                    resolve({
                        errCode:2,
                        errMessage:'This recuitment does not has applied cv yet !'
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let ChangeEmplyerCompany=(data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.newCompanyId||!data.employerId){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameters !'
                })
            }else{
                let user = await db.User.findOne({
                    where: { id : data.employerId },
                    raw : false
                })
                if(user){
                    user.companyId = data.newCompanyId
                    await user.save({
                    });
                    resolve({
                        errCode: 0,
                        message: 'Update user company status succeed !'
                    });
                }else{
                    resolve({
                        errCode: 2,
                        message: 'User not exits...'
                    });
                }
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    CreateNewRecruitment:CreateNewRecruitment,
    GetAllRecruitment : GetAllRecruitment,
    updateRecruitment : updateRecruitment,
    DeleteRecruitment : DeleteRecruitment,
    updateStatusRecruitment : updateStatusRecruitment,
    GetAllCvByRecruitmentId : GetAllCvByRecruitmentId,
    UpdateAppliedCvStatus : UpdateAppliedCvStatus,
    GetStatisticsByRecruitmentId : GetStatisticsByRecruitmentId,
    ChangeEmplyerCompany : ChangeEmplyerCompany
}