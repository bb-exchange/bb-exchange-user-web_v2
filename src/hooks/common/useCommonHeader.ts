import { AppStore } from ".src/app/store";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function useCommonHeader() {
  const router = useRouter();
  const isSignedIn = useSelector((state: AppStore) => state.user.isSignedIn);

  return { router, isSignedIn };
}
