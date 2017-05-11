import React, {Component, PropTypes} from 'react';

export default class Pagination {

    static propTypes = {
        activePage: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
        onChangePage: PropTypes.func.isRequired
    }

    render() {
        const {activePage, items, onChangePage} = this.props;
        return (
            <div style={{width: '100%', textAlign: 'center'}}>
                <ul className="pagination">
                    {items && items.map((item, id) => (
                        <li key={id} onClick={() => onChangePage(id+1)} className={activePage === id+1 ? "active" : ""}><a href="#">{id+1}</a></li>
                    ))}
                </ul>
            </div>
        );
    }
};
