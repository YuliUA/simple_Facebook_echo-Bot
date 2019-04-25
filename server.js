const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

// const port= 5000;
const app = express();

app.set('port', (process.env.PORT || 5000))
const PORT = app.get('port')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello I'm your bot :)")
})
let token = "EAAFm081BAv0BABEpsFi53ZCA09UZCvatZAYgSzIBlZAriW31D74WPNZAoxwiSuplU9FC436jKTkzAZBGg2QCMit1TqbrHM8Fmfrg7K5fTpq8MMELcTmlnzY57cuZASTzbg6f0b44g1PdhPzpVrJ7zZCfgZCZC0or2tpUZA0T1r0IInOCYUvqP6nno8ZA"

//facebook

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testChatBot') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error: wrong token');
})

app.post('/webhook', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text;
            if (text.includes(' joke')) {
                sendJoke()
            } else {

                sendText(sender, `Text echo: ${text.substring(0, 100)}`)
            }
        }
    }
    res.sendStatus(200)
})

function sendJoke() {
    request('http://api.icndb.com/jokes/random/', function (err, response, body) {
        if (err) {
            console.log(err)
        }

        console.log(response)

    })
}

function sendText(sender, text) {
    let messageData = { text: text }
    request({
        url: "https://graph.facebook.com/v3.2/me/messages",
        qs: { access_token: token },
        method: "POST",
        json: {
            recipient: { id: sender },
            message: messageData
        }
    }, function (err, response, body) {
        if (err) {
            console.log(`sending error: ${err}`)
        } else if (response.body.error) {
            console.log('response body error')
        }
    })
}

app.listen(PORT, function () {
    console.log(`Hello from port ${PORT}`)
})