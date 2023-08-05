jest.mock('sock.io-client', () => {
    const emit = jest.fn();
const on = jest.fn();
const connect = jest.fn();

return jest.fn(() => ({
    emit,
    on,
    connect
}));
})