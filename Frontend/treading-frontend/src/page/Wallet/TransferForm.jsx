import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { transferMoney } from "@/State/Wallet/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TransferForm = () => {
    const dispatch = useDispatch();
    const {wallet} = useSelector(store => store.wallet)
    const [formData, setFormData] = React.useState({
        amount: "",
        walletId: "",
        purpose: ""
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = () => {
        dispatch(transferMoney({
            jwt:localStorage.getItem('jwt'),
            walletId:formData.walletId,
            reqData:{
                amount:formData.amount,
                purpose:formData.purpose,
            }
        }))
        console.log(formData);
    }
    return (
        <div className="pt-10 space-y-5">

            <div>
                <h1 className="pb-1 text-white">Enter Amount</h1>
                <Input 
                name="amount"
                onChange={handleChange}
                value={formData.amount}
                className={"py-7"}
                placeholder="$9999"
                />
            </div>
            <div>
                <h1 className="pb-1 text-white">Wallet Id</h1>
                <Input 
                name="walletId"
                onChange={handleChange}
                value={formData.walletId}
                className={"py-7"}
                placeholder="#ADER455"
                />
            </div>
            <div>
                <h1 className="pb-1 text-white">Purpose</h1>
                <Input 
                name="purpose"
                onChange={handleChange}
                value={formData.purpose}
                className={"py-7"}
                placeholder="gift for your friend...."
                />
            </div>

            <DialogClose className="w-full">
                <Button 
                    onClick={handleSubmit}
                    className="w-full py-7 bg-slate-900 text-white">
                    Submit
                </Button>
            </DialogClose>

        </div>
    )
}

export default TransferForm;
