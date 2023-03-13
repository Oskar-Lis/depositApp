import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getItems, updateItem } from "../../store/actions/items";
import { AppState } from "../../store/configureStore";
import { ItemType } from "../../global.types";
import { } from "../../store/actions/action.types";
import { Link } from "react-router-dom";
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';



function HomePage({ getItems, updateItem, items, itemsLoading }: HomePageProps) {
	useEffect(() => {
		getItems();
	}, [getItems]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [modaldata, setModalData] = useState<ItemType>({
		_id: "",
		name: "",
		start_price: "",
		current_price: "",
		time: "",
	});

	const showModal = (item: ItemType) => {
		setModalData(item)
		setIsModalOpen(true);
	};

	const handleOk = (e: FormEvent) => {
		e.preventDefault();
		setIsModalOpen(false);
		updateItem(modaldata);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setModalData({
			...modaldata,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const createItem = () => {

	}


	const columns: ColumnsType<ItemType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Current Price',
			dataIndex: 'start_price',
			key: 'start_price',
		},
		{
			title: 'Time',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Bid',
			key: 'bid',
			render: (_, record) => (
				<button className="btn btn-secondary p-2 pl-4 pr-4" onClick={() => showModal(record)} >Bid</button>
			),
		}
	];


	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">
					<div className="row justify-content-start mt-2">
						{
							items.length > 0 ?
								<>
									<button className="btn btn-secondary mr-3" onClick={createItem}>Ongoing</button>
									<button className="btn btn-secondary mr-3" onClick={createItem}>Completed</button>
								</>
								:
								<Link to="/create-item" className="btn btn-info">
									Create New Item
								</Link>
						}
						
					</div>

					<div>
						<Table columns={columns} dataSource={items} />
					</div>

				</div>
			</div>
			<Modal title={modaldata.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

				<p className="p-2">Bid Price</p>
				<div className="form-group">
					<input
						className="form-control"
						placeholder="value"
						name="start_price"
						value={modaldata.start_price}
						onChange={onChange}
					/>
				</div>
			</Modal>
		</div>
	);
}

const mapStateToProps = (state: AppState) => ({
	items: state.items.items,
	itemsLoading: state.items.loading,
});

export default connect(mapStateToProps, { getItems, updateItem })(HomePage);

interface HomePageProps {
	getItems: VoidFunction;
	updateItem: Function;
	items: ItemType[];
	itemsLoading: boolean;

}
