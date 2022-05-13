import styled from "styled-components";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

interface Props {
  redirectPath?: string;
}

export function MainApp({ redirectPath = "/adicionar" }: Props) {
  const navigate = useNavigate();

  function createNew() {
    navigate("/adicionar");
  }
  return (
    <Container>
      <Top>
        <h1>BORA?</h1>
        <Options>
          <h2>CONTATO</h2>
          <h2 onClick={createNew}> ADICIONAR</h2>
        </Options>
      </Top>
      <Outlet />
    </Container>
  );
}

const Top = styled.div``;

const Container = styled.div``;

const Options = styled.div``;
