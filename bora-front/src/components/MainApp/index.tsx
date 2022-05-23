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

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px 0px #00000040;

  h1 {
    margin-left: 20px;
  }
`;

const Container = styled.div``;

const Options = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  margin-right: 20px;
`;
