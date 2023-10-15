import React, { useState, useEffect } from 'react';
import { format, addDays, isAfter } from 'date-fns';

function App() {
  const [weekType, setWeekType] = useState(localStorage.getItem('weekType') || 'technical');
  const [startDate, setStartDate] = useState(new Date());
  const endDate = addDays(new Date(startDate), 7);

  const handleButtonClick = (type) => {
    // if (weekType !== type) {
      setWeekType(type);
      setStartDate(new Date());
      localStorage.setItem('weekType', type);
      localStorage.setItem('startDate', new Date().toISOString());
    // }
  };

  const isTechnicalWeek = weekType === 'technical';
  const currentDateString = format(new Date(), 'MMMM d, yyyy');

  return (
    <div className="App">
      <h1>Business Week Type</h1>
      <p>Current Week: {weekType.charAt(0).toUpperCase() + weekType.slice(1)}</p>
      <p>Current Date: {currentDateString}</p>
      <p>End Date: {format(endDate, 'MMMM d, yyyy')}</p>
      <button onClick={() => handleButtonClick('technical')}>Technical Week</button>
      <button onClick={() => handleButtonClick('marketing')}>Marketing Week</button>
      {isAfter(new Date(), endDate) && (
        <p>It's time to switch to a {weekType === 'technical' ? 'marketing' : 'technical'} week!</p>
      )}
    </div>
  );
}

export default App;
