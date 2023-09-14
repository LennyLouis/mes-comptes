import { Handle } from '@sveltejs/kit';
import cors from 'cors';

export const handle: Handle = async ({ request, resolve }) => {
    // Apply CORS
    const corsHandler = cors({ origin: true, credentials: true });
    const result = await new Promise((resolve, reject) => {
        corsHandler(request, {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({});
            }
        });
    });

    if (result instanceof Error) {
        return {
            status: 500,
            body: 'CORS error'
        };
    }

    // Continue to process the request
    const response = await resolve(request);

    return response;
};
