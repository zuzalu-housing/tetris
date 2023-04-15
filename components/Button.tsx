import tw from "tailwind-styled-components";


export const PrimaryButton = tw.button`bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] gap-[8px] flex flex-row items-center justify-center`;
export const SecondaryButton = tw(PrimaryButton)`bg-gray-200 hover:bg-gray-300 text-gray-900`;