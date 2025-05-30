"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "../../../../public/logo copy";
import { cx } from "../../../../lib/cx";
export var TopNavBar = function () {
    var pathName = usePathname();
    var isHomePage = pathName === "/";
    return (<header aria-label="Site Header" className={cx("flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12", isHomePage && "bg-dot")}>
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">OpenResume</span>
          <Image src={logoSrc} alt="OpenResume Logo" className="h-8 w-full" priority/>
        </Link>
        <nav aria-label="Site Nav Bar" className="flex items-center gap-2 text-sm font-medium">
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "Parser"],
        ].map(function (_a) {
            var href = _a[0], text = _a[1];
            return (<Link key={text} className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4" href={href}>
              {text}
            </Link>);
        })}
          <div className="ml-1 mt-1">
            <iframe src="https://ghbtns.com/github-btn.html?user=xitanggg&repo=open-resume&type=star&count=true" width="100" height="20" className="overflow-hidden border-none" title="GitHub"/>
          </div>
        </nav>
      </div>
    </header>);
};
