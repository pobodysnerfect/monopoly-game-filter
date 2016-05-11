/**
 * Defines the jquery datatable and exposes several convenience methods for
 * changing it.
 */
class PrizeDataTable {

    constructor($element) {

        if (!$element || $element.length <= 0) {
            throw 'Data table element is not defined!';
        }

        this.dataTable = $element.DataTable({
            data: require('json!../data.json').data,
            columns: [
                {
                    title: 'Code'
                },
                {
                    title: 'Prize'
                },
                {
                    width: '38px',
                    orderable: false,
                    data: null,
                    defaultContent: `<button class='btn btn-sm btn-primary' data-toggle='modal' data-target='#prizeConfirmModal' >
                                        <i class='fa fa-star' aria-hidden='true'></i>
                                    </button>`
                }
            ],
            paging: false,
            ordering: false,
            dom: 'rti'
        });
    }

    filterByString(value) {
        this.dataTable
            .columns(0)
            .search(value)
            .draw();
    }

    getRowData($clickedRow) {
        let rowData = this.dataTable
            .row($clickedRow)
            .data();

        if (!rowData || !rowData.length || !rowData[0]) {
            throw 'Cannot find row data for the given element';
        }

        return {
            code: rowData[0],
            prize: rowData[1]
        }
    }
}

module.exports = PrizeDataTable;
