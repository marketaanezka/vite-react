import React, { useState, useEffect } from 'react';
import { reportWebVitals } from '../reportWebVitals';

const BadPerformanceComponent: React.FC = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    fetchData();
    reportWebVitals(console.log, "BadPerformanceComponent")
  }, []);

  const fetchData = () => {
    // Simulating a delay in fetching data
    setTimeout(() => {
      const newData = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);
      setData(newData);
    }, 3000); // Simulate a 3-second delay
  };

  return (
    <div>
      <h1>Bad Performance Component</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <img
        src="https://via.placeholder.com/1500x800.png"
        alt="Large Placeholder Image"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default BadPerformanceComponent;
