import React, { Component } from 'react';
import "./index.scss";

class SortList extends Component {
    // state = {
    //     sortListData: []
    // }

    render() {
        return (
            <div>
                <ul>
                {
                    this.props.sortListData.map( (item, index) => {
                    return (
                        <li className="sortList_li" key={item.type}>
                            <span className={`sortList_li__index ${index <=2? "sortList_li_indexFilterTrue": "sortList_li_indexFilterFalse"}`}>{index + 1}</span>
                            <span className="sortList_li__textName cs-ellipsis">{item.textName}</span>
                            <span className="sortList_li__price">{item.price}</span>
                        </li>
                    )
                    })
                }
                </ul>
            </div>
        );
    }
}

export default SortList;