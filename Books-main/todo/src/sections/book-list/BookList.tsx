import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../assets/book.jpeg';

export default function BookList() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/books');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>
              <img src={logo} alt="book" width="50" height="50" />
              {item.author}-{item.book_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
