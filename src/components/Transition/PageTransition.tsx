import { useRouter } from "next/router";
import React, { useRef } from "react";
import { TransitionGroup, Transition } from "react-transition-group";

type Position =
  | "absolute"
  | "relative"
  | "fixed"
  | "sticky"
  | "static"
  | "inherit";

type TransitionStyle = {
  [key: string]: {
    position?: Position;
    opacity?: number;
    transition?: string;
  };
};

const TIMEOUT = 200;
const getTransitionStyle: TransitionStyle = {
  entering: {
    position: "absolute",
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease, transform ${TIMEOUT}ms ease`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease, transform ${TIMEOUT}ms ease`,
    opacity: 0,
  },
};

function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup
      component={React.Fragment}
      style={{ position: "relative" }}
    >
      <Transition
        key={router.pathname}
        nodeRef={nodeRef}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div ref={nodeRef} style={{ ...getTransitionStyle[status] }}>
            {children}
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
}

export default PageTransition;
