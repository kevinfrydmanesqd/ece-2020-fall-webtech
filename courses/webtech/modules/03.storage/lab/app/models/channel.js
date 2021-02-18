const {v4: uuid} = require('uuid');
const db = require('../../db_config');

const listAllChannels = async () => {
    return new Promise((resolve, reject) => {
        const channels = [];

        const options = {
            gt: 'channels:',
            lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        };

        //https://github.com/Level/level#createReadStream
        db.createReadStream(options)
            .on('data', ({key, value}) => {
                channels.push(JSON.parse(value));
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', () => {
                resolve(channels);
            });
    })

};

const createNewChannel = body => {
    if(!body.name) {
        return null //ne pas oublier les blindages !
    }

    //on créé un objet channel
    const channel = {
        id: uuid(),
        name: body.name,
    };

    return new Promise(((resolve, reject) => {
        //https://github.com/Level/level#put
        // on insère en base de données
        db.put(`channels:${channel.id}`, JSON.stringify(channel), (err) => {
            if(err) {
                //TODO blindage erreur
                reject(err);
            }

            resolve(channel);//On a "jsonifié" notre channel lorsque on l'a créé ligne 24. Il faut faire l'opération inverse
        })
    }));
};

const showChannel = channelId => {
    //on a un code asynchrone, on va donc utiliser les promesses pour nous simplifier la vie...
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
    return new Promise(((resolve, reject) => {
        db.get(`channels:${channelId}`, (err, value) => {
            if(err) {
                //TODO blindage erreur
                reject(err);
            }

            resolve(JSON.parse(value));//On a "jsonifié" notre channel lorsque on l'a créé ligne 24. Il faut faire l'opération inverse
        });
    }));
};

const updateChannel = async (channelId, body) => {

};

const deleteChannel = async channelId => {

};

module.exports = {
    listAllChannels,
    createNewChannel,
    showChannel,
    updateChannel,
    deleteChannel,
};
