import React from 'react';
import { render, act } from '@testing-library/react';
import { ChatProvider, ChatContext } from './ChatContext';

describe('ChatContext', () => {
    it('should set the correct initial state', (): void => {
        let contextValues: any;
        render(
            <ChatProvider>
                <ChatContext.Consumer>
                    {(context): null => {
                        contextValues = context;
                        return null;
                    }}
                </ChatContext.Consumer>
            </ChatProvider>
        );

        expect(contextValues.room).toBe('');
        expect(contextValues.chatrooms).toEqual([]);
    });

    it('should update the rooom when setRoom is called', (): void => {
        let contextValues: any;
        render(
            <ChatProvider>
                <ChatContext.Consumer>
                    {(context): null => {
                        contextValues = context;
                        return null;
                    }}
                </ChatContext.Consumer>
            </ChatProvider>
        );

        act(() =>
            contextValues.setRoom('test room'));
    

        expect(contextValues.room).toBe('test room');
    });

});