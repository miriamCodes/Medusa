import { render, fireEvent, waitFor } from '@testing-library/react';
import Server from 'jest-websocket-mock';
import App from './App';



describe('end-to-end chat functionality', () => {
    let server: any;

    beforeEach(() => {
        server = new Server('ws://localhost:3001');
    });

    afterEach(() => {
        server.close();
    });

    it('should allow users to join and leave chat rooms', async () => {
        const { getByText, getByPlaceholderText } = render(<App />);

        const roomInput = getByPlaceholderText('Enter a room name');
        fireEvent.change(roomInput, { target: { value: 'test room' } });
        fireEvent.click(getByText('Join Room'));

        await waitFor(() => expect(server).toHaveReceivedMessages(['join_room', 'test room']));
        fireEvent.click(getByText('Leave Room'));
        await waitFor(() => expect(server).toHaveReceivedMessages(['leave_room', 'test room']));
    })
});