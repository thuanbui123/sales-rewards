import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const request = async (method, path, data = null, options = {}) => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case 'get':
                response = await httpRequest.get(path, options);
                break;
            case 'post':
                response = await httpRequest.post(path, data, options);
                break;
            case 'put':
                response = await httpRequest.put(path, data, options);
                break;
            case 'delete':
                response = await httpRequest.delete(path, options);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response;
    } catch (error) {
        throw error;
    }
};
export default httpRequest;
