import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const AccountVerificationForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("OTP Submitted:", value);
  };

  return (
    <div className="flex justify-center bg-slate-900 p-5 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full max-w-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="font-semibold">Email:</p>
          <p className="text-slate-300">abc@gmail.com</p>
        </div>
        <Dialog className="bg-white">
          <DialogTrigger asChild>
            <Button className="bg-white text-slate-900 hover:bg-gray-200">Send OTP</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={"text-white"}>Enter OTP</DialogTitle>
            </DialogHeader>
            <div className="py-5 flex gap-6 justify-center items-center bg-white">
              <InputOTP value={value} onChange={setValue} maxLength={6} className={"text-white "}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-[10rem] bg-slate-900 text-white hover:bg-slate-800"
                >
                  Submit
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
