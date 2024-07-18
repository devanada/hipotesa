import Link from "next/link";
import dayjs from "dayjs";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="flex flex-col gap-2 sm:flex-row py-6 container shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {dayjs().format("YYYY")} Hipotesa Store. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
