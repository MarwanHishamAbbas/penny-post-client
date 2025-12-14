

import { generateSlug } from "@/src/shared/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./button";

const footerSections = [
    'Home',
    'Mindset',
    'Credit',
    'Facebook',
    'About',
    'Wealth',
    'Debt',
    'X / Twitter',
    'Authors',
    'Investing',
    'Budgeting',
    'Instagram',
    'Contact',
    'Savings',
    'Side Hustles',
    'LinkedIn',
    'Join Now',
    'Earning',
    'Categories',
    'Threads',
];

const Footer = () => {
    return (

        <footer className="bg-accent/50 text-sm text-primary/60">
            <div className="max-w-7xl mx-auto px-2">
                <div className="py-12 grid md:grid-cols-2 gap-x-8 gap-y-10 px-6 xl:px-0">
                    <div className="">
                        {/* Logo */}
                        <h1 className='text-base md:text-lg text-primary'><strong>Penny</strong>Post</h1>


                        <p className="mt-4 md:w-3/4">
                            Our mission is simple: to empower you with the strategies to
                            master saving, optimize your spending habits, explore lucrative
                            side hustles and make smart investments. Take charge of your
                            financial future and watch your money work wonders for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:ml-auto gap-x-6 gap-y-6">

                        {footerSections.map((link) => (
                            <Link className={buttonVariants({ variant: 'link', className: 'hover:text-foreground! text-foreground/50 ' })} href={generateSlug(link)} key={link}>
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>
                <hr className="border" />
                <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
                    {/* Copyright */}
                    <span className="text-xs">
                        &copy; {new Date().getFullYear()}{" "}
                        <Link href="/" target="_blank">
                            PennyPost
                        </Link>
                        . All rights reserved.
                    </span>


                </div>
            </div>
        </footer>

    );
};

export default Footer;
