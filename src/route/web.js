import  express  from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import employerController from "../controllers/employerController"
import candidateController from "../controllers/candidateController"

let router = express.Router();

let initWebRoutes = (app)=>{
    router.get('/', homeController.getHomePage);
    router.get('/aboutme',homeController.getAboutme);
    router.get('/crud',homeController.getCRUD);//them
    router.post('/post-crud',homeController.postCRUD);//them

    router.get('/get-crud', homeController.displayGetCRUD);//danh sach

    router.get('/edit-crud', homeController.getEditCRUD);//sua
    router.post('/put-crud',homeController.putCRUD);//sua
    
    router.get('/delete-crud',homeController.deleteCRUD);//xoa

//api
    router.post('/api/login', userController.handleLogin);//dang nhap
    router.get('/api/get-all-users', userController.handleGetAllUsers);//danh sach
    router.post('/api/create-new-user', userController.handleCreateNewUsers);//tao
    router.put('/api/edit-user', userController.handleEditUser);//sua
    router.delete('/api/delete-user', userController.handleDeleteUser);//xoa
    router.get('/api/allcode', userController.getAllCode);//lay tat ca code

    //employer-my work
    router.post('/api/create-new-recruitment', employerController.handleCreateNewRecruitment);//tao donn tuyen dung
    router.get('/api/get-all-recruitment-by-id', employerController.handleGetAllRecruitment);//lay don tuyen dung theo id user
    router.put('/api/edit-recruitment', employerController.handleEditRecruitment);//sua don tuyen dung
    router.delete('/api/delete-recruitment', employerController.handleDeleteRecruitment);//xoa dơn tuyen dung
    router.put('/api/edit-status-recruitment', employerController.handleEditStatusRecruitment);//sua trang thai don tuyen dung

    router.get('/api/get-all-cv-by-recruitmentId', employerController.handleGetAllCvByRecruitmentId);//lay cv da nop thuoc don tuyen dung

    router.put('/api/update-applied-cv-status', employerController.handleUpdateAppliedCvStatus);//sua trang thai cv da nop

    router.get('/api/get-statistics-by-recruitmentId', employerController.handleGetStatisticsByRecruitmentId);//lay thong ke don tuyen dung

    router.put('/api/change-employer-company', employerController.handleChangeEmplyerCompany);//đổi công ty
    

    //candidate-my work
    router.post('/api/create-new-cv', candidateController.handleCreateNewCv);//tao CV
    router.get('/api/get-all-Cv-by-id', candidateController.handleGetAllCv);//lay CV theo id user
    router.put('/api/edit-cv', candidateController.handleEditCv);//sua CV
    router.delete('/api/delete-cv', candidateController.handleDeleteCv);//xoa cv
    router.get('/api/get-applied-Cv-by-id', candidateController.handleGetAppliedCvByCandidateId);//lay CV da nop theo id user

    //candidate-homepage
    router.get('/api/get-recruitment-detail-by-id', candidateController.handleGetRecruitmentDetailById);//lay thong tin don tuyen dung va cong ty
    router.post('/api/apply-cv', candidateController.handleApplyCv);//nop CV
    router.get('/api/get-company-detail-by-id', candidateController.handleGetCompanyDetailById);//lay thong tin cong ty

    router.post('/api/change-follow-status', candidateController.handleChangeFollowStatus);//doi trang thai theo doi
    router.get('/api/get-follow-by-id', candidateController.handleGetFollowlById);//lay thong tin theo doi bang id ng dung
    


    //user 
    router.put('/api/change-password', userController.handleChangePassword);//doi mk cv
    router.put('/api/update-user-info', userController.handleUpdateUserInfo);//cap nhat nguoi dung
    router.get('/api/get-user-by-id', userController.handleGetUserById);//lay user theo id

    router.get('/api/get-all-recruitments-to-homepage', userController.handleGetAllRecruitmentsToHomepage);//lay don tuyen dung lên trang chủ
    router.get('/api/get-all-companies', userController.handleGetAllCompanies);//lay tat ca cong ty
    router.post('/api/create-new-company', userController.handleCreateNewCompany);//tao cong ty
    router.put('/api/update-company-info', userController.handleUpdateCompanyInfo);//cap nhat cong ty
    router.delete('/api/delete-company', userController.handleDeleteCompany);//xoa dơn cong ty


    //rest api : sử dụng get, post,...
    return app.use("/", router);
}

module.exports = initWebRoutes