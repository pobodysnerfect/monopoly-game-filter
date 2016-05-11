/**
 * entry point for the app;
 */

let React = require('react/react'),
    ReactDOM = require('react-dom'),
    data = require('json!../data.json').data;

class PrizeDataTable extends React.Component {

    render() {

        let rows = this.props.data.map(function (rowData) {
            return (
                <tr key={rowData[0]}>
                    <td><span>{rowData[1]}</span></td>
                    <td><strong>{rowData[0]}</strong></td>
                    <td>
                        <button className='btn btn-sm btn-primary' data-toggle='modal'
                                data-target='#prizeConfirmModal'>
                            <i className='fa fa-star' aria-hidden='true'></i>
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <div className="form-group">
                    <input type="text" id="codeSearch" className="form-control input-lg" placeholder="Enter code..."/>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading visible-xs ">
                        <div className="btn-group pull-right">

                            <button className="btn btn-sm btn-default" id="seeWinners"
                                    data-toggle="collapse" data-target="#collapsableWinners">
                                <i className="fa fa-angle-double-down"></i>
                                See prizes won
                            </button>
                        </div>
                        <strong><i className="fa fa-star"></i>
                            Prizes Won
                            <span className="label label-default numWinners">0</span>
                        </strong>
                    </div>
                    <table className='table table-striped table-bordered'>
                        <thead>
                        <tr>
                            <th>Prize Info</th>
                            <th>Code</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<PrizeDataTable data={data}/>, document.getElementById('prizeDataTable'));
