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
         rounded-3xl p-4 md:p-5 no-underline bg-gray-300/50 backdrop-blur-md shadow"
        >
          <Languages />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          className="mr-2 min-w-[220px] bg-gray-300/50 backdrop-blur-md rounded-2xl p-[5px] shadow border border-gray-500/10 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {Object.entries(languages).map(([lang, label, index]) => (
            <DropdownMenu.Item
              key={index}
              className=" group text-md p-6 leading-none text-gray-700 rounded-2xl flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-gray-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-300 data-[highlighted]:text-gray-600"
            >
              <a
                className="absolute flex items-center font-semibold  w-full h-full"
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
