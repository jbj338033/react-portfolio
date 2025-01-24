import { memo } from "react";
import { Outlet } from "react-router-dom";
import * as S from "./style";
import Footer from "../../components/common/Footer";
import ProjectHeader from "../../components/project/ProjectHeader";

const ProjectLayout = () => {
  return (
    <S.Container>
      <ProjectHeader />
      <S.Main>
        <Outlet />
      </S.Main>

      <Footer />
    </S.Container>
  );
};

export default memo(ProjectLayout);
