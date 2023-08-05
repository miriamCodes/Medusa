import { render, act } from '@testing-library/react';
import { MessageProvider, MessageContext } from './MessageContext';

describe('MessageProvider', () => {
    it('should set the correct initial state', () => {
        let contextValues: any;
        render(
            <MessageProvider>
                <MessageContext.Consumer>
                    {(context) => {
                        contextValues = context;
                        return null;
                    }}
                </MessageContext.Consumer>
            </MessageProvider >
        );
        expect(contextValues.message).toBe('');
        expect(contextValues.messageList).toEqual([]);
    });

    it('should update the message when setMessage is called', () => {
        let contextValues: any;
        render(
            <MessageProvider>
                <MessageContext.Consumer>
                    {(context) => {
                        contextValues = context;
                        return null;
                    }}
                </MessageContext.Consumer>
            </MessageProvider >
        );

        act(() =>
            contextValues.setMessage('test message'));
        expect(contextValues.message).toBe('test message');

    })
});