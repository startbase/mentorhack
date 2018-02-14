const request = require('request');

class Emo {

    createUrl(image) {
        let ip = '172.01.102.3:3021/';
        return 'http://' + ip + image;
    }

    go(image, num, callback) {
        let image_url = this.createUrl(image);
        const options = {
//    url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
            url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': '345657567'
            },
            body: JSON.stringify({
                url: image_url
            })
        }

        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let object = JSON.parse(body);
                callback(num, object);
            }
            console.log(error, response.body);
        });

    }
}

module.exports = new Emo();