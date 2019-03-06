const noteSvc = require('./api/v1/notes/notes.service');

const socketApp = (io) => {
  io.on('connection', (socket) => {
    console.log('a user has connected');

    socket.on('shareNote', (data) => {

      //Call post req '/share'
      try {
        noteSvc.shareNotes(data.noteId, data.userId)
          .then((response) => {
            if (response && response.status === '201') {
              socket.emit('message', `Note is shared - ${response.message}`);
              
              socket.broadcast.emit('message', 'Shared note recieved');
              socket.broadcast.emit('getNote', data.userId); //share to everyone except the emitter
              
            } else {
              socket.emit('message', `Note is not shared - ${response.message}`);
            }

          }).catch((error) => {
            socket.emit('message', `Note is not shared - ${error.message}`);
          })
      } catch (error) {
        socket.emit('message', `Note is not shared - ${error.message}`);
      }

    });

  });
};

module.exports = socketApp;