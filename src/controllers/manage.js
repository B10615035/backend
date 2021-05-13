import {
    Router
} from 'express'
import authService from '../services/auth'
import studentService from '../services/student'
import companyService from '../services/company'
import authMiddleware from '../utils/authMiddleware'
import logModel from '../models/log'
import {companyIndex, companyName} from '../utils/companyIndex'

const router = Router()
const student = new studentService()
const auth = new authService()
const company = new companyService()
const log = logModel

router.post('/login', async (req, res) => {
    const authManage = await auth.manageLogin(req.body)
    await log.create({identity:"manage",name:req.body.name, id: "",action:'login', updated_at:Date.now()})
    res.status(authManage.status).send({
        info: authManage.info
    })
})

router.get('/schedule/test', async (req, res) => {
    const getCompany = (await company.findAll()).info
    const getStudent = (await student.findAll()).info

    var studentInCompany = []

    for (let stu in getStudent) {
        var temp = {
            name: getStudent[stu].name,
            company: []
        }
        for (let i in getStudent[stu].company) {
            for (let com in getCompany) {
                if (getStudent[stu].company[i] == getCompany[com].name && !getCompany[com].students.includes(getStudent[stu].name)) {
                    temp.company.push(getCompany[com].name)
                }
            }
        }
        studentInCompany.push(temp)
    }

    var companyInStudent = []

    for(let com in getCompany){
        var temp = {
            name: getCompany[com].name,
            student: []
        }

        for(let i in getCompany[com].students){
            for(let stu in getStudent){
                if(getCompany[com].students[i] == getStudent[stu].name && !getStudent[stu].company.includes(getCompany[com].name))
                    temp.student.push(getStudent[stu].name)
            }
        }
        companyInStudent.push(temp)
    }

    var companyBeChosen = new Map

    companyBeChosen["中華電信"] = []
    companyBeChosen["台達電子"] = []
    companyBeChosen["邑富"] = []
    companyBeChosen["利凌企業"] = []
    companyBeChosen["英業達"] = []
    companyBeChosen["研揚IOT"] = []
    companyBeChosen["鈊象電子"] = []
    companyBeChosen["緯創資通"] = []
    companyBeChosen["研揚SDD1"] = []
    companyBeChosen["研揚SDD2"] = []

    for (let stu in getStudent) {
        for (let i in getStudent[stu].company) {
            companyBeChosen[getStudent[stu].company[i]].push(getStudent[stu].name)
        }
    }

    res.status(200).send({
        info: companyBeChosen
    })
})

router.get('/schedule/stage_one', async (req, res) => {
    const getCompany = (await company.findAll()).info
    const getStudent = (await student.findAll()).info

    var stageOne_schedule = new Map

    for (let i = 0; i < 10; i++){
        stageOne_schedule[companyName(i)] = []
        for (let j = 0; j < 24; j++)
            stageOne_schedule[companyName(i)].push("")
    }       

    var studentInCompany = []
    var companyWeight = new Map

    companyWeight["中華電信"] = 10
    companyWeight["台達電子"] = 16
    companyWeight["邑富"] = 10
    companyWeight["利凌企業"] = 29
    companyWeight["英業達"] = 18
    companyWeight["研揚IOT"] = 15
    companyWeight["鈊象電子"] = 13
    companyWeight["緯創資通"] = 19
    companyWeight["研揚SDD1"] = 14
    companyWeight["研揚SDD2"] = 14
    
    // for(let stu in getStudent){
    //     var temp = {name: getStudent[stu].name, company: []}
    //     var sch_index = []
    //     for(let i in getStudent[stu].company){
    //         for (let com in getCompany) {
    //             if (getStudent[stu].company[i] == getCompany[com].name && getCompany[com].students.includes(getStudent[stu].name)) {
    //                 temp.company.push(getCompany[com].name)
    //                 for (let j = 0; j < 8; j++) {
    //                     if(!sch_index.includes(j) && stageOne_schedule[getCompany[com].name][j].length < 3){
    //                         stageOne_schedule[getCompany[com].name][j].push(getStudent[stu].name)
    //                         sch_index.push(j)
    //                         break
    //                     }
    //                 }
    //             }
    //         }
    //     }
        
    //     studentInCompany.push(temp)
    //     await student.update({name: temp.name}, {stage_one: temp.company, stage_one_index: sch_index})
    //     for(let i = 0; i < 8; i++){
    //         await company.update({id: i}, {stage_one: stageOne_schedule[companyName(i)]})
    //     }
    // }

    for (let stu in getStudent) {
        var temp = {
            name: getStudent[stu].name,
            company: []
        }
        for (let i in getStudent[stu].company) {
            for (let com in getCompany) {
                if (getStudent[stu].company[i] == getCompany[com].name && getCompany[com].students.includes(getStudent[stu].name)) {
                    temp.company.push(getCompany[com].name)
                }
            }
        }
        studentInCompany.push(temp)
    }

    // studentInCompany = studentInCompany.sort((a, b) => {
    //     if (a.company.length > b.company.length)
    //         return -1
    //     else
    //         return 0
    // })

    for (let stu in studentInCompany) {
        var sch_index = []

        // studentInCompany[stu].company = studentInCompany[stu].company.sort((a, b) => {
        //     if (companyWeight[a] < companyWeight[b])
        //         return -1
        //     else
        //         return 0
        // })

        for (let com in studentInCompany[stu].company) {
            var start = 0;
            var end = 24;

            if (studentInCompany[stu].company[com] == "研揚SDD1")
                end = 12
            if (studentInCompany[stu].company[com] == "研揚SDD2")
                start = 12

            for (let j = start; j < end; j++) {
                if (!sch_index.includes(j) && stageOne_schedule[studentInCompany[stu].company[com]][j] == "") {
                    stageOne_schedule[studentInCompany[stu].company[com]][j] = studentInCompany[stu].name
                    sch_index.push(j)

                    if (studentInCompany[stu].company[com] == "中華電信") {
                        stageOne_schedule[studentInCompany[stu].company[com]][j + 1] = studentInCompany[stu].name
                        sch_index.push(j + 1)
                    }
                    break
                }
            }
        }

        await student.update({name: studentInCompany[stu].name}, {stage_one: studentInCompany[stu].company, stage_one_index: sch_index})
        for(let i = 0; i < 10; i++){
            await company.update({id: i}, {stage_one: stageOne_schedule[companyName(i)]})
        }
    }

    res.status(200).send({
        info: stageOne_schedule
    })
})



router.post("/student/", authMiddleware, async (req, res) => {
    const createUser = await student.create(req.body)
    await log.create({identity:"manage", name:'admin', id: "",action:'create student', content:req.body.id, updated_at:Date.now()})
    res.status(createUser.status).send({
        info: createUser.info
    })
})

router.get("/student", authMiddleware, async (req, res) => {
    const createUser = await student.findAll()
    await log.create({identity:"manage", name:'admin', id: "",action:'get student', updated_at:Date.now()})
    res.status(createUser.status).send(createUser.info)
})

router.delete("/student/:id", authMiddleware, async (req, res) => {
    const deleteUser = await student.delete(req.params)
    await log.create({identity:"manage", name:'admin', id: "",action:'delete student', content:req.params.id, updated_at:Date.now()})
    res.status(deleteUser.status).send({
        info: deleteUser.info
    })
})

router.post("/company", authMiddleware, async (req, res) => {
    const createCompany = await company.create(req.body)
    await log.create({identity:"manage", name:'admin', id: "",action:'create company', content:req.body.name, updated_at:Date.now()})
    res.status(createCompany.status).send({
        info: createCompany.info
    })
})

router.get("/company", authMiddleware, async (req, res) => {
    const getCompany = await company.findAll()
    await log.create({identity:"manage", name:'admin', id: "",action:'get company', updated_at:Date.now()})
    res.status(getCompany.status).send(getCompany.info)
})

router.put("/company/:id", authMiddleware, async (req, res) => {
    const updateStudent = await company.update(req.params, req.body)
    await log.create({identity:"manage", name:'admin', id: "",action:'update company', content:[req.params.id, req.body], updated_at:Date.now()})
    res.status(updateStudent.status).send({
        info: updateStudent.info
    })
})

router.get("/log", authMiddleware, async (req, res) => {
    const logData = await log.find()
    res.status(200).send(logData)
})

export default router