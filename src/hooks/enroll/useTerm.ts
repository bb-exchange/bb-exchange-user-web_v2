import { postEthicalPledge } from ".src/api/users/users";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function UseTerm() {
  const router = useRouter();

  // const postEthicalPledgeMutation = useMutation(postEthicalPledge, {
  //   onSuccess: (res) => console.log(res),
  // });

  const postEthicalPledgeMutation = useMutation({
    mutationFn: postEthicalPledge,
    onSuccess: (res) => console.log(res),
  });

  function onClickAgreeBtn() {
    postEthicalPledgeMutation.mutateAsync();
    window.open("/enroll", "_blank", "noopener,noreferrer");
    router.push("/");
  }

  return { onClickAgreeBtn };
}
