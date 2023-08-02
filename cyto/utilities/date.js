function addDays(date, days) {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
  }

  function addMinutes(date, minutes) {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() + minutes);
  
    return dateCopy
  }
  

  module.exports = {
    addDays,
    addMinutes
    };

