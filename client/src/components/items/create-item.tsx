import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ItemType } from "../../global.types";
import { AppState } from "../../store/configureStore";
import { addItem } from "../../store/actions/items";
import { getItems } from "../../store/actions/items"

function CreateItems({
    addItem,
    history,
}: createItemProps) {

    const [formData, setFormData] = useState<ItemType>(
        {
            _id: undefined,
            name: "",
            start_price: "",
            current_price : "",
            time: "",
        }
    );

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const onCreateItem = async (e: FormEvent) => {
        e.preventDefault();
        await addItem(formData);
        getItems();
        history.push(`/home`);
    };

    const onCancel = (e: FormEvent) => {
        history.push(`/home`);
    }

    return (
        <div>
            <h1 className="text-primary mb-3 border-bottom border-primary">Create Item</h1>
            <form className="form">
                <div className="form-group">
                    <label>Name</label> <br />
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={onChange}
                        value={formData.name}
                    />
                </div>
                <div className="form-group">
                    <label>Start Price</label> <br />
                    <input
                        className="form-control"
                        type="text"
                        name="start_price"
                        minLength={6}
                        onChange={onChange}
                        value={formData.start_price}
                    />
                </div>
                <div className="form-group">
                    <label>Time Window</label> <br />
                    <input
                        type="text"
                        name="time"
                        minLength={6}
                        onChange={onChange}
                        value={formData.time}
                        className="form-control"
                    />
                </div>
            </form>
            <div className="row mx-1 justify-content-end">
                <button className="btn btn-secondary mr-4" onClick={onCancel}>
                    Cancel
                </button>
                <button className="btn btn-secondary" onClick={onCreateItem}>
                    Create
                </button>
            </div>
        </div>
    );
}
const mapStateToProps = (state: AppState) => ({
    profileData: state.profile.profile,
    profileLoading: state.profile.loading,
});

export default withRouter(connect(mapStateToProps, { addItem })(CreateItems));

interface createItemProps extends RouteComponentProps {
    addItem: (data: ItemType) => void;
}
