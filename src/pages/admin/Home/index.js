import { request } from '~/utils/httpRequest';
import { useEffect } from 'react';

const fetchData = async () => {
    try {
        // Specify the method ('GET'), the path, and any additional options if needed
        const data = await request('GET', '/categories/find-all');
        console.log(data);
        // Handle the received data
    } catch (error) {
        console.error('GET Error:', error);
        // Handle errors
    }
};

function Home() {
    useEffect(() => {
        fetchData();
    });
    return (
        <div className="container">
            <h1>Home Admin</h1>
        </div>
    );
}

export default Home;
