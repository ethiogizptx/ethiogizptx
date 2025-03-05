document.addEventListener('DOMContentLoaded', function() {
  // Enhanced Tab Switching
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section-content');
  
  tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
          e.preventDefault();
          const target = this.dataset.tab;
          
          // Update tabs
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          // Update sections
          sections.forEach(section => {
              section.classList.remove('active');
              if(section.id === target) {
                  section.classList.add('active');
              }
          });
      });
  });

  // Carbon Footprint Calculator
  const calculatorForm = document.getElementById('calculator-form');
  if(calculatorForm) {
      calculatorForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const emissions = parseFloat(document.getElementById('aircraft').value);
          const distance = parseFloat(document.getElementById('departure').value);
          const esafblend = parseFloat(document.getElementById('esafblend').value);

          if ([emissions, distance, esafblend].some(isNaN)) {
              alert('Please fill all fields with valid numbers');
              return;
          }

          const savedCO2 = (distance * emissions * esafblend) / 100;
          document.getElementById('calculator-result').innerHTML = `
              <strong>Saved CO₂ Emissions:</strong> ${savedCO2.toFixed(2)} kg CO₂
          `;
      });
  }

  // Economic Analysis Calculator
  const economicForm = document.getElementById('economic-form');
  if(economicForm) {
      economicForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const price = parseFloat(document.getElementById('station').value);
          const esafblending = parseFloat(document.getElementById('esafblending').value);

          if ([price, esafblending].some(isNaN)) {
              alert('Please fill all fields with valid numbers');
              return;
          }

          // Calculation steps
          const y = esafblending;
          const a = 100 - y;
          const b = 3 * y * price;
          const c = a + b;
          const R = price * (1 - (c/100)); // Adjusted calculation

          document.getElementById('incentive-result').innerHTML = `
              <strong>Required Policy Incentive:</strong> ${R.toFixed(3)} USD per Liter
          `;
      });
  }
});