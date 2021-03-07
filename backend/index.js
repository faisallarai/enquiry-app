require('dotenv').config()
const express = require('express')
const cors = require('cors')

const Contact = require('./models/contact')

const app = express()
app.use(cors())
app.use(express.json())


// if(process.env.NODE_ENV === 'development') {
//     sequelize.sync({force: true}).then(() => {
//         console.log('Drop and re-sync db')
//     })    
// }

const port = process.env.PORT

console.log('port', port)

app.post('/api/contacts', (req, res) => {
    Contact.create({...req.body})
    .then(contact => {
        res.json({
            success: true,
            data: contact,
            message: 'Saved succesfully'
        })
    })
    .catch(validation => {
        console.log('validation internal', validation.errors)
        validation.errors.map(error => {
            res.status(422).json({
                success: false,
                message: error.message,
                attribute: error.path
            })
        })

    })
})

app.post('/api/send', (req, res) => {

    try {
        console.log('body', req.body)

        Contact.create({...req.body})
        .then(contact => {
            if(contact){
                res.json({
                    success: true,
                    data: contact,
                    message: 'Thank you for contacting us'
                })
            } else {
                res.status(422).json({
                    success: false,
                    data: {},
                    message: 'Could not create contact'
                })
            }
        })
        .catch(validation => {
            res.status(422).json({
                errors: validation.errors.map(error => {
                    return {
                        success: false,
                        message: error.message,
                        attribute: error.path
                    }
                })
            })    
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong'
        })
    }
    
})

const errorHandler = (error, req, res, next) => {
    console.log('error', error)
    res.status(422).json({
        message: error
    })
}

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})