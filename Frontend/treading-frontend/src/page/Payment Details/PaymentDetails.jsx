import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "@/State/Withdrawal/Action";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store.withdrawal);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  const payment = withdrawal?.paymentDetails;

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Payment Details
      </h1>

      {payment ? (
        <Card className="flex justify-center">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700">
              {payment.bankName}
            </CardTitle>
            <CardDescription className="text-gray-500">
              A/C No: {payment.accountNumber}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 justify-center">
            <div className="flex items-center">
              <p className="w-32 text-sm font-medium text-slate-600">
                A/C Holder
              </p>
              <p className="text-sm text-gray-500">
                : {payment.accountHolderName}
              </p>
            </div>
            <div className="flex items-center">
              <p className="w-32 text-sm font-medium text-slate-600">IFSC</p>
              <p className="text-sm text-gray-500">{payment.ifsc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="py-6 bg-slate-700 text-white">
              Add payment details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
