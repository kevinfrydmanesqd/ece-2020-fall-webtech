const {v4: uuid} = require('uuid');
const db = require('../../db_config');
const {getUTCFromNow} = require('../services/utils')

const listAllMessages = async (channelId) => {
    return new Promise((resolve, reject) => {
        const messages = [];

        const options = {
            gt: `channels:${channelId}:messages:`,
            lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        };

        //https://github.com/Level/level#createReadStream
        db.createReadStream(options)
            .on('data', ({key, value}) => {
                messages.push(JSON.parse(value));
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', () => {
                resolve(messages);
            });
    });
};

const createNewMessage = ({content, channel_id}) => {
    const message = {
        id: uuid(),
        content,
        created_at: getUTCFromNow(), //On stock des dates UTC coté serveur !
    };

    //Ici plusieurs conceptions possibles
    //Il faut qu'on respecte 2 aspects :
        //Nous sommes en key value
        //Nous devons pouvoir retourner la liste des messages d'un channel
        //Nous devons pouvoir accéder à la resource message tel qu'elle

    // -> On va créer plusieurs clés en base
    //Une de type channels:channelId:messages:messageId qui nous permettra d'avoir accès à notre liste
    //Une de type messages:messageId nous permettant d'avoir un object de liaison et de pouvoir le retrouver pour réaliser les opérations de Read/Update/Delete

    // !! Attention, plusieurs conceptions/approches sont possibles !

    const promiseBasicKey = new Promise((resolve, reject) => {
        // on insère en base de données
        const obj = {
            id: message.id,
            channel_id
        };

        db.put(`messages:${message.id}`, JSON.stringify(obj), (err) => {
            if(err) {
                reject({code: 500, err});

                //Le reject de la promesse ne termine pas l'opération
                return;
            }

            resolve(obj);
        });
    });

    const promiseRelationshipKey = new Promise((resolve, reject) => {
        // on insère en base de données
        db.put(`channels:${channel_id.id}:messages:${message.id}`, JSON.stringify(message), (err) => {
            if(err) {
                reject({code: 500, err});

                //Le reject de la promesse ne termine pas l'opération
                return;
            }

            resolve(message);
        });
    });

    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    return Promise.all([promiseRelationshipKey, promiseBasicKey])
        .then(results => results[0])
        .catch(err => console.error(err));
};

const updateMessage = (messageId, body) => {
    return new Promise((resolve, reject) => {
        db.get(`messages:${messageId}`, (err, value) => {
            if(err) {
                //https://github.com/Level/level#get
                //Niveau code, on peut mieux faire ;)
                if(err.notFound) {
                    reject({code: 404})
                } else {
                    reject({code: 500, err});
                }

                //Le reject de la promesse ne termine pas l'opération
                return;
            }

            const mappingMessage = JSON.parse(value);

            db.get(`channels:${mappingMessage.channel_id}:messages:${messageId}`, (err, value) => {
                if(err) {
                    //https://github.com/Level/level#get
                    //Niveau code, on peut mieux faire ;)
                    if(err.notFound) {
                        reject({code: 404})
                    } else {
                        reject({code: 500, err});
                    }

                    //Le reject de la promesse ne termine pas l'opération
                    return;
                }

                let message = JSON.parse(value);
                message.content = body.content;

                db.put(`channels:${mappingMessage.channel_id}:messages:${messageId}`, JSON.stringify(message), (err) => {
                    if(err) {
                        reject({code: 500, err});

                        //Le reject de la promesse ne termine pas l'opération
                        return;
                    }

                    resolve(message);
                })
            });
        });
    });
};

const deleteMessage = async messageId => {
    return new Promise((resolve, reject) => {
        db.get(`messages:${messageId}`, (err, value) => {
            if(err) {
                //https://github.com/Level/level#get
                //Niveau code, on peut mieux faire ;)
                if(err.notFound) {
                    reject({code: 404})
                } else {
                    reject({code: 500, err});
                }

                //Le reject de la promesse ne termine pas l'opération
                return;
            }

            const mappingMessage = JSON.parse(value);

            //On supprime de la db
            db.del(`channels:${mappingMessage.channel_id}:messages:${mappingMessage.id}`, (err) => {
                if(err) {
                    // handle I/O or other error
                    reject({code: 500, err});

                    return;
                }

                db.del(`messages:${mappingMessage.id}`, (err) => {
                    if(err) {
                        // handle I/O or other error
                        reject({code: 500, err});

                        return;
                    }
                });

                resolve();
            });
        });
    });
};

module.exports = {
    listAllMessages,
    createNewMessage,
    updateMessage,
    deleteMessage,
};
