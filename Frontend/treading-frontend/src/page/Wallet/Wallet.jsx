import React, { useEffect } from "react";
import {
  Card,
  CardContent,
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
import {
  CopyIcon,
  ReloadIcon,
  ShuffleIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DollarSign, WalletIcon } from "lucide-react";
import TopupForm from "./TopupForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { depositMoney, getUserWallet, getWalletTransactions } from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store.wallet || {});

  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId || paymentId,
          navigate,
        })
      );
    }
  }, [orderId, paymentId, razorpayPaymentId, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center">
      <section className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30} />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 text-sm">
                      #{wallet?.userWallet?.id ?? "N/A"}
                    </p>
                    <CopyIcon className="cursor-pointer hover:text-slate-300" />
                  </div>
                </div>
              </div>
              <ReloadIcon
                onClick={() =>
                  dispatch(getUserWallet(localStorage.getItem("jwt")))
                }
                className="w-6 h-6 cursor-pointer hover:text-gray-400"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign />
              <span className="text-2xl font-semibold">
                {wallet?.userWallet?.balance ?? "0"}
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              {/* Topup Dialog */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800">
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>

              {/* Withdrawal Dialog */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800">
                    <UploadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              {/* Transfer Dialog */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl text-white">
                      Transfer to other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* History Section */}
        <section className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h2 className="text-2xl font-semibold">History</h2>
            <UpdateIcon
              className="h-7 w-7 cursor-pointer hover:text-gray-400"
              onClick={() =>
                dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }))
              }
            />
          </div>

          <div className="space-y-5">
            {(wallet?.transactions || []).map((item, i) => (
              <Card key={i} className="px-5 p-2 flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <Avatar>
                    <AvatarFallback>
                      <ShuffleIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p>{item.type || item.purpose}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <p className="text-green-500">{item.amount} USD</p>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Wallet;
