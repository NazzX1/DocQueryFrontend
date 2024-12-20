import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from '../../assets/logo.svg';
import { UserButton, useUser } from "@clerk/clerk-react";
import ThemeToggleButton from "../ThemeToggleButton";
import { buttonVariants } from "../ui/button";
import { Menu } from "lucide-react";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSignedIn } = useUser(); // Check if the user is signed in

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-backgound  border-b-[1px] dark:border-b-slate-700">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          {/* Desktop Logo and Navigation */}
          <div className="hidden md:flex items-center gap-2 text-foreground">
            <img src={logo} alt="Logo" className="h-8 mr-4 " /> DocQuery{/* Logo on Desktop */}
          </div>

          {/* mobile */}
          <span className="flex md:hidden">
            <ThemeToggleButton />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    <img src={logo} alt="Logo" className="h-8" /> DocQuery{/* Logo in Mobile */}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4 text-foreground">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  {!isSignedIn && (
                    <>
                      <a
                        className={`w-[110px] border ${buttonVariants({
                          variant: "secondary",
                        })}`}
                        href="/login"
                      >
                        Sign in
                      </a>
                      <a
                        className={`w-[110px] border ${buttonVariants({
                          variant: "secondary",
                        })}`}
                        href="/register"
                      >
                        Sign up
                      </a>
                    </>
                  )}
                  <UserButton />
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2 items-center text-foreground ">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px]  ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2 items-center">
            {!isSignedIn && (
              <>
                <a
                  className={`border ${buttonVariants({ variant: "default" })}`}
                  href="/login"
                >
                  Sign in
                </a>
                <a
                  className={`border ${buttonVariants({ variant: "secondary" })}`}
                  href="/register"
                >
                  Sign up
                </a>
              </>
            )}
            <UserButton />
            <ThemeToggleButton />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
