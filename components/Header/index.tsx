import { useEffect, useState } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { FiArrowUpRight } from "react-icons/fi"
/*
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import { useUserPassportContext } from "../../context/UserPassportContext"
import PassportLoadingModal from "../PassportLoadingModal"*/

const Header = () => {

    const [navbar, setNavbar] = useState(false)

    const router = useRouter()

    return (
        <div className="relative px-[24px] md:px-[72px] flex flex-row h-[112px] md:justify-between w-full z-10 bg-zulalu-darkBase items-center">
            <div className="w-full flex relative justify-between md:justify-start overflow-hidden gap-5 items-center">
                <NextLink href={"/"}>
                    <div className="hidden md:flex cursor-pointer gap-2 items-center justify-center ">
                        <NextImage
                            alt="Zuzalu"
                            src={
                                "https://polcxtixgqxfuvrqgthn.supabase.co/storage/v1/object/public/zulalu-images/zulalologo.png"
                            }
                            objectFit="contain"
                            width={200}
                            height={50}
                        />
                    </div>
                </NextLink>
                <NextLink href={"/"}>
                    <div className="md:hidden flex cursor-pointer gap-2 items-center justify-center ">
                        <NextImage alt="Zuzalu" src={"/logo-small.png"} objectFit="contain" width={50} height={50} />
                    </div>
                </NextLink>

                <div className="md:hidden">
                    <button
                        className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={() => setNavbar(!navbar)}
                    >
                        {navbar ? (
                            <NextImage alt="Close" src={"/close.png"} width={32} height={32} />
                        ) : (
                            <NextImage alt="Menu" src={"/hamburger.png"} width={22} height={18} />
                        )}
                    </button>
                </div>
                <ul className="hidden md:flex flex-row gap-5 md:ml-auto items-center text-white">
                    <NextLink href={"/about"}>
                        <li
                            className={`cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/about" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            About
                        </li>
                    </NextLink>
                    <NextLink href={"/full-program"}>
                        <li
                            className={`cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/events" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            Schedule
                        </li>
                    </NextLink>
                    <NextLink href={"/faq"}>
                        <li
                            className={`cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/faq" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            FAQ
                        </li>
                    </NextLink>
                    <a href={"https://zupass.org/"} target="_blank">
                        <li
                            className={`flex items-center gap-2 cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/faq" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            Zuzalu Passport
                        </li>
                    </a>
                  
                </ul>
            </div>
            {/* Add the responsive dropdown menu */}
            <div
                className={`${
                    navbar ? "block" : "hidden"
                } md:hidden absolute left-0 top-full mt-0 bg-zulalu-darkBase w-full flex flex-row items-start pt-[16px] pb-[32px] gap-[8px] px-[32px] space-x-2`}
            >
                <ul className="flex flex-col pt-[16px] pb-[32px] w-full gap-[32px] text-f8fffe text-lg uppercase">
                    <NextLink href={"/about"}>
                        <li
                            className={`cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/about" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            About
                        </li>
                    </NextLink>
                    <NextLink href={"/full-program"}>
                        <li
                            className={`cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/events" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            Schedule
                        </li>
                    </NextLink>
                    <NextLink href={"/faq"}>
                        <li
                            className={`cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/faq" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            FAQ
                        </li>
                    </NextLink>
                    <a href={"https://zupass.org/"} target="_blank">
                        <li
                            className={`flex items-center gap-2 cursor-pointer text-[#F8FFFE] text-[18px] ${
                                router.asPath === "/faq" ? "font-[700]" : "font-[400]"
                            }`}
                        >
                            Zuzalu Passport
                            <FiArrowUpRight />
                        </li>
                    </a>
                    <div className="w-full h-[1px] bg-zulalu-primary" />
                    <li
                        className={`capitalize text-[#F8FFFE] text-[18px] ${
                            router.asPath === "/faq" ? "font-[700]" : "font-[400]"
                        }`}
                    >
                        Contact: support@zuzalu.org
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
