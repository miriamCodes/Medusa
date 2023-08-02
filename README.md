Hello you, 

What you'll find is the backend and frontend code for a chat app. If you should decide to work on it, make sure to run npm install before you look in the code. 

The main functionalities you'll find are the following:

- create a new chatroom --> the chatroom you created is added to the chatroom overview on top of the page, a little chat-window will pop up and you can chat with other people in the same chat
- enter an existing chatroom --> click on one of the chatroom names appearing on top of the page and a little chat-window will pop up
- leave chatrooms --> click on the x-button on top right of the chat-window --> the chat is deleted. If you were the only one in the chat, it will get deleted from the chatlist. also, if you should be the only one in a chatroom and close your page, the chatroom will be deleted

What is nice to know on code side:
- there are two storages of room and user data, one in the backend and one in the frontend
    - backend: the db holds every room, its users by name and by number
    - frontend: there is a storage object, that holds the user and all the rooms they're in
- there is one storage of all messages one user has sent and received in the frontend
- there are two contexts at the moment:
      - chatcontext: manages everything with rooms
      - messagecontext: manages everything with messaging
      - there is still a lot of functionality stuff happening in the messaging component (mouseevents, dragging of the windows...) - i did not manage to put it in a context, yet, but I think that would make very much sense. )

What would be a nice feature:
    - I think it would be nice, if a user creates a chatroom and is the first one in this chatroom, the user gets suggestions for similarly named chatrooms, that are already populated by at least one other user. 
    - I think it would be nice to open chats with speficic users, that you get to know in a chat. My idea was, that a user could click on another user, is then asked, whether he or she would want to create a new chat with this person. If yes, an input appears, where the name of the new chatroom can be defined. --> The new chatroom can either be created as a subthread of the current chat or a completely new chat. Either way it will appear in the flowing chatrooms on top of the page. If it's a subthread-chatroom, there has to be some kind of visual remark, showing that. (Maybe give the opportunity to make private chats, either?) 
    - I also think it could be a nice feature, to pass around links of chatrooms that enable entering that room on click. 
    - Plus, I actually thought it would be nice to keep it anonymous and with random usernames. I also did not think of authentication as a feature, since I think that kind of overrides the concept of easiness. 
    
Everything else: don't hesitate to ask me :)

All the best,
Lena
