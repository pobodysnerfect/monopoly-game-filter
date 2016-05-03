let $ = require('jquery'),
    PrizeDataTable = require("./prize-data-table"),
    elements = require('elements');


/**
 * This class attaches events to the dom and provides the main business logic used
 * on this page functionality. It also stores the current state of the winners.
 */
class Main {

    constructor() {
        this.winners = [];
        this.winnersQueue = [];
        this.ui = elements();
        this.prizeDataTable = new PrizeDataTable(this.ui.$codeTable);

        this._applyDataTableCorrection();
    }

    attachEvents() {
        let ui = this.ui;

        ui.$searchBox
            .on('keyup', this._onEvaluateFilter.bind(this))
            .on('blur', this._onClearFilter.bind(this))
            .on('focus', this._onEvaluateFilter.bind(this));

        ui.$seeWinnersButton.on('click', this._onSeePrizesButtonClicked.bind(this));
        ui.$modal.on('show.bs.modal', this._onModalShown.bind(this));
        ui.$claimButton.on('click', this._onClaimButtonClicked.bind(this))
    }

    _applyDataTableCorrection() {
        this.ui.$codeTableWrapper.addClass("table-responsive");
        this.ui.$codeTableFooter.addClass("panel-footer");
    }

    _onEvaluateFilter() {
        this.prizeDataTable.filterByString(this.ui.$searchBox.val());
    }

    _onClearFilter() {
        this.ui.$searchBox.val('');
    }

    _onModalShown(evt) {

        let rowData = this.prizeDataTable.getRowData($(evt.relatedTarget).parents('tr'));

        this.winnersQueue.push(rowData);
        this.ui.$modalPrize.text(rowData.prize);
        this.ui.$modalCode.text(rowData.code);
    }

    _onSeePrizesButtonClicked(evt) {
        $(evt.target).find('.fa')
            .toggleClass('fa-angle-double-down')
            .toggleClass('fa-angle-double-up')
    }

    _onClaimButtonClicked() {
        var rowData = this.winnersQueue.pop();

        for (let i = 0; i < this.winners.length; i++) {
            if (this.winners[i].code === rowData.code) {
                return;
            }
        }

        this.winners.push(rowData);

        this.ui.$noWinnersMessage.remove();
        this.ui.$winningNumbers.append(
                    `<li class='list-group-item'>
                        <strong> <i class='fa fa-lg fa-trophy'></i> ${rowData.prize} 
                        <span class='label label-info'> ${rowData.code} </span>
                        </strong>
                    </li>`);
        this.ui.$numWinners.text(this.winners.length);
        this.prizeDataTable.filterByString('');
        this.ui.$modal.modal('hide');
    }
}

module.exports = Main;
