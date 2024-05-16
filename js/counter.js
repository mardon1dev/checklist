document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.item--number').forEach(function(item) {
        let input = item.querySelector('.item--count');
        let btnUp = item.querySelector('.item--count--top');
        let btnDown = item.querySelector('.item--count--bottom');
        let min = parseFloat(input.getAttribute('min'));
        let max = parseFloat(input.getAttribute('max'));
      
        btnUp.addEventListener('click', function() {
          let oldValue = parseFloat(input.value);
          let newVal = oldValue >= max ? oldValue : oldValue + 1;
          input.value = newVal;
          input.dispatchEvent(new Event('change'));
        });
      
        btnDown.addEventListener('click', function() {
          let oldValue = parseFloat(input.value);
          let newVal = oldValue <= min ? oldValue : oldValue - 1;
          input.value = newVal;
          input.dispatchEvent(new Event('change'));
        });
      });
})
  