


  function addMonths(date, addMonths) {
    let d = new Date(date);
    let originalDay = d.getDate();            // What day did the lease begin with??
    let originalMonth = d.getMonth();         // Store the original month
    let originalYear = d.getFullYear();       // Store the original year

    d.setMonth(d.getMonth() + addMonths);     // Add the number of months, d is now in the future

    // if originalMonth is 11 and d.getMonth() is 1, then 1 - 11 = -10 (negative 10)
    let monthsDiff = (d.getFullYear() - originalYear) * 12 + d.getMonth() - originalMonth;

    if (monthsDiff > addMonths) {
      d.setDate(0);                          // Set the date to the last day of the previous month
    } else {
      if (originalDay > d.getDate()) {
        d.setDate(d.getDate());              // 
      } else {
        d.setDate(originalDay);  // Set the date to the original day
      }
    }

    return d.toISOString().split('T')[0];
  }

  function addYears(date, years) {
      let d = new Date(date);
      d.setFullYear(d.getFullYear() + years);
      return d.toISOString().split('T')[0];
  }






        

  // MAKE ME A CASH FLOW TABLE
  // WITH DATES AND AMOUNTS
  // AND VAT
  function showLeaseCashFlow() {
      const startDate = document.getElementById('dateStarting').value;
      const startingRent = parseFloat(document.getElementById('rentStarting').value.replace(',', ''));
      const numPeriods = parseInt(document.getElementById('howLong').value);
      const period = document.getElementById('howLongFrequency').textContent
      
      // Please fix the escalation
      // const escalationFrequencyType = period;
      const escalationFrequencyAmount = parseInt(document.getElementById('howOftenEscalate').value);
      const escalationPercentage = parseFloat(document.getElementById('escalationPercentage').value) / 100;

      let tableHtml = '<table><tr> <th>Period</th> <th>Date</th> <th>Escalation</th> <th>Rent Alone</th> <th>VAT Alone</th> <th>TOTAL</th> </tr>';

      let currentDate = startDate;
      let currentRent = startingRent;

      // We have to force the first row to be ZERO
      // if we start from i = 0 minus 1 
      // then we also have to make the final row equal numPeriods minus 1
      for (let i = 0 - 1; i < numPeriods - 1; i++) {
          const periodNumber = i + 1;
          let escalation = '';


          if (periodNumber > 0) {
          
              if (periodNumber % escalationFrequencyAmount === 0) {
                  escalation = escalationPercentage;
                  currentRent = currentRent * (1 + escalationPercentage);
              }

          } else {
              escalation = 0;
              currentRent = startingRent;
          }







          // Making the TABLE
          // undo the logic of starting from negative 1, to force the first row to be zero
          // make sure the table shows periodNumber PLUS 1
          tableHtml += `<tr>
              <td>${periodNumber + 1}</td> 
              <td>${currentDate}</td>
              <td>${escalation ? (escalation * 100).toFixed(2) + '%' : ''}</td>
              <td>${(currentRent * 1.00).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              <td>${(currentRent * 0.12).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
              <td>${(currentRent * 1.12).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
          </tr>`;

          
          // What should the next period DATE be??
          // DATES 
          if (period === 'months') {
              currentDate = addMonths(startDate, periodNumber + 1);
          } else {
              currentDate = addYears(startDate, periodNumber + 1);
          }
      }

      tableHtml += '</table>';
      document.getElementById('cashFlowTable').innerHTML = tableHtml;


      

      // Reset the background gradient
      document.body.style.background = 'linear-gradient(to bottom, #f9f9f9, grey)';

      // Add a margin to the table element
      document.getElementById('cashFlowTable').style.marginLeft = '40px';
      document.getElementById('cashFlowTable').style.marginBottom = '100px';
      
  }




