import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

let listeners = [];

function useAppAccount() {
  const cookies = new Cookies();
  const accountLocal = cookies.get("account");
  const [account, setAccount] = useState(accountLocal);

  useEffect(() => {
    listeners.push(setAccount); // thêm setAccount
    return () => {
      const newListeners = listeners.filter((listener) => { // tạo newListeners lọc các setAccount thay đổi
        return listener !== setAccount;
      });
      listeners = newListeners;// gán listeners với tạo newListeners
    };
  }, []);

  useEffect(() => {
    cookies.set("account", account);
    listeners.forEach((listener) => listener(account));// trả về danh sách account đã thay đổi
  }, [account]);

  //write this to recommend code in other files
  let accountForRecommend = {
    name: null,
    email: null,
    phone: null,
  };
  if (account) {
    accountForRecommend = account;
  }

  return {
    account: accountForRecommend,
    setAccount: setAccount,
  };
}

export { useAppAccount };
