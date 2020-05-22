const express = require('express');
const router = express.Router();
const userService = require('./employee.service');

router.post('/create', create);

router.post('/index', index);

router.post('/create-survey', createSurvey);

router.post('/survey-index', surveyIndex);
router.post('/create-assign-survey',createAssignSurvey)

router.post('/index-assign-survey',assignsurveyIndex)

router.post('/delete-assign-survey',deleteassignsurveyIndex)



module.exports = router;


async function deleteassignsurveyIndex(req,res){

    await userService.deleteassignsurveyIndex(req,res);
}

async function createAssignSurvey(req,res){

    await userService.createAssignSurvey(req,res);
}

async function assignsurveyIndex(req,res){

    await userService.assignsurveyIndex(req,res);
}

async function create(req,res){

    await userService.create(req,res);
}


async function index(req,res){

    await userService.index(req,res);
}

async function createSurvey(req,res){

    await userService.createSurvey(req,res);
}


async function surveyIndex(req,res){

    await userService.surveyIndex(req,res);
}