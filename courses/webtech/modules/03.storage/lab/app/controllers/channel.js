const {
    listAllChannels,
    createNewChannel,
    showChannel,
    updateChannel,
    deleteChannel,
} = require('../models/channel');

exports.index = async (req, res) => {
    const channels = await listAllChannels();

    return res.status(200).json(channels);
};

exports.create = async (req, res) => {
    const {body} = req; //on destructure req pour récuperer le body

    const channel = await createNewChannel(body);

    if(! channel) {
        return res.status(400).json({
            name: 'Name is required.'
        });
    }

    return res.status(201).json(channel); //Code 201 pour une création : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
};

exports.show = async (req, res) => {
    const channelId = req.params.channelId;

    const channel = await showChannel(channelId);

    return res.status(200).json(channel); //je n'ai pas blindé volontairement channel, à vous de le faire ;)
};

exports.update = async (req, res) => {
    //TODO update channel
    //Poser l'algo par écrit avant (ACD)
};

exports.delete = async (req, res) => {
    //TODO delete channel
};
