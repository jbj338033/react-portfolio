import { memo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Header from "../../components/home/HomeHeader";
import SchoolActivityButton from "../../components/home/SchoolActivityButton";
import * as S from "./style";

const HomeLayout = () => {
  return (
    <S.Container>
      <Header />
      <S.Main>
        <Outlet />
      </S.Main>
      <SchoolActivityButton />
      <Footer />
    </S.Container>
  );
};

export default memo(HomeLayout);
