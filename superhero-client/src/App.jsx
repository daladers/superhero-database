import { useState } from "react";
import { SuperheroProvider } from "./contexts/SuperheroContext";
import SuperheroList from "./components/SuperheroList";
import SuperheroForm from "./components/SuperheroForm";
import SuperheroDetails from "./components/SuperheroDetails";
import { Box, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

function App() {
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    setView("details");
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setView("form");
  };

  const handleAddSuperhero = () => {
    setSelectedId(null);
    setView("form");
  };

  return (
    <ThemeProvider theme={theme}>
      <SuperheroProvider>
        <Box>
          {view === "list" && (
            <>
              <SuperheroList onSelect={handleSelect} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleAddSuperhero}
                  sx={{ mb: 2 }}
                >
                  Add Superhero
                </Button>
              </div>
            </>
          )}
          {view === "details" && (
            <SuperheroDetails
              superheroId={selectedId}
              onBack={() => setView("list")}
              onEdit={handleEdit}
            />
          )}
          {view === "form" && (
            <SuperheroForm
              superheroId={selectedId}
              onDone={() => setView("list")}
            />
          )}
        </Box>
      </SuperheroProvider>
    </ThemeProvider>
  );
}

export default App;
