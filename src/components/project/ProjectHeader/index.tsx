import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import * as S from "./style";
import { useThemeStore } from "../../../stores/theme";

const ProjectHeader = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  const handleLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <S.Container>
      <S.Inner>
        <S.Logo onClick={handleLogoClick} role="button" tabIndex={0}>
          JMO's Portfolio
        </S.Logo>

        <S.Controls>
          <S.ThemeToggle
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
          </S.ThemeToggle>
        </S.Controls>
      </S.Inner>
    </S.Container>
  );
};

export default memo(ProjectHeader);
