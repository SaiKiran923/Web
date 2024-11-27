const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

server.get('/do_a_random', (req, res) => {
  res.send(`Your magical scroll reveals: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib route handler with styled response
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { adjective1, noun1, verb1, adverb1, noun2 } = req.body;
    
    // Check if all fields are filled
    if (!adjective1 || !noun1 || !verb1 || !adverb1 || !noun2) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Magical Quest Error</title>
                <style>
                    body {
                        font-family: 'Cinzel', serif;
                        background-color: #2c3e50;
                        color: #ecf0f1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1518562923432-22ad19e93f9b');
                        background-size: cover;
                        background-position: center;
                    }
                    .error-container {
                        background-color: rgba(44, 62, 80, 0.9);
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        padding: 2rem;
                        text-align: center;
                        max-width: 500px;
                    }
                    h1 { color: #e74c3c; }
                    a {
                        display: inline-block;
                        background-color: #e74c3c;
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        margin-top: 1rem;
                        transition: background-color 0.3s ease;
                    }
                    a:hover {
                        background-color: #c0392b;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>🔮 Quest Interrupted!</h1>
                    <p>Fill all magical fields to complete your legendary tale!</p>
                    <a href="/ITC505/lab-7/index.html">Return to the Magical Realm</a>
                </div>
            </body>
            </html>
        `);
        return;
    }
    
    // Create the styled mad lib story response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Your Enchanted Tale</title>
            <style>
                body {
                    font-family: 'Cinzel', serif;
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1518562923432-22ad19e93f9b');
                    background-size: cover;
                    background-position: center;
                }
                .story-container {
                    background-color: rgba(44, 62, 80, 0.9);
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    padding: 2rem;
                    max-width: 600px;
                    text-align: center;
                }
                h1 {
                    color: #f39c12;
                    margin-bottom: 1rem;
                }
                .story-text {
                    line-height: 1.6;
                    color: #bdc3c7;
                }
                .highlighted {
                    color: #e74c3c;
                    font-weight: bold;
                }
                .action-link {
                    display: inline-block;
                    background-color: #e74c3c;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    margin-top: 1rem;
                    transition: background-color 0.3s ease;
                }
                .action-link:hover {
                    background-color: #c0392b;
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>🏰 A Legendary Quest Unfolds</h1>
                <div class="story-text">
                    <p>
                        In the mystical realm beyond mortal understanding, a 
                        <span class="highlighted">${adjective1}</span> 
                        <span class="highlighted">${noun1}</span> 
                        courageously <span class="highlighted">${verb1}</span> 
                        <span class="highlighted">${adverb1}</span>. 
                        Clutching ancient <span class="highlighted">${noun2}</span>, 
                        they embarked on a quest that would forever change the destiny of the enchanted kingdoms!
                    </p>
                </div>
                <a href="/ITC505/lab-7/index.html" class="action-link">Begin Another Magical Journey 🧙‍♂️</a>
            </div>
        </body>
        </html>
    `);
});

const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

let port = 80
if (process.argv[2] === 'local') {
    port = 8080
}

server.listen(port, () => console.log('Magical Realm Server Ready!'))