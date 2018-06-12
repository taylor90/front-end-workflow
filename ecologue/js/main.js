$(document).ready(function() {
  $('#example .js-row-search th').each( function () {
    var title = $(this).text();
    if($(this).hasClass('js-col-date')) {
      $(this).html( '<p id="date_filter"><span id="date-label-from" class="date-label"><input placeholder="From:" class="date_range_filter date" type="text" id="datepicker_from" /></span><span id="date-label-to" class="date-label"><input placeholder="To:" class="date_range_filter date" type="text" id="datepicker_to" /></p>' );
    } else {
      $(this).html( '<p><input type="text" placeholder="Search '+title+'" /></p>' );
    }
  } );
  
  $('.js-generate-datatable').on('click', function(e){
    e.preventDefault();
    
    $('.js-breadcrum-target').each(function(){
      var target = $(this).data('breadcrumTarget');
      var str = "";
      if($(this).hasClass('js-mdl-custom-selectfield--no-multiselect')) {
        str += '<li><a href="a">' + $(this).find('.mdl-list__item.active').data('noMultiselect') + '</a></li>';
      } else {
        $(this).find('input[type="checkbox"]:checked').each(function(){
          str += '<li><a href="a">' + $(this).val() + '</a></li>';
        });
      }
      $('.js-breadcrum-item[data-breadcrum-item="'+target+'"] ul').html(str);
    });

    $('#example').removeClass('hidden');

    if($.fn.DataTable.isDataTable( '#example' )) {
      $('#example').DataTable().destroy();
    }

    /**
     * DataTable
     * reff https://datatables.net/plug-ins/api/
     */
    var table = $('#example').DataTable({
      "bSortCellsTop": true, //allow 1st row in thead to have sort action
      colReorder: {
        "reorderCallback": function () {
            /**
             * You need to remove and reapply the 'keyup change' handler  
            **/
          table.columns('.js-filter-def').every( function (index) {
            var that = this;
            $($('p', '.js-row-search')[index]).find('input').off('keyup change');
            //$( 'input', this.header() ).off('keyup change');
          } );
          /**/
          table.columns('.js-filter-def').every( function (index) {
            var that = this;
            
            $($('p', '.js-row-search')[index]).find('input').on( 'keyup change', function () {
            //$( 'input', this.header() ).on( 'keyup change', function () {
                if ( that.search() !== this.value ) {
                  if(!$(this).parents('th').hasClass('js-filter-num')) {
                    /**
                     * seach input for text fields
                     * Regional|java
                     * ^ -> start with
                     * ^software
                     * $ -> end with
                     * or$
                     * ^$ -> empty field
                     * . -> not empty field
                     */
                    that
                      .search( $(this).val() ? $(this).val() : '', true, false )
                      .draw();
                  }
                }
                
              $('.js-total-count tbody .js-total-num, .js-total-count tr .js-total-num').text(table.column( parseInt($('.js-filter-num').index()), {page:'all', search:'applied'} ).data().sum());
              $('.js-total-count tbody .js-total-currency, .js-total-count tr .js-total-currency').text(table.column( parseInt($('.js-col-currency').index()), {page:'all', search:'applied'} ).data().sum());
            
            } );
            
          
          } );
          //Filter for number fields only with regex
          $('.js-filter-num input').keyup( function() {
            table.draw(); 
            $('.js-total-count tbody .js-total-num, .js-total-count tr .js-total-num').text(table.column( parseInt($('.js-filter-num').index()), {page:'all', search:'applied'} ).data().sum());
            $('.js-total-count tbody .js-total-currency, .js-total-count tr .js-total-currency').text(table.column( parseInt($('.js-col-currency').index()), {page:'all', search:'applied'} ).data().sum());
          } );
          /**/
          //Date search function min/max
          $("#datepicker_from").datepicker({
            dateFormat: 'yy/mm/dd',
            showOn: "both",
              buttonText: '',
            buttonImageOnly: false,
            "onSelect": function(date) {
              minDateFilter = new Date(date).getTime();
              table.draw();
            }
          }).keyup(function() {
            minDateFilter = new Date(this.value).getTime();
            table.draw();
          });
          $("#datepicker_to").datepicker({
            dateFormat: 'yy/mm/dd',
            showOn: "both",
              buttonText: '',
            buttonImageOnly: false,
            "onSelect": function(date) {
              maxDateFilter = new Date(date).getTime();
              table.draw();
            }
          }).keyup(function() {
            maxDateFilter = new Date(this.value).getTime();
            table.draw();
          });
        }  
      },
      /*createdRow: function(row, data, dataIndex) {
        var cRow = $(row);
        var cRowMedia = cRow.data('media');
        if(cRowMedia) {
          console.log(cRow);
        }
      },*/
      search: {
        "regex": true
      },
      ordering: true,
      dom:  'RBlfrtip',//'Bfrtip',
        buttons: [
            {
                extend:    'copyHtml5',
                text:      '<i class="icon-copy"></i>',
                titleAttr: 'Copy'
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="icon-csv"></i>',
                titleAttr: 'CSV'
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="icon-pdf"></i>',
                titleAttr: 'PDF'
            },
            {
                extend:    'print',
                text:      '<i class="icon-printer"></i>',
                titleAttr: 'PRINT'
            }
        ]
    });

    mdlCustomDatatbleDrawerFn();

    //Filter for number fields only with regex
    $('.js-filter-num input').keyup( function() {
      table.draw();
    } );

    // Apply the search for each column
    table.columns('.js-filter-def').every( function (index) {
        var that = this;

        //$( 'input', this.header() ).on( 'keyup change', function () {
        $($('p', '.js-row-search')[index]).find('input').on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
              if(!$(this).parents('th').hasClass('js-filter-num')) {
                /**
                 * seach input for text fields
                 * Regional|java
                 * ^ -> start with
                 * ^software
                 * $ -> end with
                 * or$
                 * ^$ -> empty field
                 * . -> not empty field
                 */
                that
                  .search( $(this).val() ? $(this).val() : '', true, false )
                  .draw();
              }
            }
            /**
            * Update data to total count table
            */

            $('.js-total-count tbody .js-total-num, .js-total-count tr .js-total-num').text(table.column( parseInt($('.js-filter-num').index()), {page:'all', search:'applied'} ).data().sum());
            $('.js-total-count tbody .js-total-currency, .js-total-count tr .js-total-currency').text(table.column( parseInt($('.js-col-currency').index()), {page:'all', search:'applied'} ).data().sum());
        } );
    } );

    //Date search function min/max
    $("#datepicker_from").datepicker({
      dateFormat: 'yy/mm/dd',
      showOn: "both",
        buttonText: '',
      buttonImageOnly: false,
      "onSelect": function(date) {
        minDateFilter = new Date(date).getTime();
        table.draw();
      }
    }).keyup(function() {
      minDateFilter = new Date(this.value).getTime();
      table.draw();
    });
    $("#datepicker_to").datepicker({
      dateFormat: 'yy/mm/dd',
      showOn: "both",
      buttonText: '',
      buttonImageOnly: false,
      "onSelect": function(date) {
        maxDateFilter = new Date(date).getTime();
        table.draw();
      }
    }).keyup(function() {
      maxDateFilter = new Date(this.value).getTime();
      table.draw();
    });
    

    /**
     * Send data to total count table
     */
    $('.js-total-count tbody .js-total-num, .js-total-count tr .js-total-num').text(table.column( parseInt($('.js-filter-num').index()) ).data().sum());
    $('.js-total-count tbody .js-total-currency, .js-total-count tr .js-total-currency').text(table.column( parseInt($('.js-col-currency').index()) ).data().sum());
  });

  //hide / show drawer
  function mdlCustomDatatbleDrawerFn() {
    if($('tr[data-media="true"]').length > 0){

      $('tr[data-media="true"] > td').on('click', function(e){
        $(".mdl-custom-datatable-drawer").addClass("is-visible");
      });

      jQuery(document).click(function(e) {
        var target = e.target;
        if ( (jQuery(target).parents('tr').length > 0 && jQuery(target).parents('tr').data('media')) || jQuery(target).hasClass('mdl-custom-datatable-drawer') || jQuery(target).parents('.mdl-custom-datatable-drawer').length > 0 ) {
          
        } else {
          $(".mdl-custom-datatable-drawer").removeClass("is-visible");
        }
      });

    }

  }

  
} );


// Date range custom filter
// .js-col-date is used to search the Date col eachtime when making a search base on date
minDateFilter = "";
maxDateFilter = "";
$.fn.dataTableExt.afnFiltering.push(
  function(oSettings, aData, iDataIndex) {
    if (typeof aData._date == 'undefined') {
      aData._date = new Date(aData[parseInt( $('.js-col-date').index() )]).getTime();
    }

    if (minDateFilter && !isNaN(minDateFilter)) {
      if (aData._date < minDateFilter) {
        return false;
      }
    }

    if (maxDateFilter && !isNaN(maxDateFilter)) {
      if (aData._date > maxDateFilter) {
        return false;
      }
    }

    return true;
  }
);


$.fn.dataTableExt.afnFiltering.push(
  function( oSettings, aData, iDataIndex ) {
      var filter = $('.js-filter-num input').val().replace(/\s*/g, '');

      var row_data = aData[parseInt($('.js-filter-num').index())] == "-" ? 0 : aData[parseInt($('.js-filter-num').index())]*1;

      // < -> less than
      if (filter.match(/^<\d+$/)) {
          var num = filter.match(/\d+/);
          return row_data < num ? true : false;
      }
      // > -> greater than
      else if (filter.match(/^>\d+$/)) {
          var num = filter.match(/\d+/);
          return row_data > num ? true : false;
      }
      // <> -> not equals to
      else if (filter.match(/^<>\d+$/)) {
          var num = filter.match(/\d+/);
          return row_data != num ? true : false;
      }
      // default -> equals to
      else if (filter.match(/^\d+$/)) {
          var num = filter.match(/\d+/);
          return row_data == num ? true : false;
      }
      return true;
  }
);

/**
 * Plugin reff
 * https://datatables.net/plug-ins/api/sum()
 */
jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
  return this.flatten().reduce( function ( a, b ) {
      if ( typeof a === 'string' ) {
          a = a.replace(/[^\d.-]/g, '') * 1;
      }
      if ( typeof b === 'string' ) {
          b = b.replace(/[^\d.-]/g, '') * 1;
      }

      return a + b;
  }, 0 );
} );