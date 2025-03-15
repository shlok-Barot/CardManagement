import React, { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import CardDashboard from "./components/CardDashboard";
import AddCardModal from "./components/AddCardModal";

export function App() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  return (
    <MainLayout>
      <CardDashboard onAddCard={() => setIsAddCardModalOpen(true)} />
      <AddCardModal
        open={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        existingDefaultCardTypes={[]}
      />
    </MainLayout>
  );
}

export default App;
