import db from '../models/index';
import candidateService from '../Services/candidateService'

let handleCreateNewCv=(async(req,res)=>{
    try {
    
        let data = await candidateService.CreateNewCv(req.body)
        return res.status(200).json(data);
        
    } catch (e) {
        console.log('Handle create new cv error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

})
let handleGetAllCv=(async(req,res)=>{
    try {
        if(!req.query.id){
            console.log('Missing id ')
            return res.status(200).json({
                errCode: -2,
                errMessage: 'Missing required parameters !!'
            })
        }else{
            try {
                let data = await candidateService.GetAllCv(req.query.id)
                return res.status(200).json(data);
            } catch (e) {
                console.log('Handle get all cv error: ', e)
                return res.status(200).json({
                    errCode: -1,
                    errMessage: 'Error from server'
                })
            }
        }

    } catch (e) {
        console.log('Handle get all cv error: ', e)
        return({
            errCode:-1,
            errMessage:'Error from the server'
        })
    }
})
let handleEditCv=(async(req,res)=>{
    let data = req.body;
    let message = await candidateService.updateCv(data);
    return res.status(200).json(message);
})
let handleDeleteCv=(async(req,res)=>{
    if(!req.query.id){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing id !!!'
        })
    }else{
        try {
            let data = await candidateService.DeleteCv(req.query.id)
            return res.status(200).json(data);
        } catch (e) {
            console.log('Handle delete cv error: ', e)
            return res.status(200).json({
                errCode:-1,
                errMessage:'Error from the server !!'
            });
        }
        
    }        
})

let handleGetRecruitmentDetailById=(async(req,res)=>{
    if(!req.query.id){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing id !!!'
        })
    }else{
        try {
            let data = await candidateService.GetRecruitmentDetailById(req.query.id)
            return res.status(200).json(data);
        } catch (e) {
            console.log('Handle get recruitment detail error: ', e)
            return res.status(200).json({
                errCode:-1,
                errMessage:'Error from the server !!'
            });
        }
    }

})
let handleApplyCv=(async(req,res)=>{
    try {
        let data = await candidateService.ApplyCv(req.body)
        return res.status(200).json(data);
        
    } catch (e) {
        console.log('Handle apply cv error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

})
let handleGetAppliedCvByCandidateId = (async(req,res)=>{
    if(!req.query.id){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing id !!!'
        })
    }else{
        try {
            let data = await candidateService.GetAppliedCvByCandidateId(req.query.id)
            return res.status(200).json(data);
            
        } catch (e) {
            console.log('Handle apply cv error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }    
})
let handleGetCompanyDetailById = (async(req,res)=>{
    if(!req.query.id){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing id !!!'
        })
    }else{
        try {
            let data = await candidateService.GetCompanyDetailById(req.query.id)
            return res.status(200).json(data);
            
        } catch (e) {
            console.log('Handle apply cv error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }  
})
let handleChangeFollowStatus = (async(req,res)=>{
    try {
        let data = await candidateService.ChangeFollowStatus(req.body)

        return res.status(200).json(data);
    } catch (e) {
        console.log('Handle create follow error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
})
let handleGetFollowlById=(async(req,res)=>{
    if(!req.query.id){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing user id !!!'
        })
    }else{
        try {
            let data = await candidateService.GetFollowlById(req.query.id)
            return res.status(200).json(data);
            
        } catch (e) {
            console.log('handleGetFollowlById cv error: ', e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from server'
            })
        }
    }  

})

module.exports = {  
    handleCreateNewCv : handleCreateNewCv,
    handleGetAllCv : handleGetAllCv,
    handleEditCv : handleEditCv,
    handleDeleteCv : handleDeleteCv,
    handleGetRecruitmentDetailById : handleGetRecruitmentDetailById,
    handleApplyCv : handleApplyCv,
    handleGetAppliedCvByCandidateId: handleGetAppliedCvByCandidateId,
    handleGetCompanyDetailById : handleGetCompanyDetailById,
    handleChangeFollowStatus : handleChangeFollowStatus,
    handleGetFollowlById : handleGetFollowlById
  
}  