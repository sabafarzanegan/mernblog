import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import logo from "../asset/image/icons8-blog-64.png";

export function Footermain() {
  return (
    <Footer container className="mt-3 border-t border-gray-300 h-full ">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex items-center justify-center gap-x-2">
            <FooterBrand
              src={logo}
              alt="Blog Logo"
              name="blog"
              className="w-16 h-16"
            />
            <h3 className="font-vazir text-lg font-bold">بلاگ مرن</h3>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="styles" />
              <FooterLinkGroup col>
                <FooterLink href="https://flowbite-react.com">
                  Flowbite
                </FooterLink>
                <FooterLink href="https://tailwindcss.com/">
                  Tailwind CSS
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow me" />
              <FooterLinkGroup col>
                <FooterLink href="https://github.com/sabafarzanegan">
                  Github
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="sabafarzanegan" year={2024} />
        </div>
      </div>
    </Footer>
  );
}
