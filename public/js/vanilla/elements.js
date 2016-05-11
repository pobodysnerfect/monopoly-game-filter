let $ = require('jquery');

/**
 * Returns a simple object which stores all jquery/dom references
 * 
 * @returns {object}
 */
module.exports = function elements() {
    return {
        $codeTable: $('#monopolyTable'),
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
    }
};
