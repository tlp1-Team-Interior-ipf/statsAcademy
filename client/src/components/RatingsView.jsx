import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useAuth } from '../hooks/ContextHook';

const RatingsTable = () => {
    const [data, setData] = useState([]);
    const { user } = useAuth();
    const id = user.data.id;

    useEffect(() => {
        fetch(`http://localhost:4000/ratings/${id}`)
            .then((res) => res.json())
            .then((data) => {
                const tableData = data.data.map((rating, index) => ({
                    key: index,
                    topic: rating.topics.name, // Nombre del tema
                    score: rating.note, // Calificación
                    date: new Date(rating.createdAt).toLocaleDateString(),
                }));
                setData(tableData);
            });
    }, []);

    // Columnas de la tabla
    const columns = [
        {
            title: 'Tema',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Calificación',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default RatingsTable;