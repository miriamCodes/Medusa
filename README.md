Hello from your legacy-partners Adam and Miriam,

We were happy to continue the work on the great chat app that medusa is, and wanted to document our changes. This document summarizes our alterations, including the conversion to TypeScript, reorganization of the folder structure, comprehensive test planning, and the addition of new features like Husky, Accessibility, and Authentication.

Table of Contents:
-Folder Structure
-TypeScript
-Test Coverage
-Feature: Husky
-Feature: Accessibility
-Feature: Authentication

--- FOLDER STRUCTURE:
First, the following is how we would describe the setup including our changes in the folder structure:

/client
- `index.js`: Entry point for the frontend (client) of the application.
- `App.js`: Main component of the frontend.
- `ChatList.js`: Renders a list of chat messages for a specific room.
- `Messaging.js`: Handles messaging functionality and user interactions for a chat room.
- `RoomList.js`: Renders a list of available chat rooms and allows the user to join a room.
- `RoomSelector.js`: Provides a user interface for selecting a chat room.
- `context/ChatContext/ChatContext.js`: Provides context related to chat functionality like room management and user interactions.
- `context/MessageContext/MessageContext.js`: Provides context related to messaging functionality and handling chat messages.

**new**
- `context/ChatContext/ChatContextTypes.ts`: Contains the interface for `ChatContext` values.
- `context/MessageContext/MessageContextTypes.ts`: Contains the interface for `MessageContext` values.
- `Chat.css`, `Messaging.css`, `RoomList.css`, `RoomSelector.css`: Each contain their respective css rules and are now seperated from the bases `index.css` and `App.css`.

/server
- `index.ts`: Entry point for the backend (server) of the application.

**new**
- `db.ts`: Contains logic to connect to the MongoDB instance.
- `middlewares/index.ts`: Contains an array of middleware functions used in the application.
- `models/chatroom.ts`: Defines the schema for chatrooms within the application, specifying the properties and their types.
- `routes/index.ts`: Main entry point for defining and combining different route modules
- `routes/chatroom.ts`: Specifies the routing related to chatroom management.
- `chatroomController.ts`: Handles the creation and retrieval of chatrooms.
- `socketHandlers/index.ts`: Manages real-time communication in the chat application.

---TYPESCRIPT:
As part of our continuous effort to improve code quality, maintainability, and scalability, the entire codebase has been refactored from JavaScript to TypeScript.

--- TEST COVERAGE:
In alignment with our commitment to maintaining the robustness and reliability of the application, we have strategically planned test coverage to cover essential use cases. Acknowledging our time constraints, we prioritized and successfully implemented various HTTP endpoint tests. Unfortunately, this meant delaying the completion of certain websocket tests.

`tests/chatroom.test.ts`: HTTP endpoint tests
- Creating a new chatroom with valid data: We have tested the standard scenario in which the chatroom is created successfully.
- Storing the created chatroom in the database: This test confirms that newly created chatrooms are correctly saved within the database.
- Bad requests:  We have covered scenarios where the chatroom name is either missing or not a string.
- Retrieving all chatrooms: This test ensures that all chatrooms can be retrieved as expected.

`tests/socketHandlers.test.ts`: to be continued websocket testing:
- Pairing users into the same chatroom based on a common keyword: Further debugging is needed to finalize the tests verifying that users entering the same keyword are paired in the same chatroom.
- Handling cases where keywords don't match: Additional debugging is planned to ensure that users with differing keywords do not erroneously end up in the same chatroom.

`client/src/context/ChatContext.test.tsx`: We validated the correct initial state for messages, and the ability to update individual messages, ensuring that the message handling within the application functions as expected.
`client/src/context/MessageContext.test.tsx`: The tests confirm the proper initialization of chat room properties and the functionality of room updates, providing assurance that chat room management in the application operates correctly.

--- FEATURE: HUSKY
Husky has been configured in the project to automatically run Git hooks, ensuring that specific tasks such as linting and testing are executed before committing changes, thereby enhancing the code quality and consistency within the repository.

--- FEATURE: ACCESSIBILITY
The application is checked to adhere to best practices in accessibility.

--- FEATURE: AUTHENTICATION
We have leveraged Google's Firebase to execute anonymous user authentication. This process automatically assigns a unique User UID to each newcomer, which is retained within the Firebase Cloud SDK. At the present stage, this UID identifies users on the application level and not within individual chatrooms. It's important to note that while the UID persists across sessions, it remains transient. Over time, it will be automatically removed. Additionally, should there be a change in a user's IP address, a fresh UID will be generated. This approach amplifies the application's security by confirming a user's presence, while simultaneously preserving the core anonymous experience originally intended for the application.