import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "../../../components/Image";
import { useEffect } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const isBibeopClient = ctx.req.headers["bibeop-client"];
  return {
    props: {
      isBibeopClient: !!isBibeopClient,
    },
  };
};
export default function Event202404({
  isBibeopClient,
  ...props
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    if (!isBibeopClient) {
      const url = window.location.origin;
      window.location.href = url;
    }
  }, [isBibeopClient]);
  const getImgPath = (name: string) => `/assets/images/inapp/${name}.png`;

  const onClickToEvent = () => {
    //@ts-ignore
    if (typeof BbxClient !== undefined) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ destination: "event" }));
    }
  };

  const onClickToHide = () => {
    //@ts-ignore
    if (typeof BbxClient !== undefined) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ hide: "true" }));
    }
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={getImgPath("inappEvent04fix")}
          height={471}
          width={335}
          quality={100}
          alt="event_banner"
          priority
          style={{ width: "100%", height: "auto" }}
        />
        <button
          onClick={onClickToEvent}
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            width: "57%",
            height: "auto",
          }}
        >
          <Image
            src={getImgPath("eventBtn04")}
            height={52}
            width={190}
            quality={100}
            alt="event_btn"
            priority
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </button>
        <button
          onClick={onClickToHide}
          style={{
            position: "absolute",
            bottom: "6%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            width: "30%",
            height: "auto",
          }}
        >
          <Image
            src={getImgPath("eventBtn2")}
            height={21}
            width={101}
            alt="event_btn"
            quality={100}
            style={{
              width: "100%",
              height: "auto",
            }}
            priority
          />
        </button>
      </div>
    </>
  );
}
