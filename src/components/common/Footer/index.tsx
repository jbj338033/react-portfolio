import { memo } from "react";
import * as S from "./style";
import { BsGithub, BsInstagram, BsEnvelope, BsDiscord } from "react-icons/bs";
import { IconType } from "react-icons";

interface ContactLink {
  icon: IconType;
  href: string;
  label: string;
}

const CONTACT_LINKS: readonly ContactLink[] = [
  {
    icon: BsGithub,
    href: "https://github.com/jbj338033",
    label: "GitHub",
  },
  {
    icon: BsInstagram,
    href: "https://instagram.com/jbj338033",
    label: "Instagram",
  },
  {
    icon: BsEnvelope,
    href: "mailto:jbj338033@gmail.com",
    label: "Email",
  },
  {
    icon: BsDiscord,
    href: "discord://~/users/jjjmo",
    label: "Discord",
  },
] as const;

const LinkItem = memo(({ link }: { link: ContactLink }) => {
  const Icon = link.icon;

  return (
    <S.LinkItem
      href={link.href}
      target={link.href.startsWith("mailto") ? undefined : "_blank"}
      rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      aria-label={link.label}
    >
      <Icon aria-hidden="true" />
    </S.LinkItem>
  );
});

LinkItem.displayName = "LinkItem";

const ContactLinks = memo(() => (
  <S.ContactLinks>
    {CONTACT_LINKS.map((link) => (
      <LinkItem key={link.label} link={link} />
    ))}
  </S.ContactLinks>
));

ContactLinks.displayName = "ContactLinks";

const Copyright = memo(() => {
  const currentYear = new Date().getFullYear();

  return <S.Copyright>© {currentYear} JMO. All rights reserved.</S.Copyright>;
});

Copyright.displayName = "Copyright";

const Footer = () => {
  return (
    <S.Container id="footer">
      <S.Inner>
        <ContactLinks />
        <Copyright />
      </S.Inner>
    </S.Container>
  );
};

export default memo(Footer);
