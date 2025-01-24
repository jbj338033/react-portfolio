import styled from "@emotion/styled";
import { Theme } from "@emotion/react";

// Types
interface StyleProps {
  readonly isScrolled: boolean;
  readonly isActive?: boolean;
  readonly isHidden?: boolean;
}

interface MobileNavProps {
  readonly isOpen: boolean;
}

// Style Utils
const getTextColor = (
  theme: Theme,
  isScrolled: boolean,
  isActive?: boolean
) => {
  if (isScrolled) {
    return isActive ? theme.colors.text.primary : theme.colors.text.secondary;
  }

  return theme.mode === "dark"
    ? isActive
      ? theme.colors.text.primary
      : theme.colors.text.secondary
    : isActive
    ? theme.colors.text.inverse
    : "rgba(255, 255, 255, 0.8)";
};

const getBackgroundColor = (theme: Theme, isScrolled: boolean) => {
  return isScrolled ? theme.colors.background.default : "transparent";
};

const getUnderlineColor = (theme: Theme, isScrolled: boolean) => {
  if (isScrolled) {
    return theme.colors.text.primary;
  }

  return theme.mode === "dark"
    ? theme.colors.text.primary
    : theme.colors.text.inverse;
};

export const HeaderWrapper = styled.div`
  position: relative;
  z-index: 1000;
`;

export const Container = styled.header<StyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, isScrolled }) =>
    getBackgroundColor(theme, isScrolled)};
  border-bottom: ${({ theme, isScrolled }) =>
    isScrolled ? `1px solid ${theme.colors.border.default}` : "none"};
  transition: ${({ theme }) => theme.transition.normal};
  transform: translateY(${({ isHidden }) => (isHidden ? "-100%" : "0")});
  will-change: transform;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.container.lg};
  margin: 0 auto;
  height: 100%;
`;

export const Logo = styled.h1<StyleProps>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme, isScrolled }) =>
    isScrolled
      ? theme.colors.text.primary
      : theme.mode === "dark"
      ? theme.colors.text.primary
      : theme.colors.text.inverse};
  transition: ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  user-select: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: ${({ theme }) => theme.spacing.xxs};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
    height: 100%;
  }
`;

export const NavItem = styled.button<StyleProps>`
  background: none;
  border: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme, isActive }) =>
    isActive ? theme.fontWeight.semibold : theme.fontWeight.normal};
  color: ${({ theme, isScrolled, isActive }) =>
    getTextColor(theme, isScrolled, isActive)};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  position: relative;
  outline: none;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: ${({ theme, isScrolled, isActive }) =>
      !isActive ? "transparent" : getUnderlineColor(theme, isScrolled)};
    transform: scaleX(${({ isActive }) => (isActive ? 1 : 0)});
    transition: ${({ theme }) => theme.transition.fast};
    transform-origin: left center;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme, isScrolled }) =>
      isScrolled
        ? theme.colors.text.primary
        : theme.mode === "dark"
        ? theme.colors.text.primary
        : theme.colors.text.inverse};

    &::after {
      transform: scaleX(1);
      background: ${({ theme, isScrolled }) =>
        getUnderlineColor(theme, isScrolled)};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: ${({ theme }) => theme.spacing.xxs};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const MobileControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const ThemeToggle = styled.button<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, isScrolled }) =>
    isScrolled
      ? theme.colors.text.primary
      : theme.mode === "dark"
      ? theme.colors.text.primary
      : theme.colors.text.inverse};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  border-radius: ${({ theme }) => theme.borderRadius.full};

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: ${({ theme }) => theme.spacing.xxs};
  }
`;

export const MenuButton = styled.button<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, isScrolled }) =>
    isScrolled
      ? theme.colors.text.primary
      : theme.mode === "dark"
      ? theme.colors.text.primary
      : theme.colors.text.inverse};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.full};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: ${({ theme }) => theme.spacing.xxs};
  }
`;

export const MobileNav = styled.nav<MobileNavProps>`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: calc(100vh - 60px);
  background: ${({ theme }) => theme.colors.background.default};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: ${({ theme }) => theme.transition.fast};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileNavItem = styled.button<StyleProps>`
  width: 100%;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme, isActive }) =>
    isActive ? theme.fontWeight.semibold : theme.fontWeight.normal};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.background.alt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: -2px;
  }
`;
