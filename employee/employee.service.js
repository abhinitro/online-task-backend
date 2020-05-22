const config = require('config.json');
const db = require('_helpers/db');
const io = require('server');
const mongoose=require('mongoose');

const Employee=db.Employee;
const Survey=db.Survey;

const AssignSurvey=db.AssignSurvey;


module.exports={
    create,
    index,
    createSurvey,
    surveyIndex,
    createAssignSurvey,
    assignsurveyIndex

}


async function assignsurveyIndex(req,res){

    let data=[];

    if(req.body.hasOwnProperty('search')){
         data = await AssignSurvey.aggregate([
              {
              
              $lookup:
                {
                  from: "surveys",
                  localField: "survey_id",
                  foreignField: "_id",
                  as: "user_details"
                }
           },
           { $unwind: '$user_details'},
           {$match:{$and:[{"user_details.title":{ $regex: req.body.search, $options: 'i' }},{employee_id:mongoose.Types.ObjectId(req.body.employee_id)}]}},
         ]);
        
    }else{

        data = await AssignSurvey.aggregate([

            {$match:{employee_id:mongoose.Types.ObjectId(req.body.employee_id)}},

            {
            $lookup:
              {
                from: "surveys",
                localField: "survey_id",
                foreignField: "_id",
                as: "user_details"
              }
         },
         { $unwind: '$user_details'},
         
       ]);
    }

    res.status(200).json( {
        status: 200,
        data: data
    }); 

}



async function createAssignSurvey(req,res){
    let data=await AssignSurvey.findOne({$and:[{employee_id:mongoose.Types.ObjectId(req.body.employee_id)},{survey_id:mongoose.Types.ObjectId(req.body.survey_id)}]})

      if(data==null){

        data=new AssignSurvey(req.body);
        data=await data.save();


      }

      res.status(200).json( {
        status: 200,
        data: data
    }); 
}


async function createSurvey(req,res){

    let survey=await Survey.findOne({title:req.body.title});

    if(survey==null){
        survey=new Survey(req.body);
        survey=await survey.save();
     }

    res.status(200).json( {
        status: 200,
        data: survey
    }); 
}

async function index(req,res){

    let data=await Employee.find({});

    res.status(200).json( {
        status: 200,
        data: data
    }); 

}


async function surveyIndex(req,res){

    let data=[];

    if(req.body.hasOwnProperty('search')){
         data = await Survey.find({
            $and: [{
                title: { $regex: req.body.search, $options: 'i' },
            }  ]
        });
        
    }else{

        data=await Survey.find({});

    }

    res.status(200).json( {
        status: 200,
        data: data
    }); 

}


async function create(req,res){

    let employee=await Employee.findOne({title:req.body.title});

    if(employee){

        res.status(200).json( {
            status: 200,
            data: employee
        }); 
    }else{

        employee=new Employee(req.body);

        employee=await employee.save();

        res.status(200).json( {
            status: 200,
            data: employee
        }); 
    }
}


