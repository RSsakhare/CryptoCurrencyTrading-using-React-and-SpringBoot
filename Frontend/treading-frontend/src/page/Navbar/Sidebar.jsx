import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ActivityLogIcon,
  BookmarkIcon,
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  CreditCardIcon,
  LandmarkIcon,
  WalletIcon,
} from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6" /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
  { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-6 w-6" /> },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6" /> },
  { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="h-6 w-6" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Profile", path: "/profile", icon: <PersonIcon className="h-6 w-6" /> },
  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout())
  }

  return (
    <div className="mt-10 space-y-4">
      {menu.map((item) => (
        <SheetClose key={item.name} className="w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigate(item.path)
              if(item.name=="Logout"){
                handleLogout();
              }
            }}
            className="flex items-center gap-4 w-full py-4 justify-start"
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </Button>
        </SheetClose>
      ))}
    </div>
  );
};

export default Sidebar;
