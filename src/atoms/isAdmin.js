import { atom } from "recoil";

const isAdminState = atom({
  default: false,
  key: "isAdminState",
});

export default isAdminState;
