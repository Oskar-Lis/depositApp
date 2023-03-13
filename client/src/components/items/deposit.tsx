    import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
    import { connect } from "react-redux";
    import { RouteComponentProps, withRouter } from "react-router-dom";
    import { createDeposit } from "../../store/actions/auth"
    import { DepositType } from "../../global.types"
    function Deposit({ createDeposit }: DepositProps) {
        const [depositValue, setDepositValue] = useState<DepositType>({
            deposit: ""
        });
        const onChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setDepositValue({
                deposit:e.currentTarget.value
            });
        }
        const onDeposit = () => {
            createDeposit(depositValue);
        }
        return (
            <div>
                <h1 className="text-primary mb-3 border-bottom border-primary">Deposit</h1>
                <form className="form">
                    <div className="form-group">
                        <label>Value</label> <br />
                        <input
                            className="form-control"
                            type="text"
                            name="depositValue"
                            onChange={onChange}
                            value={depositValue.deposit}
                        />
                    </div>
                </form>
                <button className="btn btn-secondary mr-4" onClick={onDeposit}>
                    Deposit
                </button>
            </div>
        );
    }

    export default withRouter(connect(null, { createDeposit })(Deposit));

    interface DepositProps extends RouteComponentProps {
        createDeposit: (data: DepositType) => void;
    }
