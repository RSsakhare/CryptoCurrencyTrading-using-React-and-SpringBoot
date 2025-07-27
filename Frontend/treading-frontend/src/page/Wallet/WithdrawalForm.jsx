import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const WithdrawalForm = () => {
    const [amount, setAmount] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");

    const dispatch = useDispatch();
    const { wallet } = useSelector(store => store.wallet);
    const { withdrawal } = useSelector(store => store.withdrawal);

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(withdrawalRequest({
            amount,
            jwt: localStorage.getItem("jwt")
        }));
        console.log("Requested withdrawal:", amount);
    };

    return (
        <div className="pt-10 space-y-5">
            <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4 text-white">
                <p>Available Balance</p>
                <p>${wallet?.balance || "0"}</p>
            </div>

            <div className="flex flex-col items-center text-white">
                <h1>Enter Withdrawal amount</h1>
                <div className="flex items-center justify-center">
                    <Input 
                        onChange={handleChange}
                        value={amount}
                        className="withdrawalInput border-none outline-none focus:outline-none 
                            px-0 text-2xl text-center text-white bg-slate-900"
                        placeholder="$9999"
                        type="number"
                    />
                </div>
            </div>

            <div>
                <p className="pb-2">Transfer to</p>
                {withdrawal?.paymentDetails ? (
                    <div className="flex items-center gap-5 px-5 py-2 rounded-md">
                        <img
                            className="h-8 w-8"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAoA5-UIvjkps_nWyUh_tI3g1AuLNA0NbITg&s"
                            alt="Payment Method Logo"
                        />
                        <div>
                            <p className="text-xl font-bold text-white">
                                {withdrawal.paymentDetails.bankName}
                            </p>
                            <p className="text-xs text-white">
                                {withdrawal.paymentDetails.accountNumber}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-red-400 px-5">Payment details not available.</p>
                )}
            </div>

            <DialogClose className="w-full">
                <Button 
                    onClick={handleSubmit}
                    className="w-full py-7 text-xl text-white bg-slate-900"
                >
                    Withdraw
                </Button>
            </DialogClose>
        </div>
    );
};

export default WithdrawalForm;
