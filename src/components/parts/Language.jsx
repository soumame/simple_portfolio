import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Languages } from "lucide-react";

import { languages } from "../../i18n/ui";
import "./menubutton.css";
const LanguagePicker = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="text-orange-600 hover:bg-gray-300 transition duration-200 ease-in-out
         rounded-2xl p-4 no-underline"
        >
          <Languages />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          className="min-w-[220px] bg-gray-400/30 backdrop-blur-md rounded-2xl p-[5px] shadow-md border border-gray-500/10 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {Object.entries(languages).map(([lang, label]) => (
            <DropdownMenu.Item className=" group text-md p-6 leading-none text-gray-700 rounded-2xl flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-gray-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-300 data-[highlighted]:text-gray-600">
              <a
                className="absolute flex justify-cente items-center font-semibold  w-full h-full"
                href={`/${lang}/`}
              >
                {label}
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default LanguagePicker;
