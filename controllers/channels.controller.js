const {pool} = require('../database');
const channelController = {};

// Get all channels with method get
channelController.getChannels = async(req,res)=>{
    const channel = await pool.query('SELECT * FROM channels');
    if (channel.rows.length>0){
        activechannel = [];
        channel.rows.forEach((value) => {
            if (value.status == true){
                activechannel.push(value);
            }
        });
        res.json(activechannel)
      }else{
        res.json({Message: 'No channels found'})
      }

}

// Get all channels with method get
channelController.getChannel = async(req,res)=>{
    const id = req.params.id;
    const channel = await pool.query('SELECT * FROM channels WHERE channel_id = $1',[id]);

    console.log(channel);
      if (channel.rows.length == 0 || channel.rows[0].status == false ){
          res.json({
              code : 404,
              Message: "Channel not found"
          });
      }else{
          res.json(channel.rows);
      }

}


// Create one chanell with method post
channelController.postChannel = async(req,res)=>{
    const newChannel = {user_id,name,description} = req.body;

    const addChannel = await pool.query('INSERT INTO channels (user_id,name,description,postquantity,suscribers,status) VALUES ($1,$2,$3,$4,$5,$6)',[newChannel.user_id,newChannel.name,newChannel.description,0,0,true]);
    res.json({
        Message: 'Channel add successfully ',
        code: 200,
        data: newChannel
    })

}

// Update one chanell with method put
channelController.putChannel = async (req, res) =>{
    const id = req.params.id;
    const  {name,description} = req.body;
    const response = await pool.query('UPDATE channels SET name = $1, description = $2 WHERE channel_id = $3', [name,description,id]);
    console.log(response);
    res.json({
        Message: 'Channel updated successfully ',
        code: 200,
        ChannelUpdated : {
            name: name,
            description: description
        }
    })

}

// Delete one channel with method put
channelController.deleteChannel = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('UPDATE channels SET status = $1 WHERE channel_id = $2', [false, id ]);
    console.log(response);
    res.json({
          Message: 'Channel deleted successfully ',
        code: 200,
        ChannelId : id
    })

}

module.exports = channelController;