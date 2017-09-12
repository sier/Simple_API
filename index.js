const express = require('express')
const soap = require('soap')
const bodyParser = require('body-parser')

const STUDENT_SERVICE_URL = 'http://111.222.333.444/UserServiceApplication/UserService.svc?wsdl'
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

function getClient() {
    return new Promise((resolve, reject) => {
        soap.createClient(STUDENT_SERVICE_URL, (err, client) => {
            if(err) return reject(err)
            resolve(client)
        })
    })
}

app.get('/api/student', async (req, res) => {
    let socsecnum = req.query.socsecnum
    try {
        let client = await getClient()
        client.GetUserBySocSecNum({socSecNum: socsecnum}, function(err, result){
            if(err) return res.status(404).json(err)
            res.status(200).json(result)
        })
    }catch(e) {
        res.status(404).json(e)
    }
})

app.listen(8080)
