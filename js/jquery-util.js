//this section need Jquery

//quantity
jQuery(document).ready(function(){
  // This button will increment the value
  $('[data-quantity="plus"]').click(function(e){
      e.preventDefault();
      fieldName = $(this).attr('data-field');
      var currentVal = parseInt($('input[name='+fieldName+']').val());
      if (!isNaN(currentVal)) {
          $('input[name='+fieldName+']').val(currentVal + 1);
      } else {
          $('input[name='+fieldName+']').val(1);
      }
  });
  $('[data-quantity="minus"]').click(function(e) {
      e.preventDefault();
      fieldName = $(this).attr('data-field');
      var currentVal = parseInt($('input[name='+fieldName+']').val());
      if (!isNaN(currentVal) && currentVal > 0) {
          $('input[name='+fieldName+']').val(currentVal - 1);
      } else {
          $('input[name='+fieldName+']').val(0);
      }
  });
});