let users = [];

export const newConnectionHandler = (client) => {
  client.emit("welcome", `Hello ${client.id}`);

  client.on("sendUsername", (payload) => {
    users.push({ username: payload.username, id: client.id });
   

    client.emit("join", users);

  client.broadcast.emit("newConnection", users)
  });

  client.on("sendMessage", message => {
   
    client.broadcast.emit("newMessage", message)
  })

  client.on("disconnect", ()=> {
    users = users.filter( user => user.id !== client.id)
    client.broadcast.emit("newConnection", users)
  })

  
};
