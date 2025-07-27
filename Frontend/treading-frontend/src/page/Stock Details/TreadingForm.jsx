import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { DotIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TreadingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { coin } = useSelector((store) => store.coin);
  const { wallet } = useSelector((store) => store.wallet);
  const { asset } = useSelector((store) => store.asset);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    const price = coin?.coinDetails?.market_data?.current_price?.usd;

    if (price) {
      const volume = calculateBuyCost(value, price);
      setQuantity(volume);
    } else {
      setQuantity(0);
    }
  };

  const calculateBuyCost = (amount, price) => {
    const volume = amount / price;
    const decimalPlaces = Math.max(2, price.toString().split(".")[0]?.length);
    return volume.toFixed(decimalPlaces);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWallet(jwt));
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const coinId = coin?.coinDetails?.id;
    if (jwt && coinId) {
      dispatch(getAssetDetails({ coinId, jwt }));
    }
  }, [coin?.coinDetails?.id]);

  const handleBuyCrypto = () => {
    const jwt = localStorage.getItem("jwt");
    const coinId = coin?.coinDetails?.id;

    if (!coinId) {
      console.warn("Cannot place order. Missing coinId.");
      alert("Coin ID not ready yet. Please wait...");
      return;
    }

    const orderData = {
      coinId,
      quantity,
      orderType,
    };

    dispatch(payOrder({ jwt, orderData, amount }));
  };


  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus-none"
            placeholder="Enter Amount..."
            onChange={handleChange}
            type="number"
            name="amount"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>
        {false && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficient wallet balance to buy
          </h1>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s"
            alt="Stock Avatar"
          />
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p>BTC</p>
            <DotIcon />
            <p>Bitcoin</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ${coin?.coinDetails?.market_data?.current_price?.usd}
            </p>
            <p className="text-red-600">
              <span>-1319049822.578</span>
              <span>(-0.29803%)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <p>
          {orderType === "BUY"
            ? `$ ${wallet?.userWallet?.balance ?? 0}`
            : asset?.assetDetails?.quantity || 0}
        </p>
      </div>

      <div>
        <Button
          onClick={handleBuyCrypto}
          disabled={!coin?.coinDetails?.id || amount <= 0}
          className={`w-full py-6 ${
            orderType === "SELL" ? "bg-red-600 text-white" : "bg-green-600"
          }`}
        >
          {orderType}
        </Button>
        <Button
          variant="link"
          className="w-full mt-5 text-xl bg-slate-900 text-white"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TreadingForm;
