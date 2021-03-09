const {
    listAllChannels,
    createNewChannel,
    showChannel,
    updateChannel,
    deleteChannel,
} = require('../models/channel_model');

exports.index = async (req, res) => {
    const channels = await listAllChannels();

    return res.status(200).json(channels);
};

exports.create = (req, res) => {
    const body = req.body;

    //Blindage du body
    //Seul le nom est modifiable

    //On pourrait faire un blindage sur le nom unique si c'est une spec qu'on veut (complex car faut revoir nos clés lors de la création...)

    if(body) {
        if(! body.name) {
            return res.status(400).json({message: 'Le nom est obligatoire.'});
        }
    } else {
        return res.status(400).json({message: 'bad_request'});
    }

    return createNewChannel(body)
        .then(channel =>  res.status(201).json(channel))
        .catch(({err}) => res.status(500).json({message: err}));
};

exports.show = (req, res) => {
    const channelId = req.params.channelId;

    return showChannel(channelId)
        .then(channel => res.status(200).json(channel))
        .catch(({code, err}) => {
            if(code === 404) {
                return res.status(404).json({message: 'resource_not_found'})
            }

            return res.status(500).json({message: err});
        });
};

exports.update = (req, res) => {
    const channelId = req.params.channelId;
    const body = req.body;

    //Blindage du body
    //Seul le nom est modifiable

    //On pourrait faire un blindage sur le nom unique si c'est une spec qu'on veut (complex car faut revoir nos clés lors de la création...)

    if(body) {
        if(! body.name) {
            return res.status(400).json({message: 'Le nom est obligatoire.'});
        }
    } else {
        return res.status(400).json({message: 'bad_request'});
    }

    //Si pas d'erreur au niveau de la requete, on peut procéder à la modification

    return updateChannel(channelId, body)
        .then(channel => res.status(200).json(channel))
        .catch(({code, err}) => {
            if(code === 404) {
                return res.status(404).json({message: 'resource_not_found'})
            }

            return res.status(500).json({message: err});
        });
};

exports.delete = (req, res) => {
    const channelId = req.params.channelId;

    return deleteChannel(channelId)
        .then(channel => res.status(204).json(channel))
        .catch(({code, err}) => {
            if(code === 404) {
                return res.status(404).json({message: 'resource_not_found'})
            }

            return res.status(500).json({message: err});
        });
};
