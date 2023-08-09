import React, { useEffect } from "react";
import firebase from "../firebaseClient";

const FirebaseFetch: React.FC = () => {
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('User is authenticated:', user.uid);

                user.getIdToken(true)
                    .then(idToken => {
                        console.log('Got Firebase ID token', idToken);

                        return fetch("http://localhost:3001/chatrooms", {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${idToken}`,
                                'Content-Type': 'application/json'
                            }
                        });
                    })
                    .then(response => {
                        
                        return response.json();
                    })
                    .catch(error => {
                        console.error('Error in FirebaseFetch:', error);
                    });
            } else {
                console.log('User is not authenticated');
            }
        });

        return () => unsubscribe();
    }, []);

    return null;
};

export default FirebaseFetch;