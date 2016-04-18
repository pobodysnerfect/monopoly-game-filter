"use strict";

var $ = window.$,
    dataTableOptions = {
        data: [
            ["$613", "$1,000,000 Grand Prize!"],
            ["$618", "$1,000,000 Grand Prize!"],
            ["?622", "$500,000 Vacation Home"],
            ["?625", "$500,000 Vacation Home"],
            ["A502", "$100,000 or Luxury Car"],
            ["A504", "$100,000 or Luxury Car"],
            ["B505", "$50,000 Home Makeover"],
            ["B506", "$50,000 Home Makeover"],
            ["C513", "$35,000 Vehicle"],
            ["C514", "$35,000 Vehicle"],
            ["D515", "$20,000 Tuition"],
            ["D517", "$20,000 Tuition"],
            ["E524", "$10,000 Jet Ski"],
            ["E525", "$10,000 Jet Ski"],
            ["F527", "$10,000 Vacation"],
            ["F528", "$10,000 Vacation"],
            ["G531", "$25 Gift Card Mall"],
            ["H538", "$15 Grocery Gift Card"],
            ["I541", "$10 Grocery Gift Card"],
            ["J544", "$5 Grocery Gift Card"],
            ["K549", "$25 Grocery Gift Card"],
            ["L551", "$25 Cash"],
            ["M556", "$50 Grocery Gift Card"],
            ["N562", "$78 Redbox"],
            ["O565", "$100 Grocery Gift Card"],
            ["P568", "$100 Cash"],
            ["Q573", "$200 Family Picnic"],
            ["R575", "$200 Cash"],
            ["S579", "$500 Spa"],
            ["T585", "$1,000 Weekend Getaway"],
            ["U590", "$1,000 Grocery Giftcard"],
            ["V592", "$1,000 Cash"],
            ["W597", "$1,500 TV"],
            ["X602", "$2,500 Grill"],
            ["Y603", "$5,000 Groceries"],
            ["Z608", "$5,000 Cash"]
        ],
        columns: [{
            title: "Code"
        }, {
            title: "Prize"
        }, {
            width: '38px',
            orderable: false,
            data: null,
            defaultContent: '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#prizeConfirmModal" ><i class="fa fa-star" aria-hidden="true"></i></button>'
        }
        ],
        paging: false,
        ordering: false,
        dom: 'rti'
    },
    winners = [],
    saveStack = [];

function registerEventHandlers(elements) {

    function filterDataTableBySearchString() {
        elements.dataTable
            .columns(0)
            .search(elements.$searchBox.val())
            .draw();
    }

    function clearSearchStringFilter() {
        elements.$searchBox
            .val('');
    }

    function toggleIconOnClick() {
        elements.$winningNumbers
            .removeClass('hidden');
    }

    function toggleIconOnClick() {
        $(this).find('.fa')
            .toggleClass('fa-angle-double-down')
            .toggleClass('fa-angle-double-up')
    }

    function saveCodeMatch() {

        var rowData = saveStack.pop();

        if (!rowData || !rowData.length || !rowData[0]) {
            return;
        }

        for (var i = 0; i < winners.length; i++) {
            if (winners[i][0] === rowData[0]) {
                return;
            }
        }
        winners.push(rowData);

        elements.$noWinnersMessage
            .remove();
        elements.$winningNumbers
            .append("<li class='list-group-item'> <strong> <i class='fa fa-lg fa-trophy'></i> " +
                rowData[1] + " <span class='label label-info'> " + rowData[0] + "</span></strong></li>");
        elements.$numWinners.text(winners.length);
        filterDataTableBySearchString();
    }

    elements.$searchBox
        .on('keyup', filterDataTableBySearchString)
        .on('blur', clearSearchStringFilter)
        .on('focus', filterDataTableBySearchString);

    elements.$codeTableWrapper
        .addClass("table-responsive");

    elements.$codeTableFooter
        .addClass("panel-footer");

    elements.$seeWinnersButton
        .on('click', toggleIconOnClick);

    elements.$modal
        .on('show.bs.modal', function(evt){
            var $clickedRow = $(evt.relatedTarget).parents('tr'),
                rowData = elements.dataTable
                    .row($clickedRow)
                    .data();

            if (!rowData || !rowData.length || !rowData[0]) {
                return;
            }

            saveStack.push(rowData);

            elements.$modalPrize
                .text(rowData[1]);
            elements.$modalCode
                .text(rowData[0]);

        })
        .on('hidden.bs.modal', function (e) {
            console.dir(e);
        });

    elements.$claimButton
        .on('click', function(){
            saveCodeMatch();
            elements.$modal.modal('hide');
        })
}


$(document).ready(function onDomReadyHandler() {

    var $codeTable = $('#monopolyTable'),
        dataTable = $codeTable.DataTable(dataTableOptions);

    registerEventHandlers({
        dataTable: dataTable,
        $codeTable: $codeTable,
        $codeTableWrapper: $("#monopolyTable_wrapper"),
        $codeTableFooter: $("#monopolyTable_info"),
        $searchBox: $('#codeSearch'),
        $noWinnersMessage: $(".noWinners"),
        $winningNumbers: $(".winningNumbers"),
        $numWinners: $(".numWinners"),
        $seeWinnersButton: $("#seeWinners"),
        $modal: $("#prizeConfirmModal"),
        $modalPrize: $("#modalPrize"),
        $modalCode: $("#modalCode"),
        $claimButton: $("#claimButton")

    });
});