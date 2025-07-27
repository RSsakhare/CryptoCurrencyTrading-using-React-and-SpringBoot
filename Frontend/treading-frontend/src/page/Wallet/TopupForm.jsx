import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentHandler } from "@/State/Wallet/Action";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";

const TopupForm = () => {
    const [amount, setAmount] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");
    const dispatch = useDispatch();

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        console.log(amount, paymentMethod);
        dispatch(paymentHandler({jwt:localStorage.getItem("jwt"),
            paymentMethod,
            amount
        }));
    }
    return (
        <div className="pt-10 space-y-5 bg:slate-100">

            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input 
                onChange={handleChange}
                value={amount}
                className="py-7 text-lg"
                placeholder="$9999"
                />
            </div>

            <div className="bg:white">
                <h1 className="pb-1">Select payment method</h1>
                <RadioGroup 
                onValueChange={(value)=> handlePaymentMethodChange(value)}
                className="flex  " 
                defaultValue="RAZORPAY">

                    <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">

                        <RadioGroupItem 
                        icon={DotFilledIcon}
                        className="h-9 w-9"
                        value="RAZORPAY"
                        id="r1"
                        />
                        <Label htmlFor="r1">
                            
                            <div className="bg-white rounded-md px-5 w-32 ">
                                <img 
                                className="h-9"
                                src="https://episyche.com/_next/image?url=https%3A%2F%2Fepisyche-blog.s3.ap-south-1.amazonaws.com%2FDjango%2FPayments%2FRazorpay%2FOne%20Time%20Payment%2F9%2Fthumbnail_image%2F03b5a151-eff7-487c-8c58-624003d6c741.png&w=1200&q=75"   alt=""     />

                            </div>

                        </Label>

                    </div>

                     <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">

                        <RadioGroupItem 
                        icon={DotFilledIcon}
                        className="h-9 w-9"
                        value="STRIPE"
                        id="r2"
                        />
                        <Label htmlFor="r2">
                            
                            <div className="bg-white rounded-md px-5 py-2 w-32 ">
                                <img src="data:image/png;base64,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"   alt=""     />

                            </div>

                        </Label>

                    </div>

                </RadioGroup>
            </div>
                <Button 
                onClick={handleSubmit}
                className="w-full py-7 bg:slate-900 text-white bg-slate-900">
                    Submit
                </Button>
        </div>
    )
}

export default TopupForm;