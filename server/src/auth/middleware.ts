

import admin from "../firebaseAdmin";
import express from "express";

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            uid: string;
            [key: string]: unknown;
        };
    }
}

export const authenticateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("starting auth");


    if (!token) {
        console.log("Guest user");
        req.user = { uid: "guest" };
        next();
        return;
    }

    console.log("token provided");

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("token verified, user:", decodedToken.uid);

        req.user = decodedToken;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("Unauthorized");
    }
}