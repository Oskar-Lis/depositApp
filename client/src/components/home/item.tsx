import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../store/configureStore";
import { ItemType } from "../../global.types";


function Item({
	authLoading,
	item: { _id, name, start_price, time },
	showControls = true,
	history
}: ItemProps) {

	return (
		<div className="card my-3 shadow-sm">
            <div className="row justify-content-between pl-4 pr-4 pt-1 pb-1">
                <p className="p-2">{name}</p>
                <p className="p-2">{start_price}$</p>
                <p className="p-2">{time}</p>
            </div>
			
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	authLoading: state.auth.loading,
});

export default withRouter(connect(mapStateToProps, {})(Item));

interface ItemProps extends RouteComponentProps{
	authLoading: boolean;
	item: ItemType;
	showControls?: boolean;
}
