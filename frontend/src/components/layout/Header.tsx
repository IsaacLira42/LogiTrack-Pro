import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export const Header = () => {
  return (
    <Container className="flex flex-row justify-between items-center h-16 bg-primary">
      {/* Logo */}
      <div>
        <h1 className="text-acent font-bold text-2xl">LogiTrack Pro</h1>
        <p className="text-text font-medium text-xs">
          Visão geral da operação da frota
        </p>
      </div>

      <div>
        <Button texto="Relatório PDF" />
      </div>
    </Container>
  );
};
