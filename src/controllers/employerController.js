import db from '../models/index';
import employerService from '../Services/employerService'

let handleCreateNewRecruitment=(async(req,res)=>{
    try {
        //console.log('check recruitment controller')
        let data = await employerService.CreateNewRecruitment(req.body)
        return res.status(200).json(data);

    } catch (e) {
        console.log('Handle create new recruitment error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

})
let handleGetAllRecruitment=(async(req,res)=>{
    if(!req.query.id){
        console.log('Missing id ')
        return res.status(200).json({
            errCode: -2,
            errMessage: 'Missing required parameters !!'
        })
    }else{
        try {
            let data = await employerService.GetAllRecruitment(req.query.id)
            return res.status(200).json(data);
        } catch (e) {
            console.log('Handle get all recruitment error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }
})

let handleEditRecruitment=(async(req,res)=>{
    let data = req.body;
    let message = await employerService.updateRecruitment(data);
    return res.status(200).json(message);
    
})
let handleDeleteRecruitment=(async(req,res)=>{
    if(!req.query.id){
        console.log('Missing id ')
        return res.status(200).json({
            errCode: -2,
            errMessage: 'Missing id !!'
        })
    }else{
        try {
            let data = await employerService.DeleteRecruitment(req.query.id)
            return res.status(200).json(data);
        } catch (e) {
            console.log('Handle delete recruitment error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }
})
let handleEditStatusRecruitment=(async(req,res)=>{
    let data = req.body;
    let message = await employerService.updateStatusRecruitment(data);
    return res.status(200).json(message);
})

let handleGetAllCvByRecruitmentId=(async(req,res)=>{
    if(!req.query.id){
        console.log('Missing recruitmentId ')
        return res.status(200).json({
            errCode: -2,
            errMessage: 'Missing required parameters !!'
        })
    }else{
        try {
            let data = await employerService.GetAllCvByRecruitmentId(req.query.id)
            
            return res.status(200).json(data);
        } catch (e) {
            console.log('Handle get all cv by recruitmentId error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }
})
let handleUpdateAppliedCvStatus=(async(req,res)=>{
    try {
        //console.log('check employer controller: ',req.body)
        let data = await employerService.UpdateAppliedCvStatus(req.body)
        return res.status(200).json(data);

    } catch (e) {
        console.log('Handle update applied cv status error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

})
let handleGetStatisticsByRecruitmentId=(async(req,res)=>{
    if(!req.query.id){
        console.log('Missing recruitmentId ')
        return res.status(200).json({
            errCode: -2,
            errMessage: 'Missing required parameters !!'
        })

    }else{
        try {
            let data = await employerService.GetStatisticsByRecruitmentId(req.query.id)
            return res.status(200).json(data)
            
        } catch (e) {
            console.log('Handle GetStatisticsByRecruitmentId error: ',e)
            return res.status(200).json({
                errCode:-1,
                errMessage:'Error from server'
            })
        }
    }
    
})
let handleChangeEmplyerCompany=(async(req,res)=>{
    try {
        //console.log('check employer controller: ',req.body)
        let data = await employerService.ChangeEmplyerCompany(req.body)
        return res.status(200).json(data);

    } catch (e) {
        console.log('Handle ChangeEmplyerCompany error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

})
module.exports = {  
    handleCreateNewRecruitment:handleCreateNewRecruitment,
    handleGetAllRecruitment : handleGetAllRecruitment,
    handleEditRecruitment : handleEditRecruitment,
    handleDeleteRecruitment : handleDeleteRecruitment,
    handleEditStatusRecruitment : handleEditStatusRecruitment,
    handleGetAllCvByRecruitmentId : handleGetAllCvByRecruitmentId,
    handleUpdateAppliedCvStatus : handleUpdateAppliedCvStatus,
    handleGetStatisticsByRecruitmentId : handleGetStatisticsByRecruitmentId,
    handleChangeEmplyerCompany: handleChangeEmplyerCompany,
    
}   