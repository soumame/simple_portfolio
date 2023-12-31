import * as Tooltip from "@radix-ui/react-tooltip";

import { Contact, Bot, BookText, Briefcase } from "lucide-react";

import "./menubutton.css";

const Menutips = (props) => {
  const components = {
    Contact: Contact,
    Bot: Bot,
    BookText: BookText,
    Briefcase: Briefcase,

    // アイコンのこんぽーねんとついか
  };
  const IconComponent = components[props.icon];
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <button
            className="bg-transparent text-gray-600 link link-underline link-underline-black
            rounded-2xl p-3 sm:p-4 no-underline"
          >
            <IconComponent />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="aria-label:aaa data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
            text-gray-700 select-none rounded-2xl bg-gray-white p-4 text-base leading-none shadow-md border border-gray-500/10 will-change-[transform,opacity] bg-gray-200"
            sideOffset={5}
          >
            {props.text}
            <Tooltip.Arrow className=" fill-gray-200 shadow-md border border-gray-500/10" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Menutips;
