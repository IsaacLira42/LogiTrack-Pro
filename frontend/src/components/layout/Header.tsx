// import { Button } from "../ui/Button";
import { Container } from "./Container";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Container className="flex flex-row justify-between items-center h-16 bg-primary border-b border-borda">
        <div>
          <h1 className="text-accent font-bold text-2xl">LogiTrack Pro</h1>
          <p className="text-text font-medium text-xs">
            Visão geral da operação da frota
          </p>
        </div>

        {/* <div>
          <Button texto="Relatório PDF" />
        </div> */}
      </Container>
    </header>
  );
};
