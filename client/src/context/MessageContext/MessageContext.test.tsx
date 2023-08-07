import { render, act } from '@testing-library/react';
import { MessageProvider, MessageContext } from './MessageContext';
import { ChatContext } from '../ChatContext/ChatContext';
import { ChatContextValues } from '../ChatContext/ChatContextTypes';
import React, { ReactNode } from "react";
import { Socket } from 'socket.io-client';

jest.mock('../ChatContext/ChatContext');


const mockSocket: Socket = Object.create(Socket.prototype);

mockSocket.on = jest.fn();
mockSocket.emit = jest.fn();
mockSocket.off = jest.fn();

let mockRoom = "";

const mockSetRoom = (room: string) => {
    mockRoom = room;
};

const mockChatContext: ChatContextValues = {
    socket: mockSocket,
    setRoom: mockSetRoom,
    room: mockRoom,
    chatrooms: [],
    setChatrooms: jest.fn(),
    userCount: 0,
    setUserCount: jest.fn(),
   
};

describe('MessageProvider', () => {
    const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
        <ChatContext.Provider value={mockChatContext}>{children}</ChatContext.Provider>
    );

    it('should set the correct initial state', () => {
        let contextValues: any;
        render(
            <Wrapper>
                <MessageProvider>
                    <MessageContext.Consumer>
                        {(context) => {
                            contextValues = context;
                            return null;
                        }}
                    </MessageContext.Consumer>
                </MessageProvider>
            </Wrapper>
        );
        expect(contextValues.message).toBe('');
        expect(contextValues.messageList).toEqual([]);
    });

    it('should update the message when setMessage is called', () => {
        let contextValues: any;
        render(
            <Wrapper>
                <MessageProvider>
                    <MessageContext.Consumer>
                        {(context) => {
                            contextValues = context;
                            return null;
                        }}
                    </MessageContext.Consumer>
                </MessageProvider>
            </Wrapper>
        );

        act(() => contextValues.setMessage('test message'));
        expect(contextValues.message).toBe('test message');
    });
});