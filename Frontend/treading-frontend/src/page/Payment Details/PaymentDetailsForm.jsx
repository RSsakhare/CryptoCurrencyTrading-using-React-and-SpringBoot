import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addPaymentDetails } from "@/State/Withdrawal/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const PaymentDetailsForm = () => {
    const dispatch = useDispatch()

    const form = useForm({
        resolver:"",
        defaultValues:{
            accountHolderName:"",
            ifsc:"",
            accountNumber:"",
            bankName:""
        }
    })

    const onSubmit = (data) => {
        dispatch(addPaymentDetails({
            paymentDetails:data,
            jwt:localStorage.getItem("jwt")
        }))
        console.log(data);
    }
    return (
        <div className="px-10 py-2 bg-slate-900">

            <Form {...form}>

                <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6">
                    <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>Account Holder Name</FormLabel>
                            <FormControl>
                                <Input 
                                //name="accountHolderName"
                                className="border w-full border-gray-700 p-5 text-white"
                                placeholder="Sam" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >

                    </FormField>

                    <FormField
                    control={form.control}
                    name="ifsc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>IFSC Code</FormLabel>
                            <FormControl>
                                <Input 
                               // name="ifsc"
                                className="border w-full border-gray-700 p-5 text-white"
                                placeholder="IFSC Code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >

                    </FormField>
                    
                    <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>Account Number</FormLabel>
                            <FormControl>
                                <Input 
                                className="border w-full border-gray-700 p-5 text-white"
                                placeholder="*********5642" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >

                    </FormField>

                    <FormField
                    control={form.control}
                    name="confirmAccountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>Confirm Account Number</FormLabel>
                            <FormControl>
                                <Input 
                               
                                className="border w-full border-gray-700 p-5 text-white"
                                placeholder="confirm account number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >

                    </FormField>

                    <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>Bank Name</FormLabel>
                            <FormControl>
                                <Input 
                                
                                className="border w-full border-gray-700 p-5 text-white"
                                placeholder="Yes Bank" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    >

                    </FormField>
                    <DialogClose className="w-full">
                        <Button 
                            type="submit"
                            className="w-full py-5 bg-white">
                            Submit
                       </Button>
                    </DialogClose>
                </form>

            </Form>

        </div>
    )
};

export default PaymentDetailsForm;