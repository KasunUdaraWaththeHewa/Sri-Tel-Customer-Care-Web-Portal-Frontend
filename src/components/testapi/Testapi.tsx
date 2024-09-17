// pages/index.tsx
import { useEffect, useState } from 'react';
import {  NextPage } from 'next';
import api from '@/api/api';

interface Data {
  results: any[];  // It's better to define a more specific type.
}

interface HomePageProps {
  initialData?: Data;  // Renamed to clarify it's the initial server-side loaded data
  error?: string;
}


// export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
//     try {
//         const res = await api.get<Data>('/data'); // Server-side fetch
//         return { props: { initialData: res.data } };
//     } catch (error) {
//         console.log(error);
//         return { props: { error: 'Failed to fetch data.' } };
//     }
// }

const HomePage: NextPage<HomePageProps> = ({ initialData, error }) => {
    const [data, setData] = useState<Data | undefined>(initialData);  // Use state to handle data

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
               api.get<Data>('/404').then((res) => {
                    setData(res.data);
                }
                );
            } catch (error) {
                console.log(error);
            }
        };

        // Check if initialData is not provided, then fetch data
        if (!initialData) {
            fetchData();
        }
    }, [initialData]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Data from API</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
        </div>
    );
}

export default HomePage;
